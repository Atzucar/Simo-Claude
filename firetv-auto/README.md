# ClaudioTV
App con lista de contenidos (peliculas / eventos) -> lista de enlaces AceStream -> al elegir uno:
conecta ProtonVPN a Rusia y abre el enlace en AceStream.

## Catalogo
`app/src/main/assets/catalog.json` (incluido en la app) o un JSON remoto en `Config.CATALOG_URL`:
`[{"title":"...","type":"evento|pelicula","time":"20:45","links":[{"name":"Canal 1","url":"acestream://HASH","quality":"HD","peers":300}]}]` (`time`, `quality` y `peers` son opcionales)

## Uso
1. Compila (GitHub Actions "Build APK" o `gradle assembleDebug`) e instala: `adb install ClaudioTV.apk`
2. Activa accesibilidad: `adb shell settings put secure enabled_accessibility_services com.simo.autoflow/com.simo.autoflow.FlowService && adb shell settings put secure accessibility_enabled 1`
3. Abre "ClaudioTV", elige contenido, elige enlace.

## Formato de texto simple (alternativa al JSON)
Una linea por enlace; las lineas con el mismo titulo se agrupan en un solo evento. `#` = comentario.
```
titulo | tipo | hora | nombre del enlace | calidad | acestream://HASH [| pares]
Equipo A vs Equipo B | evento | 20:45 | Canal 1 | HD | acestream://HASH
Equipo A vs Equipo B | evento | 20:45 | Canal 2 | SD | acestream://HASH
Titulo de pelicula | pelicula | 2 h 04 | Fuente 1 | HD | acestream://HASH
```
`tipo`: `evento` o `pelicula`. `hora` y `calidad` pueden ir vacios (`||`). La app detecta sola si el archivo es JSON (empieza por `[`) o texto.
