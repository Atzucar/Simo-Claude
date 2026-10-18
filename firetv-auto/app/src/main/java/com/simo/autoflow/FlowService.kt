package com.simo.autoflow

import android.accessibilityservice.AccessibilityService
import android.content.Intent
import android.net.Uri
import android.util.Log
import android.view.accessibility.AccessibilityEvent
import android.view.accessibility.AccessibilityNodeInfo
import kotlinx.coroutines.*

class FlowService : AccessibilityService() {
    private val scope = CoroutineScope(Dispatchers.Default + SupervisorJob())
    private var job: Job? = null

    override fun onServiceConnected() { instance = this }
    override fun onUnbind(i: Intent?): Boolean { instance = null; scope.cancel(); return super.onUnbind(i) }
    override fun onAccessibilityEvent(e: AccessibilityEvent?) {}
    override fun onInterrupt() {}

    fun runFlow(streamUrl: String) {
        job?.cancel()
        job = scope.launch {
            try {
                connectVpn()
                playStream(streamUrl)
            } catch (e: Exception) { Log.e(TAG, "Flujo fallido: ${e.message}") }
        }
    }

    private suspend fun connectVpn() {
        launchApp(Config.PROTON_PKG)
        delay(4000)
        // Si ya esta conectado y a Rusia no hacemos nada mas que seguir.
        if (waitFor(Config.CONNECTED_TEXTS, 3000) != null && findText(Config.COUNTRY_TEXTS) != null) return
        // Buscar Rusia en la lista (desplazando) y pulsarla.
        val country = scrollFind(Config.COUNTRY_TEXTS) ?: error("No encuentro Rusia en ProtonVPN")
        click(country)
        delay(1500)
        // Algunas versiones conectan al tocar el pais; si no, pulsar Connect.
        waitFor(Config.CONNECT_TEXTS, 5000)?.let { click(it) }
        waitFor(Config.CONNECTED_TEXTS, Config.VPN_TIMEOUT_MS) ?: error("VPN no conecto")
        delay(2000)
    }

    private suspend fun playStream(url: String) {
        startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(url)).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK))
        // Si Fire TV pregunta con que app abrirlo, elegir AceStream.
        waitFor(listOf("Ace Stream", "AceStream", "Ace Player"), 6000)?.let { click(it) }
    }

    // ---- utilidades ----
    private fun launchApp(pkg: String) {
        val i = packageManager.getLeanbackLaunchIntentForPackage(pkg) ?: packageManager.getLaunchIntentForPackage(pkg)
            ?: error("App no instalada: $pkg")
        startActivity(i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP))
    }

    private fun findText(texts: List<String>): AccessibilityNodeInfo? {
        val root = rootInActiveWindow ?: return null
        for (t in texts) root.findAccessibilityNodeInfosByText(t).firstOrNull()?.let { return it }
        return null
    }

    private suspend fun waitFor(texts: List<String>, timeout: Long = Config.STEP_TIMEOUT_MS): AccessibilityNodeInfo? {
        val end = System.currentTimeMillis() + timeout
        while (System.currentTimeMillis() < end) { findText(texts)?.let { return it }; delay(500) }
        return null
    }

    private suspend fun scrollFind(texts: List<String>): AccessibilityNodeInfo? {
        repeat(25) {
            findText(texts)?.let { return it }
            val sc = findScrollable(rootInActiveWindow)
            if (sc != null) sc.performAction(AccessibilityNodeInfo.ACTION_SCROLL_FORWARD) else return null
            delay(700)
        }
        return null
    }

    private fun findScrollable(n: AccessibilityNodeInfo?): AccessibilityNodeInfo? {
        if (n == null) return null
        if (n.isScrollable) return n
        for (i in 0 until n.childCount) findScrollable(n.getChild(i))?.let { return it }
        return null
    }

    private fun click(n: AccessibilityNodeInfo) {
        var c: AccessibilityNodeInfo? = n
        while (c != null) {
            if (c.isClickable && c.performAction(AccessibilityNodeInfo.ACTION_CLICK)) return
            c = c.parent
        }
        n.performAction(AccessibilityNodeInfo.ACTION_FOCUS)
    }

    companion object { const val TAG = "AutoFlow"; var instance: FlowService? = null }
}
