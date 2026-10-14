# Contexto de la conversación (para retomar en otra sesión/perfil)

Objetivo: skill que procesa un PDF escaneado con muchas facturas de obra (Motiva).

Decisiones tomadas:
- Dividir el PDF en facturas, renombrarlas (formato de nombre: PENDIENTE, lo dará el usuario) y archivarlas en `Trimestre 0N/<Proyecto>/` según la fecha de factura.
- Tipo A (directores de obra): anotación a mano + apunte en su Excel de gastos con tarjeta. Tipo B (transportista): solo anotación a mano; se vuelca a un Excel con el formato del de directores (importe total con IVA + proyecto).
- Manda la factura, no el Excel. Cruce: importe con IVA al céntimo > fecha > proveedor (sin nº de factura).
- Una factura = un proyecto; ante dudas de letra o proyecto, preguntar al usuario con lo que se entiende.
- Facturas no presentes en PDF pero sí en Excel/ERP: Excel de pendientes con columna Proyecto vacía; el usuario lo rellena y lo devuelve junto a las facturas para renombrarlas y archivarlas.
- Pendiente del usuario: formato de nombre, carpeta del escritorio, Excel de directores, export ERP, PDF de muestra, y si hay carpeta de año.
