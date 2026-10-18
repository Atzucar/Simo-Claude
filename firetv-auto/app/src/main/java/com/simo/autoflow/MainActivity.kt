package com.simo.autoflow

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.provider.Settings
import android.view.Gravity
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView

class MainActivity : Activity() {
    override fun onCreate(b: Bundle?) {
        super.onCreate(b)
        val status = TextView(this).apply { textSize = 22f }
        val start = Button(this).apply { text = "INICIAR"; setOnClickListener {
            val s = FlowService.instance
            if (s == null) status.text = "Activa primero el servicio de accesibilidad"
            else { s.runFlow(); status.text = "Ejecutando..." }
        } }
        val acc = Button(this).apply { text = "Abrir ajustes de accesibilidad"; setOnClickListener {
            startActivity(Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS))
        } }
        setContentView(LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL; gravity = Gravity.CENTER; setPadding(80, 80, 80, 80)
            addView(status); addView(start); addView(acc)
        })
        start.requestFocus()
        status.text = if (FlowService.instance == null) "Servicio de accesibilidad desactivado" else "Listo"
    }
}
