---
name: planos-ejecutivos
description: Prepara y revisa planos de proyecto de ejecución (clínicas, locales comerciales, viviendas y obra nueva). Úsala cuando Simone pida "planos ejecutivos", "proyecto de ejecución", lista o índice de planos, checklist de un plano, cuadro de carpinterías o acabados, revisar un plano o generar un DXF o script LISP base. También cuando haya que conectar los planos con mediciones y presupuesto.
---

# Planos ejecutivos

Antes de empezar, lee `CLAUDE.md` y `plantillas/indice-planos-tipo.md` del repositorio.

## Flujo

1. **Tipo de obra.** Pregunta si es clínica, local, vivienda u obra nueva (si no lo dice).
2. **Datos mínimos.** Pide: emplazamiento y comunidad autónoma, superficie, uso, estado
   actual (¿hay DWG o PDF?), alcance. Marca lo que falte como PENDIENTE.
3. **Lista de planos.** Parte del índice tipo, marca *incluye / no aplica* por plano y
   enséñasela antes de seguir.
4. **Cuadros.** Genera cuadros de carpinterías, acabados y superficies en tabla.
5. **Borrador de dibujo (si lo pide).** Usa `scripts/crear_base_dxf.py` para el DXF base.
   Nunca inventes geometría: dibuja solo con cotas que Simone haya dado.
6. **Revisión.** Pasa el checklist de salida del índice y lista las incoherencias.
7. **Mediciones.** Extrae las cantidades y deriva a las skills `presupuesto-mediciones-motiva`
   o `pladur-coste-proyecto`.

## Reglas

- Sin cotas inventadas ni normativa de memoria: todo lo normativo es orientativo y se
  marca "verificar vigencia y normativa autonómica".
- En clínicas, revisa siempre sectorización, evacuación, accesibilidad, ventilación y
  acabados sanitarios.
- Todo dibujo generado es borrador para revisión del técnico responsable.
- Si el origen es un DWG, pide el DXF o un PDF: aquí no se abre AutoCAD.
- No tocar `next-steps-plus/` ni `.claude-plugin/`.
