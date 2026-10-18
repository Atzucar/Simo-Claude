package com.simo.autoflow

import android.os.Bundle
import android.widget.Toast

/** Pantalla 2: enlaces de AceStream del elemento elegido. Al elegir uno se lanza todo el proceso. */
class LinksActivity : ListScreen() {
    private lateinit var item: Item
    override val screenTitle get() = item.title

    override fun onCreate(b: Bundle?) {
        item = Session.items[intent.getIntExtra("i", 0)]
        super.onCreate(b)
        show(item.links.map { it.name }) { pos ->
            val s = FlowService.instance
            if (s == null) status.text = "Activa primero el servicio de accesibilidad"
            else {
                Toast.makeText(this, "Conectando VPN y abriendo AceStream...", Toast.LENGTH_LONG).show()
                s.runFlow(item.links[pos].url)
            }
        }
    }
}
