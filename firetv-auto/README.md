# Fire TV Auto Flow
Automatiza: ProtonVPN -> Rusia -> navegador -> pagina -> enlace (AceStream se abre solo).

1. Edita `app/src/main/java/com/simo/autoflow/Config.kt` (URL, texto del enlace, paquetes).
2. Compila: GitHub Actions "Build APK" (descarga `app-debug.apk`) o `gradle assembleDebug`.
3. Instala en el Fire Stick: `adb connect IP:5555 && adb install app-debug.apk`
4. Activa el servicio: `adb shell settings put secure enabled_accessibility_services com.simo.autoflow/com.simo.autoflow.FlowService && adb shell settings put secure accessibility_enabled 1`
   (o Ajustes > Accesibilidad > Auto Flow).
5. Abre "Auto Flow" y pulsa INICIAR. Para lanzarlo sin mando: `adb shell am start -n com.simo.autoflow/.MainActivity`.
