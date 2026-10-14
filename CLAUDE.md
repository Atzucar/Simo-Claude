# Proyecto: planos ejecutivos y mediciones (Simone)

Este repositorio es el espacio de trabajo para preparar **proyectos de ejecución**:
planos, mediciones y presupuesto. Idioma de trabajo: **español de España**.

## Tipos de obra (por orden de prioridad)

1. **Clínicas** (centros sanitarios y de salud)
2. **Locales comerciales**
3. **Viviendas** (reformas)
4. **Obra nueva**

Cuando haya que elegir qué incluir en un proyecto, se parte del tipo de obra y se
usa la lista de planos de `plantillas/indice-planos-tipo.md`.

## Cómo trabajar

- **Nunca inventes cotas, superficies ni normativa.** Si falta un dato, lo marcas como
  "PENDIENTE" y lo preguntas. Mejor una lista de dudas que un plano con datos falsos.
- La normativa citada es orientativa: **verifícala con el texto vigente** y con la
  normativa autonómica y municipal del emplazamiento antes de darla por buena.
- Cada plano lleva: cajetín completo, escala, fecha, revisión, norte (en plantas) y
  leyenda. Las capas siguen `plantillas/capas.md`.
- Los archivos de entrega se escriben en `salidas/` (no se versiona) con la nomenclatura
  `AAAA.MM.DD_Proyecto_TipoPlano_Rev.ext`.

## Qué puede y qué no puede hacer Claude aquí

- **Sí:** listas de planos, checklists de revisión, cuadros (carpinterías, acabados,
  superficies), DXF y scripts AutoLISP generados con `ezdxf`, y la conexión con mediciones
  y presupuesto.
- **No:** abrir AutoCAD ni trabajar sobre un DWG directamente. Los DXF se descargan y se
  abren en AutoCAD en el equipo de Simone. Los DWG de otros se convierten a DXF antes.
- Todo dibujo generado se trata como **borrador a revisar** por el técnico responsable.

## Mediciones y presupuesto

- Las cantidades salen de los planos y pasan a la plantilla **PresupuestoBase Motiva**
  (Google Sheets).
- Pladur: hoja `Pladur_costes_GoogleSheets`, con margen fijo del 40 % sobre venta y
  precios de Obramat.
- Skills de la cuenta que se usan con este proyecto: `presupuesto-mediciones-motiva`,
  `pladur-coste-proyecto`, `referencias-obramat`, `skill-documentacion-cpphan`.

## Estructura

```
CLAUDE.md                     instrucciones (este archivo)
plantillas/                   índice de planos tipo, capas, cajetín
scripts/                      generadores de DXF y LISP
ejemplos/                     proyectos de referencia (añadir aquí)
.claude/skills/planos-ejecutivos/   skill del proyecto
next-steps-plus/              mod de Simone para Claude Code. NO TOCAR.
.claude-plugin/               marketplace del mod. NO TOCAR.
```

**No modificar `next-steps-plus/` ni `.claude-plugin/`.**
