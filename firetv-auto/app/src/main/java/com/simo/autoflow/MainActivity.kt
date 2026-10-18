package com.simo.autoflow

import android.content.Intent
import android.os.Bundle
import kotlin.concurrent.thread

/** Pantalla 1: que quieres ver (peliculas / eventos). */
class MainActivity : ListScreen() {
    override val screenTitle = "Que quieres ver?"

    override fun onCreate(b: Bundle?) {
        super.onCreate(b)
        status.text = "Cargando..."
        thread {
            val items = runCatching { Catalog.load(this) }.getOrNull()
            runOnUiThread {
                if (items == null) { status.text = "Error leyendo el catalogo"; return@runOnUiThread }
                Session.items = items
                status.text = if (FlowService.instance == null)
                    "Servicio de accesibilidad desactivado (Ajustes > Accesibilidad > Auto Flow)" else ""
                show(items.map { it.title }) { startActivity(Intent(this, LinksActivity::class.java).putExtra("i", it)) }
            }
        }
    }

    override fun onResume() {
        super.onResume()
        if (Session.items.isNotEmpty()) status.text =
            if (FlowService.instance == null) "Servicio de accesibilidad desactivado (Ajustes > Accesibilidad > Auto Flow)" else ""
    }
}

object Session { var items: List<Item> = emptyList() }
