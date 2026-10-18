package com.simo.autoflow

import android.content.Context
import org.json.JSONArray
import java.net.URL

data class Link(val name: String, val url: String)
data class Item(val title: String, val links: List<Link>)

object Catalog {
    /** Descarga Config.CATALOG_URL; si falla o esta vacia, usa assets/catalog.json. Llamar fuera del hilo principal. */
    fun load(ctx: Context): List<Item> {
        val text = runCatching {
            if (Config.CATALOG_URL.isBlank()) error("sin url")
            URL(Config.CATALOG_URL).openConnection().apply { connectTimeout = 8000; readTimeout = 8000 }
                .getInputStream().bufferedReader().readText()
        }.getOrElse { ctx.assets.open("catalog.json").bufferedReader().readText() }
        val arr = JSONArray(text)
        return (0 until arr.length()).map { i ->
            val o = arr.getJSONObject(i)
            val ls = o.getJSONArray("links")
            Item(o.getString("title"), (0 until ls.length()).map {
                val l = ls.getJSONObject(it); Link(l.getString("name"), l.getString("url"))
            })
        }
    }
}
