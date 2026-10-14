---
name: facturas-contabilidad-motiva
description: [Motiva] Procesa un PDF escaneado con muchas facturas de obra mezcladas - lo parte en facturas individuales, lee los datos y la anotación manuscrita (concepto y proyecto), renombra cada factura, la guarda en carpetas Trimestre/Proyecto, la cruza con el Excel de gastos con tarjeta de los directores de obra y con el export del ERP, y genera los Excel de pendientes y de pagos del transportista. Úsala siempre que el usuario hable de facturas escaneadas, separar/renombrar facturas, clasificar facturas por proyecto o trimestre, conciliar facturas con el Excel de directores de obra o con el ERP, o facturas que faltan.
---

# Facturas contabilidad, Motiva

Todo el trabajo se hace sobre una carpeta de trabajo que el usuario indica (su escritorio). Si no la ha indicado, pregúntala antes de empezar. Las tres reglas de fondo:

- **Manda la factura, no el Excel.** El Excel de directores de obra es un reporte manual y puede tener errores.
- **Ante cualquier duda, pregunta.** No inventes proyecto, importe ni fecha. Lo que leas con poca confianza va al informe para revisión.
- **Una factura = un proyecto.** Si parece cubrir varios, pregunta a qué proyecto se asigna.

Antes de nada lee `references/config.md` (formato de nombre, carpetas, columnas de los Excel). Si algo está marcado `PENDIENTE`, pregúntalo al usuario y guárdalo ahí.

## Tipos de factura

- **A – Compra de director de obra:** tiene anotación a mano (gasto + proyecto) y debería estar apuntada en el Excel de gastos con tarjeta.
- **B – Pago del transportista:** solo anotación a mano (detalle + proyecto); no se reporta en ningún Excel.

No hace falta clasificarlas de antemano: lo sabrás por el resultado del cruce. Una factura que no aparece en el Excel de directores se trata como B (o como A no reportada); lo decide el usuario en el informe, pero siempre se archiva igual.

## Flujo

### 1. Dividir y leer
1. Usa la skill `pdf` para dividir el PDF en facturas (una factura puede ocupar varias páginas; detecta el inicio por proveedor/cabecera y confirma con el usuario si hay duda). Si el escaneo no tiene texto, aplica OCR.
2. Extrae por factura: proveedor, fecha, **total con IVA (con céntimos)**, concepto, y la anotación manuscrita (gasto y proyecto).
3. Mira las páginas como imagen para leer la letra a mano; no te fíes solo del OCR.
4. Relaciona el proyecto manuscrito con la lista de proyectos del Excel de directores de obra. Si es ambiguo o ilegible, propón el más parecido ("entiendo que pone X, ¿es el proyecto Y?") y espera confirmación. Reúne todas las dudas y pregúntalas de una vez.

### 2. Renombrar y archivar
- Nombre según el patrón de `references/config.md`.
- Trimestre por **fecha de la factura**: T01 ene–mar, T02 abr–jun, T03 jul–sep, T04 oct–dic.
- Estructura: `Trimestre 0N/<Proyecto>/<archivo>.pdf` (dentro de cada trimestre, una carpeta por proyecto activo). Crea la carpeta de un proyecto solo si tiene facturas.
- Archiva siempre, estén o no en el Excel.
- Factura sin fecha legible: pregunta; no la archives hasta tener fecha.

### 3. Cruce con el Excel de directores de obra
Usa `scripts/facturas_lib.py` (`match_invoice`). Orden de prioridad:
1. **Importe total con IVA, exacto al céntimo.**
2. **Fecha.**
3. **Proveedor** (comparación aproximada; nunca número de factura).

Resultado por factura: `reportada` / `no reportada` / `dudosa` (varios candidatos o solo coincide el importe). Las dudosas se preguntan. Si el proyecto manuscrito difiere del apuntado en el Excel, señálalo en el informe (manda la factura).

### 4. Cruce con el ERP
Con el export del ERP, aplica el mismo criterio de cruce y marca cada gasto: **con factura** / **sin factura**. Los sin factura van a la lista de pendientes del paso 5.

### 5. Excel de pendientes
Gastos apuntados en el Excel de directores o en el ERP **sin PDF**. Genera `Pendientes_facturas.xlsx` con: fecha, proveedor, importe, origen (Excel directores / ERP), director de obra, **Proyecto (vacío para rellenar)** y nombre del archivo que se espera. Con la skill `xlsx`.

Cuando el usuario suba las facturas que ha encontrado y devuelva el Excel con los proyectos rellenados: lee cada factura, verifica importe/fecha contra la fila, renombra y archiva en `Trimestre/Proyecto` como en el paso 2. Lo que no cuadre se pregunta.

### 6. Excel del transportista
Para las facturas tipo B genera un Excel con **el mismo formato (columnas, orden, formatos) que el Excel de gastos con tarjeta de los directores de obra**, para que el usuario lo pase al Excel general. Copia ese Excel como plantilla, vacíalo y rellénalo; no reconstruyas el formato de memoria. Importe = **total con IVA**, y el proyecto asignado.

### 7. Informe final
Entrega siempre un resumen (`Informe_conciliacion.xlsx` o en el chat si son pocas):
- facturas procesadas y dónde se archivó cada una,
- reportadas / no reportadas en el Excel de directores,
- diferencias de proyecto o importe entre factura y Excel,
- lecturas de baja confianza y dudas abiertas,
- gastos sin factura (→ pendientes).

## Notas
- Nunca borres ni sobrescribas los originales: trabaja sobre copias en la carpeta de salida.
- Si un archivo de destino ya existe, no lo pises; pregunta o añade sufijo.
