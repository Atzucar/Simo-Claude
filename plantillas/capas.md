# Capas estándar (propuesta, ajustar a tu plantilla)

Esta es una propuesta de partida. **Si tienes una plantilla de capas propia, sustituye este
archivo por la tuya** y el script `scripts/crear_base_dxf.py` leerá la lista de `CAPAS`.

Formato: `ÁMBITO-ELEMENTO`. Color en índice ACI.

| Capa | Color ACI | Uso |
|---|---|---|
| A-MUROS | 7 (blanco) | Muros y tabiques existentes |
| A-TABIQUES | 3 (verde) | Tabiques nuevos |
| A-DEMOLICION | 1 (rojo) | Elementos a demoler |
| A-HUECOS | 4 (cian) | Puertas y ventanas |
| A-CARPINTERIA | 6 (magenta) | Textos y códigos de carpintería |
| A-MOBILIARIO | 8 (gris) | Mobiliario |
| A-SANITARIOS | 5 (azul) | Aparatos sanitarios |
| A-ACABADOS | 9 (gris claro) | Rayados y claves de acabado |
| A-TECHOS | 30 (naranja) | Falsos techos |
| A-EJES | 1 (rojo, trazo y punto) | Ejes de referencia |
| A-COTAS | 2 (amarillo) | Cotas |
| A-TEXTO | 7 (blanco) | Rótulos de estancias y notas |
| A-SECCIONES | 140 | Corte de sección y líneas de proyección |
| I-ELEC | 2 | Electricidad |
| I-FONT | 5 | Fontanería y saneamiento |
| I-CLIMA | 3 | Climatización y ventilación |
| I-PCI | 1 | Protección contra incendios |
| G-CAJETIN | 7 | Cajetín y marco |
| G-VIEWPORT | 8 (no imprimir) | Marcos de viewport |

Reglas:
- Nada se dibuja en la capa `0`, salvo bloques.
- Color y tipo de línea **por capa** (`PorCapa`), no por objeto.
- Las capas de apoyo (ejes, viewports) no se imprimen.
