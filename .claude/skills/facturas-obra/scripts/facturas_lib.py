"""Utilidades deterministas para la skill facturas-obra."""
from __future__ import annotations

import re
import unicodedata
from datetime import date
from decimal import Decimal, InvalidOperation
from difflib import SequenceMatcher

NOMBRE_TRIMESTRE = {1: "Trimestre 01", 2: "Trimestre 02", 3: "Trimestre 03", 4: "Trimestre 04"}


def trimestre(fecha: date) -> int:
    """T1 ene-mar, T2 abr-jun, T3 jul-sep, T4 oct-dic."""
    return (fecha.month - 1) // 3 + 1


def carpeta_destino(fecha: date, proyecto: str) -> str:
    return f"{NOMBRE_TRIMESTRE[trimestre(fecha)]}/{limpiar_nombre(proyecto)}"


def limpiar_nombre(texto: str) -> str:
    return re.sub(r'[\\/:*?"<>|]+', "-", texto).strip()


def importe(valor) -> Decimal:
    """Convierte '1.234,56', '1234.56' o números a Decimal con 2 decimales."""
    if isinstance(valor, (int, float, Decimal)):
        return Decimal(str(valor)).quantize(Decimal("0.01"))
    s = re.sub(r"[^\d,.\-]", "", str(valor))
    if "," in s and "." in s:
        s = s.replace(".", "").replace(",", ".") if s.rfind(",") > s.rfind(".") else s.replace(",", "")
    elif "," in s:
        s = s.replace(",", ".")
    try:
        return Decimal(s).quantize(Decimal("0.01"))
    except InvalidOperation as e:
        raise ValueError(f"Importe no válido: {valor!r}") from e


def _norm(s: str) -> str:
    s = unicodedata.normalize("NFD", s.lower())
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    s = re.sub(r"\b(s\.?l\.?u?|s\.?a\.?|sl|sa)\b", " ", s)
    return re.sub(r"[^a-z0-9]+", " ", s).strip()


def similitud_proveedor(a: str, b: str) -> float:
    return SequenceMatcher(None, _norm(a), _norm(b)).ratio()


def match_invoice(factura: dict, filas: list[dict], umbral_proveedor: float = 0.6) -> dict:
    """Cruza una factura con filas de Excel/ERP.

    factura y filas: dicts con 'importe', 'fecha' (date) y 'proveedor'.
    Prioridad: 1) importe exacto (céntimos, IVA incl.), 2) fecha, 3) proveedor.
    Devuelve {'estado': 'reportada'|'dudosa'|'no_reportada', 'fila': dict|None, 'candidatas': [...]}.
    """
    imp = importe(factura["importe"])
    cands = [f for f in filas if importe(f["importe"]) == imp]
    if not cands:
        return {"estado": "no_reportada", "fila": None, "candidatas": []}

    def puntos(f):
        return (f["fecha"] == factura["fecha"], similitud_proveedor(f["proveedor"], factura["proveedor"]))

    cands.sort(key=puntos, reverse=True)
    mejor = cands[0]
    misma_fecha, sim = puntos(mejor)
    segunda = puntos(cands[1]) if len(cands) > 1 else None
    if misma_fecha and sim >= umbral_proveedor and segunda != puntos(mejor):
        return {"estado": "reportada", "fila": mejor, "candidatas": cands}
    if len(cands) == 1 and (misma_fecha or sim >= umbral_proveedor):
        return {"estado": "reportada", "fila": mejor, "candidatas": cands}
    return {"estado": "dudosa", "fila": None, "candidatas": cands}
