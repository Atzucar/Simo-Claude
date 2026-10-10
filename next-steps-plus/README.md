# next-steps-plus

Basado en [next-steps](https://github.com/anthropics/claude-plugins-community/tree/main/next-steps) de Thariq Shihipar (MIT), con una barra de estado y un botón Handoff añadidos.

Barra encima del cuadro de texto:

- Caché (tiempo que le queda), contexto usado, límite de 5 horas, límite semanal y coste de la sesión.
- Siguientes pasos sugeridos: teclas 1, 2, 3 (el texto queda como borrador, nunca se envía solo) y 0 para descartar.
- **Handoff** (tecla H): resumen de la sesión puesto en el cuadro de texto y guardado. `/retomar` lo recupera en otra sesión.
- **Detalles** (tecla D): tokens leídos de la caché, escritos y nuevos, y tamaño de la ventana.

Opción `cacheMinutes` (60 por defecto): 5 si tu caché es la normal.

## Instalar (global)

```
/plugin install next-steps-plus --marketplace atzucar/simo-claude
```
