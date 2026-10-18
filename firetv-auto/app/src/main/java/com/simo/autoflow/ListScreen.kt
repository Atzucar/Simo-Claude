package com.simo.autoflow

import android.app.Activity
import android.os.Bundle
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import android.widget.*

/** Pantalla base: titulo + lista navegable con el mando. */
abstract class ListScreen : Activity() {
    protected lateinit var status: TextView
    private lateinit var list: ListView

    abstract val screenTitle: String

    override fun onCreate(b: Bundle?) {
        super.onCreate(b)
        val title = TextView(this).apply { text = screenTitle; textSize = 32f; setPadding(0, 0, 0, 24) }
        status = TextView(this).apply { textSize = 18f; setPadding(0, 0, 0, 16) }
        list = ListView(this).apply { itemsCanFocus = false; isFocusable = true }
        setContentView(LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL; setPadding(96, 64, 96, 64)
            addView(title); addView(status)
            addView(list, LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, 0, 1f))
        })
    }

    protected fun show(labels: List<String>, onPick: (Int) -> Unit) {
        list.adapter = object : ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, labels) {
            override fun getView(p: Int, v: View?, parent: ViewGroup): View =
                (super.getView(p, v, parent) as TextView).apply { textSize = 26f; setPadding(24, 28, 24, 28); gravity = Gravity.START }
        }
        list.setOnItemClickListener { _, _, pos, _ -> onPick(pos) }
        list.requestFocus()
    }
}
