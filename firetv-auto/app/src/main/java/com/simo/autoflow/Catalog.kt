package com.simo.autoflow

import android.content.Context
import org.json.JSONArray
import java.net.URL

data class Link(val name: String, val url: String, val quality: String?, val peers: Int?)
data class Item(val title: String, val type: String, val time: String?, val links: List<Link>)

data class CatalogResult(val items: List<Item>, val warning: String?)

object Catalog {
    /** Descarga Config.CATALOG_URL; si falla, usa assets/catalog.json y devuelve un aviso. Llamar fuera del hilo principal. */
    fun load(ctx: Context): CatalogResult {
        fun bundled() = parse(ctx.assets.open("catalog.json").bufferedReader().readText())
        if (Config.CATALOG_URL.isBlank()) return CatalogResult(bundled(), null)
        return try {
            val text = URL(Config.CATALOG_URL).openConnection().apply { connectTimeout = 8000; readTimeout = 8000 }
                .getInputStream().bufferedReader().readText()
            CatalogResult(parse(text), null)
        } catch (e: Exception) {
            CatalogResult(bundled(), "No se pudo cargar el catálogo online (${e.message ?: e.javaClass.simpleName}). Mostrando el catálogo incluido.")
        }
    }

    private fun parse(text: String): List<Item> {
        val arr = JSONArray(text)
        return (0 until arr.length()).map { i ->
            val o = arr.getJSONObject(i)
            val ls = o.getJSONArray("links")
            Item(
                o.getString("title"),
                o.optString("type", "evento"),
                o.optString("time").ifBlank { null },
                (0 until ls.length()).map {
                    val l = ls.getJSONObject(it)
                    Link(l.getString("name"), l.getString("url"),
                        l.optString("quality").ifBlank { null },
                        if (l.has("peers")) l.getInt("peers") else null)
                })
        }
    }
}
