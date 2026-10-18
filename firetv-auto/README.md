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
