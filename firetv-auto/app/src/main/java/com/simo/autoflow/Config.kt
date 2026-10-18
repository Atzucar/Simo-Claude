package com.simo.autoflow

/** Edita estos valores antes de compilar. */
object Config {
    // Paquetes (Fire TV). Si alguno no coincide, cambialo (adb shell pm list packages | grep ...)
    const val PROTON_PKG = "ch.protonvpn.android"
    // Navegador: Silk = com.amazon.cloud9 ; Firefox TV = org.mozilla.firefox
    const val BROWSER_PKG = "com.amazon.cloud9"

    // Textos de la UI de ProtonVPN (en cualquiera de los idiomas del dispositivo)
    val COUNTRY_TEXTS = listOf("Russia", "Rusia")
    val CONNECT_TEXTS = listOf("Connect", "Conectar", "Quick Connect")
    val CONNECTED_TEXTS = listOf("Disconnect", "Desconectar", "Connected", "Conectado")

    // Paso 2
    const val PAGE_URL = "https://example.com/"        // <-- tu pagina
    val LINK_TEXTS = listOf("Canal 1")                 // <-- texto del enlace a pulsar

    const val STEP_TIMEOUT_MS = 20_000L
    const val VPN_TIMEOUT_MS = 60_000L
}
