# Índice de planos tipo – proyecto de ejecución

Base común para todos los tipos de obra, más los planos adicionales de cada uno.
Marca cada plano como **incluye / no aplica** al abrir el proyecto.
La normativa citada es orientativa: verificar vigencia y normativa autonómica.

## 0. Documentación general

| Cód. | Plano / documento | Contenido mínimo |
|---|---|---|
| G-00 | Portada e índice | Datos de proyecto, promotor, técnico, lista de planos y revisiones |
| G-01 | Situación y emplazamiento | Plano de situación, parcela, referencia catastral |
| G-02 | Cuadro de superficies | Útil y construida por estancia y planta |

## 1. Arquitectura (todos los tipos)

| Cód. | Plano | Contenido mínimo |
|---|---|---|
| A-01 | Planta de estado actual | Levantamiento: cotas, huecos, elementos a demoler o mantener |
| A-02 | Planta de demoliciones | Qué se retira (convención amarillo/rojo) |
| A-03 | Planta de distribución | Cotas parciales y totales, usos, superficies, ejes de referencia |
| A-04 | Planta de albañilería y replanteo | Tipos de tabique, acotado a ejes, huecos de paso |
| A-05 | Planta de acabados | Suelos, paredes, techos por estancia (código de acabado) |
| A-06 | Planta de techos | Falsos techos, alturas, registros, luminarias |
| A-07 | Secciones | Mínimo dos (longitudinal y transversal), alturas y capas de suelo y techo |
| A-08 | Alzados | Fachadas afectadas, huecos, rótulos |
| A-09 | Cuadro de carpinterías interiores | Código, medida, hoja, apertura, herrajes, cantidad |
| A-10 | Cuadro de carpinterías exteriores | Ídem, con transmitancia y vidrio |
| A-11 | Detalles constructivos | Encuentros de tabique, falso techo, suelo, baños, juntas |
| A-12 | Detalles de mobiliario fijo | Mostradores, armarios, encimeras |
| A-13 | Accesibilidad | Itinerarios, radios de giro, aseos adaptados |

## 2. Instalaciones (todos los tipos)

| Cód. | Plano | Contenido mínimo |
|---|---|---|
| I-01 | Electricidad: distribución y puntos | Tomas, interruptores, cuadros, circuitos |
| I-02 | Electricidad: iluminación y emergencia | Luminarias, alumbrado de emergencia |
| I-03 | Fontanería y saneamiento | Puntos de agua, red de evacuación, pendientes |
| I-04 | Climatización y ventilación | Equipos, conductos, rejillas, extracción |
| I-05 | Protección contra incendios | Extintores, BIE, detección, señalización, recorridos de evacuación |
| I-06 | Telecomunicaciones y datos | Cableado, racks, tomas |
| I-07 | Esquemas unifilares | Cuadros eléctricos |

## 3. Adicionales por tipo de obra

### Clínicas (prioridad 1)

| Cód. | Plano | Notas |
|---|---|---|
| C-01 | Zonificación funcional | Zonas limpias, sucias, de pacientes, de personal, circulaciones |
| C-02 | Esquema de flujos | Pacientes, personal, residuos, material estéril |
| C-03 | Cuadro de salas | Uso, superficie, ocupación, ventilación, acabados específicos |
| C-04 | Acabados sanitarios | Suelos continuos con rodapié sanitario, paredes lavables, encuentros curvos |
| C-05 | Instalaciones especiales | Gases medicinales, aspiración, sistema de llamada (si procede) |
| C-06 | Residuos sanitarios | Ubicación y recorrido |
| C-07 | Plan de evacuación y sectorización | Sectores de incendio, compartimentación |

Revisar con especial atención: autorización sanitaria de la comunidad autónoma, DB-SI
(sectorización y evacuación), DB-SUA (accesibilidad), DB-HS y ventilación, RITE y REBT.

### Locales comerciales (prioridad 2)

| Cód. | Plano | Notas |
|---|---|---|
| L-01 | Fachada y rótulos | Cumplimiento de ordenanzas municipales |
| L-02 | Planta de actividad | Aforo, salidas, recorridos de evacuación |
| L-03 | Mobiliario comercial | Estanterías, mostradores, probadores |
| L-04 | Ventilación y salida de humos | Si hay cocina u obrador |
| L-05 | Aseos y accesibilidad | Aseos adaptados y dotaciones |

Revisar con especial atención: licencia de actividad y apertura, aforo, DB-SI y DB-SUA,
ordenanzas municipales de rótulos y de ruido.

### Viviendas (prioridad 3)

| Cód. | Plano | Notas |
|---|---|---|
| V-01 | Distribución de mobiliario | Para validar con el cliente |
| V-02 | Cuarto húmedo: baños y cocina | Despiece de alicatados, aparatos, rejillas |
| V-03 | Tabiquería y trasdosados | Tipo, espesor, aislamiento |
| V-04 | Detalles de carpintería a medida | Armarios, puertas correderas, casonetos |

### Obra nueva (prioridad 4)

| Cód. | Plano | Notas |
|---|---|---|
| N-01 | Replanteo y urbanismo | Alineaciones, retranqueos, cumplimiento urbanístico |
| N-02 | Cimentación y estructura | Coordinar con proyecto de estructura |
| N-03 | Cubiertas | Pendientes, evacuación de aguas |
| N-04 | Envolvente térmica | Cumplimiento de DB-HE |
| N-05 | Urbanización de la parcela | Accesos, vallado, exteriores |
| N-06 | Memoria de calidades | Materiales y acabados por partidas |

## Nomenclatura de cada plano

`AAAA.MM.DD_Proyecto_Cód_Descripción_Rev.dxf`
Ejemplo: `2026.10.13_ClinicaNiova_A-03_Distribucion_R01.dxf`

## Checklist de salida de cada plano

- [ ] Cajetín completo (proyecto, promotor, técnico, título, escala, fecha, revisión)
- [ ] Escala gráfica y norte (plantas)
- [ ] Cotas parciales y totales sin repeticiones ni cotas cerradas
- [ ] Leyenda y claves de materiales
- [ ] Referencias cruzadas a detalles y secciones
- [ ] Capas según `plantillas/capas.md`
- [ ] Coherencia con mediciones y presupuesto
