#!/usr/bin/env python3
"""Genera un DXF base con las capas estándar y un cajetín rellenable.

Uso:
    python3 scripts/crear_base_dxf.py salidas/base.dxf \
        --proyecto "Clínica Niova" --plano "A-03 Distribución" \
        --escala "1:50" --fecha 2026-10-13 --rev R01

Requiere: pip install ezdxf
Es un borrador: revisar siempre el resultado abriéndolo en AutoCAD.
"""
import argparse
from pathlib import Path

import ezdxf

# (nombre, color ACI, tipo de línea). Mantener sincronizado con plantillas/capas.md
CAPAS = [
    ("A-MUROS", 7, "Continuous"),
    ("A-TABIQUES", 3, "Continuous"),
    ("A-DEMOLICION", 1, "DASHED"),
    ("A-HUECOS", 4, "Continuous"),
    ("A-CARPINTERIA", 6, "Continuous"),
    ("A-MOBILIARIO", 8, "Continuous"),
    ("A-SANITARIOS", 5, "Continuous"),
    ("A-ACABADOS", 9, "Continuous"),
    ("A-TECHOS", 30, "DASHED"),
    ("A-EJES", 1, "CENTER"),
    ("A-COTAS", 2, "Continuous"),
    ("A-TEXTO", 7, "Continuous"),
    ("A-SECCIONES", 140, "Continuous"),
    ("I-ELEC", 2, "Continuous"),
    ("I-FONT", 5, "Continuous"),
    ("I-CLIMA", 3, "Continuous"),
    ("I-PCI", 1, "Continuous"),
    ("G-CAJETIN", 7, "Continuous"),
    ("G-VIEWPORT", 8, "Continuous"),
]

# Hoja A3 apaisada en mm (unidades de dibujo: milímetros en papel)
ANCHO, ALTO = 420.0, 297.0
MARGEN = 10.0


def crear(destino: Path, datos: dict) -> None:
    doc = ezdxf.new("R2018", setup=True)
    doc.units = ezdxf.units.MM

    for nombre, color, tipo in CAPAS:
        capa = doc.layers.add(nombre, color=color, linetype=tipo)
        if nombre == "G-VIEWPORT":
            capa.dxf.plot = 0  # no imprimir

    msp = doc.modelspace()
    _cajetin(msp, datos)
    destino.parent.mkdir(parents=True, exist_ok=True)
    doc.saveas(destino)


def _cajetin(msp, d: dict) -> None:
    x0, y0 = MARGEN, MARGEN
    x1, y1 = ANCHO - MARGEN, ALTO - MARGEN
    msp.add_lwpolyline(
        [(x0, y0), (x1, y0), (x1, y1), (x0, y1)],
        close=True, dxfattribs={"layer": "G-CAJETIN"},
    )
    # Bloque de cajetín: 180 x 40 mm en la esquina inferior derecha
    cx0, cy0 = x1 - 180, y0
    msp.add_lwpolyline(
        [(cx0, cy0), (x1, cy0), (x1, cy0 + 40), (cx0, cy0 + 40)],
        close=True, dxfattribs={"layer": "G-CAJETIN"},
    )
    filas = [
        ("PROYECTO", d["proyecto"], 30),
        ("PLANO", d["plano"], 20),
        ("ESCALA", d["escala"], 10),
        ("FECHA / REV.", f'{d["fecha"]}  {d["rev"]}', 2),
    ]
    for etiqueta, valor, dy in filas:
        msp.add_text(
            f"{etiqueta}: {valor}", height=3.5,
            dxfattribs={"layer": "G-CAJETIN", "insert": (cx0 + 4, cy0 + dy)},
        )


if __name__ == "__main__":
    p = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    p.add_argument("destino", type=Path)
    p.add_argument("--proyecto", default="PENDIENTE")
    p.add_argument("--plano", default="PENDIENTE")
    p.add_argument("--escala", default="1:50")
    p.add_argument("--fecha", default="PENDIENTE")
    p.add_argument("--rev", default="R00")
    a = p.parse_args()
    crear(a.destino, vars(a))
    print(f"DXF base creado: {a.destino}")
