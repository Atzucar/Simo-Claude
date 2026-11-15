# -*- coding: utf-8 -*-
import html, sys
FIG='figs/'
def esc(s): return html.escape(s,quote=False)
def ol(items): return '<ol>'+''.join(f'<li>{i}</li>' for i in items)+'</ol>'
def ul(items,cls=''): return f'<ul class="{cls}">'+''.join(f'<li>{i}</li>' for i in items)+'</ul>'
def table(head,rows,cls=''):
    return f'<table class="{cls}"><thead><tr>'+''.join(f'<th>{h}</th>' for h in head)+'</tr></thead><tbody>'+''.join('<tr>'+''.join(f'<td>{c}</td>' for c in r)+'</tr>' for r in rows)+'</tbody></table>'

PAGES=[]
def page(parte,cap,titulo,sub,fig,intro=None,pasos=None,claves=None,errores=None,extra=None,figcap=None,figs=None,notas=None,si=None,foto=None,partidas=None):
    PAGES.append(dict(parte=parte,cap=cap,titulo=titulo,sub=sub,fig=fig,intro=intro,pasos=pasos,claves=claves,errores=errores,extra=extra,figcap=figcap,figs=figs,notas=notas,si=si,foto=foto,partidas=partidas))

P1='1 · Tabiquería de pladur'
P2='2 · Instalación eléctrica de vivienda'

# ---------------- TABIQUERÍA ----------------
page(P1,'1.1','Cómo está hecho un tabique','Un sistema de siete piezas: si falta una, el tabique funciona peor aunque se vea igual.','anat',
 intro='<b>Nomenclatura.</b> Un tabique <b>48/600 (1+1)</b> es un tabique con montantes de <b>48 mm</b> de ancho, colocados <b>cada 600 mm</b>, con <b>una placa por cada cara</b>. Todo lo demás se deduce de esas cifras.',
 extra=table(['Pieza','Para qué sirve','Dato habitual'],[
  ['<b>Canal</b> (perfil en U)','Guía inferior y superior; une el tabique al suelo y al techo.','Fijada con tacos o clavos cada 60 cm como máximo.'],
  ['<b>Montante</b> (perfil en C)','Esqueleto vertical; recibe los tornillos de las placas.','Cada 60 cm (o 40 / 30 cm). 1 cm más corto que la altura libre.'],
  ['<b>Banda acústica o estanca</b>','Separa el perfil de la obra y sella el contacto.','Espuma autoadhesiva de 3 a 5 mm, bajo canales y montantes de arranque.'],
  ['<b>Placa de yeso laminado</b>','Cierra el tabique; da resistencia, fuego y aislamiento.','12,5 o 15 mm. Borde afinado (BA) en los lados largos.'],
  ['<b>Lana mineral</b>','Absorbe el ruido dentro de la cámara.','40 a 70 mm según el perfil. Sin comprimir.'],
  ['<b>Tornillo PM</b>','Une placa y perfil.','3,5×25 mm la 1.ª placa; 3,5×35 mm la 2.ª.'],
  ['<b>Cinta y pasta de juntas</b>','Tapan las juntas y dejan la pared continua.','Cinta de papel o malla y 2 o 3 manos de pasta.']],'t'),
 figcap='Despiece: las placas se separan hacia fuera para ver la cámara con su lana y los montantes.')

page(P1,'1.2','Tres tabiques en sección: 1+1, 2+2 y 2+2 con membrana','Vista en planta, con cada capa separada para ver qué hay entre las dos caras.','sec3',
 intro='La <b>sección horizontal</b> es la forma más rápida de entender un tabique: lo que ves desde arriba es exactamente lo que atraviesa el ruido. En cada dibujo, las dos primeras capas de la izquierda y de la derecha son las placas de cada cara; en el centro, el montante en C y la lana.')

page(P1,'1.3','Elegir el tabique: comparativa','Qué aporta cada capa y cuándo compensa pagarla.','cmp',
 extra=table(['Tabique','Composición','Espesor','Peso aprox.','Uso habitual','Aislamiento (orden de magnitud)'],[
  ['<b>48/600 (1+1)</b>','1 placa de 12,5 por cara + lana de 40 mm','73 mm','≈ 20 kg/m²','Divisiones dentro de una vivienda o local','≈ 38-40 dBA'],
  ['<b>48/600 (2+2)</b>','2 placas por cara + lana de 40 mm','98 mm','≈ 38 kg/m²','Dormitorios, salas con ruido, mayor resistencia al fuego y al golpe','≈ 48-52 dBA'],
  ['<b>48/600 (2+2) con membrana</b>','Como el anterior, con membrana viscoelástica entre placas','≈ 100 mm','≈ 45 kg/m²','Cines en casa, estudios, separación exigente sin ganar espesor','≈ 52-56 dBA']],'t'),
 claves=[('Más masa','Cada placa de más sube el aislamiento acústico y la resistencia al fuego.'),('Cámara con lana','La lana absorbe el ruido que atraviesa la primera cara.'),('Membrana','Aporta masa y amortiguamiento sin ganar espesor.'),('Banda acústica','Corta el ruido que viaja por la estructura. Va en todos los casos.'),('Sellados','Cualquier hueco sin sellar anula buena parte del esfuerzo.')],
 errores=['Pagar una membrana y no sellar los pasos de tubos y cajas.','Pensar que más espesor compensa un tabique sin banda ni sellados.','Usar un 1+1 donde el CTE pide aislamiento entre unidades de uso distintas.'],
 notas='<b>Cómo leer la tabla.</b> Son cifras para comparar, no para proyectar: manda siempre el ensayo del sistema completo (mismos perfiles, placas, lana y tornillos). Referencia del CTE DB-HR: tabiquería <b>dentro de una misma vivienda</b>, R<sub>A</sub> ≥ 33 dBA; separación <b>entre unidades de uso distintas</b>, R<sub>A</sub> ≥ 50 dBA.',
 figcap='Los tres tabiques de la página anterior, resumidos.')

page(P1,'1.3','Tabique de una placa por cara (1+1)','El tabique estándar de vivienda: rápido, ligero y suficiente para dividir estancias.','p11',
 pasos=['<b>Replantea</b> el eje con láser y pásalo al techo con plomada.','<b>Pega la banda</b> bajo cada canal y bajo los montantes que tocan un muro.','<b>Fija las canales</b> con tacos o clavos cada 60 cm, el primero a unos 5 cm del extremo.','<b>Corta los montantes</b> 1 cm más cortos que la altura libre y encájalos cada 60 cm, todos con la apertura hacia el mismo lado. Atornilla solo los de arranque y los del hueco.','<b>Pasa las instalaciones</b>, coloca la lana ajustada sin comprimir y cierra la primera cara.','<b>Atornilla la placa</b> con tornillo PM 3,5×25 cada 25-30 cm, enrasado y sin romper el cartón.','<b>Cierra la otra cara</b> con juntas en montantes distintos a los de la primera.'],
 claves=[('Espesor','73 mm (48 + 2 × 12,5)'),('Montantes','48 mm, cada 60 cm'),('Tornillos','PM 3,5×25, cada 25-30 cm'),('Separación al suelo','Placas ≈ 1 cm por encima del suelo, con sellado'),('Peso','≈ 20 kg/m²')],
 errores=['La placa apoyada en el suelo: chupa humedad y se pudre por abajo.','Juntas de las dos caras sobre el mismo montante: el tabique se fisura en línea.','Tornillo que rompe el cartón: la placa deja de estar sujeta.'],
 figcap='Corte escalonado: la zona izquierda se deja abierta para ver lana y montantes; después aparece la placa.')

page(P1,'1.4','Tabique de dos placas por cara (2+2)','Más masa, más aislamiento acústico y más resistencia al fuego y al golpe.','p22',
 pasos=['<b>Mismo arranque</b>: replanteo, banda y canales, y montantes cada 60 cm.','<b>Primera capa en la cara A</b> con tornillo PM 3,5×25 hasta cada 75 cm: la segunda capa terminará de sujetarla.','<b>Instalaciones y lana</b>. Sella cada paso con masilla.','<b>Primera capa en la cara B</b>.','<b>Segunda capa en las dos caras</b>, con tornillo PM 3,5×35 cada 25-30 cm y juntas en un montante distinto al de la primera capa (desfase de 40 cm como mínimo).','<b>Trata solo las juntas de la capa exterior</b>, salvo que se exija estanqueidad al aire o al fuego.','<b>Sellado perimetral</b> con sellador acrílico.'],
 claves=[('Espesor','98 mm (48 + 4 × 12,5)'),('Tornillos','1.ª capa PM 25 mm; 2.ª capa PM 35 mm'),('Juntas','Desplazadas entre capas y entre caras'),('Peso','≈ 38 kg/m²'),('Fuego','EI 60 o más, según el sistema ensayado')],
 errores=['Usar tornillo de 25 mm en la segunda capa: no llega al perfil.','Juntas de la 2.ª capa sobre las de la 1.ª: se pierde el efecto de la doble capa.','Dejar sin sellar un paso de tubo: el ruido pasa por ahí.'])

page(P1,'1.5','Doble placa, con y sin membrana','Una lámina densa entre las dos placas mejora el aislamiento sin aumentar el espesor.','p22m',
 intro='<b>Qué es.</b> Una lámina viscoelástica (densa y flexible) que se coloca <b>entre la 1.ª y la 2.ª placa</b>. Añade masa y amortigua la vibración de las placas. También existen placas con la membrana ya integrada.',
 pasos=['Cierra la <b>1.ª capa</b> como en un tabique 2+2, con lana en la cámara.','<b>Extiende la membrana</b> sobre la 1.ª capa, a medida, sin huecos ni arrugas.','Une las piezas <b>a tope y séllalas con cinta</b>, o solápalas si lo indica el fabricante.','<b>Corta los huecos</b> de cajas y pasos con precisión y séllalos.','Cierra con la <b>2.ª capa</b>, con tornillo PM 3,5×35 cada 25-30 cm.'],
 extra=table(['','Sin membrana','Con membrana'],[['Espesor','98 mm','≈ 100 mm'],['Peso','≈ 38 kg/m²','≈ 45 kg/m²'],['Aislamiento (orden de magnitud)','≈ 48-52 dBA','≈ 52-56 dBA'],['Montaje','Más rápido','Más lento y exigente en sellados'],['Coste','Base','Más alto (lámina y mano de obra)']],'t'),
 errores=['Dejar la membrana rota o con huecos: pierde el efecto.','Atravesarla con tornillos de 25 mm: no agarran.','Olvidar la banda acústica: la membrana no sustituye a la banda.'],
 figcap='Con membrana: la lámina oscura entre las dos placas de cada cara.')

page(P1,'1.6','Separación entre montantes','Cuanto más juntos, más rígido y más alto puede ser el tabique.','sep',
 extra=table(['Separación','Cuándo','Qué consigues','Coste de perfilería'],[
  ['<b>600 mm</b>','Tabique estándar, altura normal (≈ 2,8 m con montante de 48 mm).','Cada borde de placa de 1.200 mm cae sobre un montante.','Base'],
  ['<b>400 mm</b>','Más altura, cargas colgadas, zonas con golpes.','Más rigidez; la placa trabaja menos.','≈ +50 % de montantes'],
  ['<b>300 mm</b>','Alicatado pesado, piedra, alturas máximas.','La mayor rigidez del sistema.','≈ el doble de montantes']],'t'),
 intro='<b>Altura máxima.</b> Como orden de magnitud, con una placa por cara y montantes a 600 mm, un montante de 48 mm sirve hasta unos 2,8 m y uno de 70 mm hasta unos 3,5 m. Para más altura: sube de perfil (70 o 90 mm), acerca los montantes a 400 o 300 mm o pasa a doble placa. <b>La altura exacta está en la tabla del fabricante del sistema.</b>',
 claves=[('Cargas colgadas','Refuerza con tablero de madera o perfil metálico entre montantes'),('Jambas y esquinas','Dos montantes juntos, espalda con espalda o encajados'),('Placa de 1.200 mm','Con 600, 400 o 300 mm sus bordes siempre caen sobre un montante')],
 errores=['Colgar un lavabo o un mueble pesado solo de la placa.','Separar los montantes más de 600 mm para ahorrar: el tabique se curva y se fisura.'],
 figcap='Tres filas de montantes: cada cota indica la separación entre ejes.')

page(P1,'1.7','Banda acústica y encuentro con el suelo','El detalle que más se olvida y más ruido evita.','suelo',
 intro='<b>Para qué sirve.</b> La banda <b>desolidariza</b> el perfil de la estructura (el ruido deja de viajar por el forjado) y <b>sella</b> el contacto contra el paso de aire. Sin banda, el tabique suena aunque tenga doble placa.',
 pasos=['<b>Limpia el suelo</b> y marca el eje.','<b>Pega la banda</b> a tope, sin solapes ni huecos, justo debajo de donde irá el canal.','<b>Coloca el canal</b> sobre la banda y <b>fíjalo con taco o clavo</b> cada 60 cm, el primero a unos 5 cm del extremo.','<b>Monta los montantes</b>. El que toca un muro lleva banda en toda su cara.','<b>Cierra con placas separadas ≈ 1 cm del suelo</b> y <b>sella la junta</b> con sellador acrílico (o la tapará el rodapié).'],
 claves=[('Banda','Espuma autoadhesiva de 3 a 5 mm'),('Anclaje','Cada 60 cm como máximo'),('Holgura','≈ 1 cm bajo la placa'),('Sellado','Sellador acrílico en todo el perímetro')],
 errores=['Banda con huecos o solapes: el aire y el ruido pasan por ahí.','Tabique con placa apoyada en el suelo: humedad y moho.','Separar viviendas apoyando el tabique sobre el suelo flotante: arranca del forjado y el recrecido se hace después.'],
 figcap='Detalle del arranque: la zona derecha muestra la placa; la izquierda, el canal, la banda y el taco.')

page(P1,'1.8','Encuentro con el techo','Dejar libre la flecha del forjado para que el tabique no cargue ni se fisure.','techo',
 pasos=['<b>Pega la banda</b> bajo el canal superior, como en el suelo.','<b>Fija el canal</b> al forjado cada 60 cm.','<b>Corta los montantes ≈ 1 cm más cortos</b> que la altura libre para poder meterlos entre canales.','<b>Termina las placas ≈ 1 cm por debajo del techo</b>, sin forzarlas.','<b>Sella</b> con sellador acrílico o elástico, no con yeso ni pasta rígida.','En tabiques largos, deja una <b>junta de movimiento</b> cada 12-15 m aproximadamente.'],
 claves=[('Holgura','≈ 1 cm entre placa y forjado'),('Sellado','Elástico, que admita movimiento'),('Banda','También bajo el canal superior')],
 errores=['Rellenar el hueco superior con pasta rígida: se fisura cuando el forjado se mueve.','Montantes tan justos que se cargan al forjado y lo transmiten al tabique.'],
 figcap='El canal superior queda pegado al forjado con su banda; el montante y la placa terminan un poco antes.')

page(P1,'1.9','Hueco de puerta','Jambas dobles, dintel y placas cortadas en L.','puerta',
 pasos=['<b>Mide el hueco del precerco</b>, no el de la puerta.','<b>Jambas</b>: dos montantes juntos a cada lado (espalda con espalda o encajados), atornillados al canal.','<b>Dintel</b>: un trozo de canal horizontal con patillas atornilladas a las jambas, a la altura del precerco.','<b>Montantes sobre el dintel</b>, cada 60 cm, hasta el canal superior.','<b>Precerco de madera</b> dentro del hueco para puertas pesadas o correderas; aplomado y escuadrado.','<b>Placas cortadas en L</b>: una sola pieza cubre el ángulo del hueco. Ninguna junta debe nacer en las esquinas.'],
 claves=[('Jambas','2 montantes por lado'),('Dintel','Canal horizontal con patillas'),('Juntas','Nunca alineadas con el ángulo del hueco')],
 errores=['Una junta que nace en la esquina del hueco: se abre una grieta en cuanto se cierra la puerta.','Jamba de un solo montante: la puerta se descuelga.','Precerco sin escuadrar: la puerta no cierra bien.'],
 figcap='La zona de la izquierda queda abierta para ver lana, montantes y jambas; a la derecha la placa rodea el hueco.')

page(P1,'1.10','Juntas y acabado','Cómo se vuelve invisible la unión entre dos placas.','juntas',
 pasos=['<b>Comprueba</b> que las placas están a tope, con 1-2 mm entre bordes afinados y los tornillos ligeramente hundidos.','<b>Rellena</b> el hueco con pasta de juntas y embebe la <b>cinta</b> (papel o malla).','<b>Refuerzo</b>: cubre la cinta con una capa de pasta y deja secar.','<b>2.ª mano</b> más ancha (≈ 25 cm), dejando secar entre manos.','<b>Acabado</b> ≈ 35-40 cm de ancho y <b>lijado</b> fino.','<b>Cabezas de tornillo</b> y <b>cantoneras</b> en esquinas salientes, con la misma pasta.'],
 extra=table(['Nivel','Qué se hace','Dónde'],[['<b>Q1</b>','Rellenar y embeber cinta','Zonas ocultas o que se van a alicatar'],['<b>Q2</b>','Q1 + una capa de acabado y lijado','Pintura mate normal, papel pintado'],['<b>Q3</b>','Q2 + capa fina de pasta en toda la superficie','Pintura lisa y luz lateral'],['<b>Q4</b>','Capa de pasta en toda la placa y lijado extremo','Pinturas brillantes, luz rasante']],'t'),
 errores=['Pasar de mano sin esperar el secado: se agrieta o se despega.','Cinta con burbujas o sin pasta debajo.','Pintar sobre pasta sin imprimar: los bordes de las juntas se marcan.'],
 figcap='Despiece de la junta: borde afinado, cinta y manos de pasta, de dentro hacia fuera.')

page(P1,'1.11','Esquinas, encuentros en T y contra muro','Cada encuentro tiene su montante de apoyo y su cantonera.','encuentros',
 pasos=['<b>Esquina en L</b>: un montante de arranque en cada tabique; las placas de una cara pasan a tope y las de la otra cubren.','<b>Cantonera metálica</b> en la arista saliente, atornillada y cubierta con pasta.','<b>Encuentro en T</b>: monta un <b>montante extra</b> en el tabique principal, para atornillar las placas del tabique que llega.','<b>Contra un muro</b>: banda en la cara del montante de arranque y fíjalo al muro cada 60 cm.','<b>Sella</b> el encuentro con sellador acrílico.'],
 errores=['Montante de arranque sin banda: el ruido pasa por el muro.','Esquina sin cantonera: se desconcha al primer golpe.','T sin montante extra: la placa del tabique que llega queda en el aire.'],
 figcap='Esquina en L, encuentro en T y encuentro contra un muro existente, en planta.')

page(P1,'1.12','Instalaciones dentro del tabique','Pasar tubos y cajas sin debilitar el tabique ni su aislamiento acústico.','pasos',
 pasos=['<b>Aprovecha los troquelados</b> del montante: no cortes el perfil.','<b>Coloca casquillos pasacables</b> en cada orificio para proteger el cable.','<b>Tubos horizontales</b> entre montantes, sujetos con bridas.','<b>Cajas de mecanismo especiales</b> para pladur (con garras), recortadas con la corona.','<b>Lana alrededor</b> de la caja y de los tubos, sin huecos.','<b>Sella los pasos</b> con masilla (intumescente si el tabique es cortafuegos).'],
 claves=[('Cajas enfrentadas','Desfasa las de cada cara ≈ 20 cm'),('Tubos','Un tubo por circuito'),('Fuego','Pasos sellados en tabiques de sector')],
 errores=['Cortar el montante para pasar un tubo.','Cajas enfrentadas por las dos caras: dejan un puente acústico.','Cables sueltos en la cámara, sin tubo ni casquillo.'],
 figcap='La lana se muestra transparente para ver los tubos que atraviesan los montantes.')

page(P1,'1.13','Falso techo de pladur','Una estructura colgada del forjado y una placa atornillada.','techofalso',
 pasos=['<b>Marca el nivel</b> final con láser en todo el perímetro.','<b>Fija el perfil angular</b> perimetral.','<b>Cuelga las varillas</b> con anclajes al forjado, cada 1,0-1,2 m según carga.','<b>Monta los perfiles primarios</b> y los secundarios (maestras) cada 50 cm, nivelados.','<b>Pasa las instalaciones</b> y deja registros donde haga falta.','<b>Atornilla la placa</b> cada 25 cm, con juntas contrapeadas, y trata las juntas.'],
 claves=[('Maestras','Cada 50 cm'),('Varillas','Cada 1,0-1,2 m aprox.'),('Tornillos','Cada 25 cm'),('Registros','En válvulas, cajas y empalmes')],
 errores=['Colgar luminarias pesadas de la placa, sin refuerzo en la perfilería.','Cerrar sin dejar registro a una válvula.','Perfilería torcida: se nota con luz rasante.'])

page(P1,'1.14','Trasdosado autoportante','Una pared nueva delante de un muro, para aislar, nivelar o ocultar instalaciones.','tras',
 pasos=['<b>Revisa el muro</b>: seco y sin humedad ni salitre.','<b>Replantea</b> el plano final con láser.','<b>Pega la banda</b> y fija el canal inferior y el superior.','<b>Monta los montantes</b>, sin tocar el muro.','<b>Cuelga lana mineral</b> de 40-50 mm en la cámara.','<b>Atornilla la placa</b> y trata las juntas.'],
 claves=[('Cámara','Entre muro y placa, con lana'),('Banda','Bajo canal y en el encuentro con el muro'),('Humedad','Si hay humedad, se trata antes de trasdosar')],
 errores=['Trasdosar sobre un muro con humedad.','Montantes pegados al muro, sin banda ni separación.','Cerrar sin lana ni cajas de mecanismos.'])

# ---------------- ELECTRICIDAD ----------------
page(P2,'2.1','El cuadro eléctrico y los circuitos de una vivienda','Del cuadro salen cinco circuitos básicos; cada uno con su protección y su sección.','cuadro',
 intro='<b>Cómo se lee.</b> La corriente entra por la <b>acometida</b>, pasa por el <b>IGA</b> (interruptor general automático), por el <b>diferencial</b> de 30 mA (protege a las personas) y se reparte a los <b>PIA</b> (protegen cada circuito y su cable). En electrificación básica (5.750 W) el IGA es de 25 A; en la elevada (9.200 W), de 40 A.',
 extra=table(['Circuito','Para qué','PIA','Cable','Tubo','Máximo de puntos'],[['<b>C1</b>','Alumbrado','10 A','1,5 mm²','Ø 16','30'],['<b>C2</b>','Tomas generales y frigorífico','16 A','2,5 mm²','Ø 20','20'],['<b>C3</b>','Cocina y horno','25 A','6 mm²','Ø 25','2'],['<b>C4</b>','Lavadora, lavavajillas y termo','20 A','4 mm²','Ø 20','3'],['<b>C5</b>','Baños y bases auxiliares de cocina','16 A','2,5 mm²','Ø 20','6']],'t'),
 notas='Valores de la ITC-BT-25 del REBT para el grado básico. En electrificación elevada se añaden circuitos (secadora, calefacción, aire acondicionado, domótica, etc.). <b>Etiqueta cada PIA</b> y deja el esquema unifilar dentro del cuadro.',
 figcap='Cuadro con IGA, diferencial y cinco PIA, con el peine de conexión.')

page(P2,'2.2','Cables y tubos','Qué cable se usa, de qué color y por qué tubo pasa.','cables',
 intro='<b>El cable.</b> Se usa conductor unipolar de cobre, flexible, <b>450/750 V</b>: tipo <b>H07V-K</b> (aislamiento de PVC) o <b>ES07Z1-K (AS)</b>, libre de halógenos, que es el exigible en locales de pública concurrencia. La sección depende del circuito (ver tabla 2.1).',
 extra=table(['Color','Función'],[['<b style="color:#8B4A2B">Marrón</b>, negro y gris','Fases (y sus retornos)'],['<b style="color:#2E6FD8">Azul claro</b>','Neutro'],['<b style="color:#2E9E3F">Verde-amarillo</b>','Conductor de protección (tierra)']],'t'),
 claves=[('Tubo Ø16','Alumbrado, 1,5 mm²'),('Tubo Ø20','Tomas, lavadora, baño: 2,5 y 4 mm²'),('Tubo Ø25','Cocina y horno, 6 mm²'),('Tubo','Corrugado reforzado, no propagador de la llama; los cables deben entrar con holgura')],
 notas='<b>Colores en los dibujos de este librito.</b> Para distinguir los hilos se dibujan en <b>naranja</b> el retorno y en <b>gris y negro</b> los viajeros. En obra el retorno y los viajeros se hacen con cualquiera de los colores de fase (marrón, negro o gris); el azul y el verde-amarillo no se usan nunca para otra cosa.',
 figcap='Izquierda: cables de 1,5 a 6 mm² con su hilo de cobre. Derecha: tubos corrugados con los tres cables dentro.')

page(P2,'2.3','Recorrido de la instalación en una habitación','Cajas de derivación, bajantes y tubos de las tomas.','estancia',
 pasos=['<b>Replantea los puntos</b> con el cliente: luz, interruptores y tomas, en su sitio real.','<b>Decide dónde va la caja de derivación</b> y que sea registrable.','<b>Haz las rozas</b> en vertical y horizontal. Nunca en diagonal.','<b>Coloca los tubos</b> corrugados, uno por circuito, con curvas amplias y sujetos.','<b>Pasa los cables</b> con guía cuando el yeso o el mortero estén fraguados.','<b>Marca y fotografía</b> el recorrido antes de cerrar.'],
 claves=[('Rozas','Verticales y horizontales, nunca en diagonal'),('Profundidad','La justa para el tubo; no debilitar el muro'),('Separación','Respeta las distancias del REBT y del CTE con agua y gas'),('Circuitos','Un tubo por circuito, sin mezclar')],
 errores=['Roza diagonal: debilita el tabique y no se sabe luego por dónde va.','Tubo con codos cerrados: el cable no pasa.','Cerrar sin foto: no se sabrá por dónde van los tubos.'],
 figcap='Ejemplo: un tubo por el techo hasta la lámpara, una bajante al interruptor y otro tubo a las tomas.')

page(P2,'2.4','Caja de mecanismo empotrada','Cómo queda un interruptor o un enchufe por dentro de la pared.','caja',
 pasos=['<b>Roza</b> vertical con el tubo hasta la caja.','<b>Caja universal</b> de Ø 65 mm, fijada con yeso o mortero a ras del acabado final.','<b>Tubo corrugado</b> entra por las pestañas de la caja, sin doblarlo en ángulo.','<b>Pasa los cables</b> con guía y déjalos con una vuelta libre para poder conectar.','<b>Guarnecido</b> alrededor de la caja, enrasado con la pared.','<b>Mecanismo y marco</b> al final de la obra, ya pintada.'],
 claves=[('Caja','Universal Ø 65 mm, profundidad ≥ 40 mm'),('Cajas en bloque','Entre ejes ≈ 71 mm'),('Curvas','Con radio amplio, sin acodar el tubo')],
 errores=['Caja torcida: el mecanismo queda inclinado.','Caja hundida respecto al acabado: no se puede atornillar el mecanismo.','Cables cortos: no se puede conectar.'],
 figcap='Corte por el eje de la caja: ladrillo, roza con tubo, caja y guarnecido.')

page(P2,'2.5','Punto de luz sencillo','Una lámpara y un interruptor: el interruptor corta la fase.','luz',
 intro='<b>Lógica.</b> La <b>fase</b> llega a la caja de derivación y va al interruptor. Al cerrarse, vuelve como <b>retorno</b> hasta la lámpara. El <b>neutro</b> va directo a la lámpara y la <b>tierra</b> también. El interruptor solo corta la fase: así la lámpara nunca queda con tensión cuando está apagada.',
 pasos=['<b>Línea</b> de 3 conductores de 1,5 mm² (fase, neutro y tierra) hasta la caja de derivación.','<b>Fase</b> de la regleta al borne de entrada del interruptor.','<b>Retorno</b> del borne de salida del interruptor a la lámpara.','<b>Neutro</b> de su regleta directo a la lámpara.','<b>Tierra</b> de su regleta a la lámpara (aunque sea de clase II, se deja).','<b>Prueba</b> con comprobador antes de cerrar la caja.'],
 claves=[('Cable','1,5 mm²'),('Tubo','Ø 16'),('Interruptor → caja','2 conductores (fase y retorno)'),('Caja → lámpara','Neutro, retorno y tierra')],
 errores=['Interrumpir el neutro en vez de la fase: la lámpara queda con tensión.','Usar el azul o el verde-amarillo para el retorno.','Empalmar fuera de caja.'],
 figcap='Esquema de conexión. En obra los cables recorren los tubos hasta la caja de derivación; el dibujo muestra las conexiones de forma directa.')

page(P2,'2.6','Punto de luz conmutado','Una lámpara que se enciende y apaga desde dos sitios.','conm',
 intro='<b>Lógica.</b> Cada conmutador tiene un <b>común</b> y dos salidas. Los dos <b>viajeros</b> unen las salidas de un conmutador con las del otro. Con el común del 1.º recibes la fase; el común del 2.º sale hacia la lámpara. Se cambia la posición de cualquiera de los dos y el circuito se cierra o se abre.',
 pasos=['<b>Fase</b> de la caja al <b>común del conmutador 1</b>.','<b>Viajero 1</b> (gris): salida 1 del conmutador 1 a la salida 1 del conmutador 2.','<b>Viajero 2</b> (negro): salida 2 del conmutador 1 a la salida 2 del conmutador 2.','<b>Retorno</b>: del común del conmutador 2 a la lámpara.','<b>Neutro y tierra</b> directos a la lámpara.','<b>Prueba</b> las cuatro combinaciones.'],
 claves=[('Entre conmutadores','2 viajeros (y tierra si hay)'),('Cable','1,5 mm², tubo Ø 16'),('Mecanismos','2 conmutadores')],
 errores=['Confundir el común con una salida: la lámpara solo funciona con un conmutador.','Cruzar viajeros y retorno al cambiarlos de caja.','No señalar cuál es cada hilo antes de cerrar.'],
 figcap='Conmutado: los viajeros (gris y negro) unen los dos conmutadores; el retorno naranja sale del común del segundo.')

page(P2,'2.7','Punto de luz con cruzamiento','Tres o más puntos de mando para la misma lámpara.','cruce',
 intro='<b>Lógica.</b> Entre dos conmutadores se intercala un <b>interruptor de cruzamiento</b>, que tiene cuatro bornes: los dos viajeros entran por un lado y salen por el otro, <b>cruzados dentro del mecanismo</b>. Se puede poner uno por cada punto de mando adicional.',
 pasos=['<b>Fase</b> al común del <b>conmutador 1</b>, como en el conmutado.','<b>Viajeros</b> del conmutador 1 a los bornes de <b>entrada del cruzamiento</b>.','<b>Viajeros</b> de salida del cruzamiento a las salidas del <b>conmutador 2</b>.','<b>Retorno</b> del común del conmutador 2 a la lámpara.','<b>Neutro y tierra</b> directos a la lámpara.','<b>Para más puntos</b>, repite el cruzamiento entre los dos conmutadores.'],
 claves=[('Cruzamiento','Mecanismo de 4 bornes'),('Mínimo','2 conmutadores + n cruzamientos'),('Cable','1,5 mm²')],
 errores=['Poner el cruzamiento en un extremo: debe quedar entre los dos conmutadores.','Cambiar la pareja de viajeros dentro del cruzamiento: la lámpara no responde.','No etiquetar los viajeros.'],
 figcap='Con cruzamiento: los viajeros se cruzan dentro del mecanismo central.')

page(P2,'2.8','Caja de derivación y empalmes','Los empalmes solo se hacen dentro de una caja registrable, con regletas.','deriv',
 intro='<b>Regla.</b> Ningún empalme va dentro del tubo ni de la pared. Todas las uniones se hacen en una <b>caja de derivación</b> (habitualmente de 100 × 100 mm), con <b>regletas de empalme</b> o bornes, y esa caja debe quedar <b>accesible</b>.',
 pasos=['<b>Pela 10-12 mm</b> de cada hilo, sin dañar el cobre.','<b>Abre la palanca</b> de la regleta, introduce el hilo hasta el fondo y cierra.','<b>Agrupa por función</b>: una regleta para la fase, otra para el neutro, otra para la tierra.','<b>Tira de cada hilo</b> para comprobar que ha quedado sujeto.','<b>Etiqueta</b> los circuitos y deja la caja al ras, con tapa.'],
 claves=[('Caja','100 × 100 mm, registrable'),('Regleta','De palanca o bornes, para 2 a 5 hilos'),('Prohibido','Retorcer y cubrir con cinta')],
 errores=['Empalmes retorcidos y cubiertos con cinta: recalientan y fallan.','Caja de derivación tapada con yeso o escondida tras un mueble.','Mezclar circuitos diferentes en la misma regleta.'],
 figcap='Caja abierta con tres regletas: fase (arriba), neutro (centro) y tierra (abajo).')

page(P2,'2.9','Enchufes','Toma de 16 A con tres bornes: fase, neutro y tierra.','enchufes',
 pasos=['<b>Cajas</b> a su altura (ver página siguiente), niveladas.','<b>Cable de 2,5 mm²</b> (fase, neutro y tierra) por tubo Ø 20.','<b>Pela 10-12 mm</b> y conecta fase, neutro y tierra en los <b>bornes de entrada</b>.','<b>Del mismo borne</b> sale el cable a la siguiente toma: así se encadenan sin cortar el circuito.','<b>Coloca el mecanismo</b> sin pinzar los cables.','<b>Prueba</b> con comprobador de enchufes: fase, neutro y tierra.'],
 claves=[('Cable','2,5 mm² (6 mm² en C3 y 4 mm² en C4)'),('Protección','PIA de 16 A y diferencial de 30 mA'),('Tomas por circuito','Hasta 20 en C2'),('Tierra','Siempre conectada')],
 errores=['Hacer el puente de neutro o tierra con un trozo de cable en vez de usar los bornes.','Cables más gruesos que los bornes: se queda mal apretado.','Dejar sin conectar la tierra «porque funciona igual».'],
 figcap='Dos tomas encadenadas: cada una tiene bornes de entrada y de salida.')

page(P2,'2.10','Alturas y distancias de los mecanismos','Dónde se colocan los interruptores y las tomas de corriente.','alturas',
 extra=table(['Elemento','Altura habitual'],[['<b>Interruptores</b>','≈ 105 cm desde el suelo terminado'],['<b>Enchufes de vivienda</b>','≈ 30 cm (mínimo 20 cm)'],['<b>Enchufes sobre encimera de cocina</b>','≈ 115 cm (encimera a unos 110 cm)'],['<b>Distancia al marco de la puerta</b>','15-20 cm'],['<b>Mecanismos accesibles</b> (CTE DB-SUA)','Entre 80 y 120 cm']],'t'),
 claves=[('Agrupación','Mecanismos en bloque con ≈ 71 mm entre ejes'),('Baños','Respetar los volúmenes de protección de la ITC-BT-27'),('Mecanismos al final','Sobre pared ya pintada')],
 errores=['Interruptor detrás de la hoja de la puerta.','Enchufes demasiado bajos para una persona mayor.','Interruptor y enchufe desalineados en la misma pared.'],
 figcap='Alzado de una pared de cocina con puerta, interruptor, enchufe y enchufe sobre encimera.')


import json
from topics import TOPICS
PARTE={'3':'3 · Fontanería y saneamiento','4':'4 · Climatización'}
for tp in TOPICS:
    page(PARTE[tp['parte']],'',tp['titulo'],tp['sub'],tp['fig'],intro=tp.get('intro'),pasos=tp['pasos'],claves=tp['claves'],errores=tp['no'],extra=tp.get('extra'),notas=tp.get('notas'),figcap=tp.get('figcap'),si=tp['si'],foto=tp['foto'])
CAPPART={'01':'5 · Demoliciones y trabajos previos','02':'6 · Albañilería y cubiertas','03':'7 · Solados, alicatados y rodapiés','07':'8 · Carpintería exterior e interior','08':'8 · Carpintería exterior e interior','09':'9 · Chapados y pintura','10':'9 · Chapados y pintura','11':'10 · Rótulos, iluminación y mobiliario','13':'10 · Rótulos, iluminación y mobiliario','14':'10 · Rótulos, iluminación y mobiliario','15':'11 · Protección contra incendios','16':'12 · Cimentación, estructura y movimiento de tierras','05':PARTE['4'],'06':P2}
import re as _re
for a in json.load(open('autofichas.json',encoding='utf-8')):
    pasos=[f"<b>{esc(s[0])}</b>. {esc(s[1])}" for s in a['steps']]
    page(CAPPART[a['cap']],'',a['t'],a['s'],'a%d'%a['i'],pasos=pasos,errores=a['no'],si=a['si'],foto=a['foto'],partidas=a['partidas'])

# ---------------- LISTAS ----------------
LISTAS=dict(font=['Llave general y llaves de corte accesibles y señalizadas.','Fría por debajo de la caliente, separadas ≥ 4 cm, caliente aislada.','Un tubo por aparato desde el colector, en vaina.','Termo con antirretorno, grupo de seguridad y descarga visible.','Desagües con pendiente del 2 al 4 % y sifón accesible.','Bajante ventilada hasta cubierta y registro al pie.','Prueba de presión realizada y fotografiada.','Lavamanos clínico con grifo sin contacto manual.'],clima=['Carga térmica calculada y potencia elegida.','Unidad exterior con espacio libre y soportes antivibratorios.','Pasamuros con pendiente hacia fuera y sellado.','Líneas con aislante continuo en cada tubo por separado.','Uniones abocardadas con par de apriete y vacío realizado.','Desagüe de condensados con pendiente y sifón, probado con agua.','Cassette colgado del forjado; conductos con flexibles estirados.','Líneas etiquetadas por estancia en los multisplit.'],tab=['Replanteo hecho con láser y verificado.','Banda acústica bajo canales y montantes de arranque.','Canales fijadas cada 60 cm, sin huecos.','Montantes aplomados, cada 60 cm (o menos).','Jambas dobles y dintel en los huecos.','Instalaciones con casquillo y cajas desfasadas.','Lana colocada sin huecos ni compresión.','Foto de la cámara abierta, antes de cerrar.','Placas separadas ≈ 1 cm del suelo y del techo.','Tornillos enrasados, juntas desplazadas.','Juntas tratadas y lijadas al nivel pedido.','Perímetro sellado.'],
 ele=['Línea y circuitos etiquetados en el cuadro.','Secciones y tubos según la tabla de circuitos.','Rozas verticales y horizontales, sin diagonales.','Cajas niveladas y a su altura.','Empalmes solo en cajas de derivación, con regleta.','Colores correctos: azul neutro, verde-amarillo tierra.','Fase por el interruptor, nunca el neutro.','Foto de los tubos y cajas antes de cerrar.','Aislamiento medido (500 V, ≥ 0,5 MΩ) y continuidad de tierra.','Diferenciales disparados con el pulsador de prueba.','Boletín (certificado de instalación) firmado por instalador autorizado.','Esquema unifilar entregado al cliente.'])

HTML_HEAD='''<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Atlas técnico de obra</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap">
<style>
@page{size:A4;margin:0}
*{box-sizing:border-box}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{margin:0;font-family:'Inter',Arial,sans-serif;color:#10213F;font-size:10.2pt;line-height:1.4}
.pg{width:210mm;height:297mm;position:relative;overflow:hidden;page-break-after:always;background:#fff}
.hd{height:12mm;background:#0E2A57;color:#fff;display:flex;justify-content:space-between;align-items:center;padding:0 12mm;font:700 9.5pt 'Barlow Condensed',Arial;letter-spacing:.12em;text-transform:uppercase}
.hd i{color:#FFB07F;font-style:normal}
.in{padding:6mm 12mm 0 12mm}
.ttl{display:grid;grid-template-columns:auto 1fr;gap:0 6mm;align-items:end;margin-bottom:3mm}
.num{font:800 40pt/0.85 'Barlow Condensed',Arial;color:#F26A1B}
h1{font:800 22pt/0.98 'Barlow Condensed',Arial;text-transform:uppercase;margin:0}
.sub{grid-column:2;color:#566682;font-size:9.3pt;margin-top:1mm}
.fig{border:1px solid #C7D0DF;background:#EEF2F8;margin:0}
.fig img{display:block;width:100%;height:auto}
.cap{font-size:8.2pt;color:#566682;padding:1.2mm 0 0 0}
.sec{font:800 13pt/1 'Barlow Condensed',Arial;text-transform:uppercase;color:#fff;background:#0E2A57;padding:1.4mm 3mm;margin:3mm 0 1.6mm 0;display:flex;gap:2.5mm;align-items:center}
.sec.no{background:#D32F2F}.sec.ok{background:#1B8F50}
.cols{display:grid;grid-template-columns:1fr 1fr;gap:0 7mm;margin-top:2.6mm}
.cols>div{min-width:0}
h3{font:800 12.5pt/1 'Barlow Condensed',Arial;text-transform:uppercase;margin:0 0 1.4mm 0;color:#F26A1B}
ol{margin:0;padding:0;counter-reset:n;list-style:none}
ol li{counter-increment:n;position:relative;padding-left:7mm;margin-bottom:1.2mm}
ol li::before{content:counter(n);position:absolute;left:0;top:.2mm;width:5mm;height:5mm;border-radius:50%;background:#F26A1B;color:#fff;font:800 9pt/5mm 'Barlow Condensed',Arial;text-align:center}
ul{margin:0;padding:0;list-style:none}
ul li{position:relative;padding-left:5mm;margin-bottom:1.1mm}
ul.ok li::before{content:"✓";position:absolute;left:0;color:#1B8F50;font-weight:800}
.chips{display:flex;flex-wrap:wrap;gap:1.2mm}.chips span{font-size:7.6pt;background:#E3E9F3;padding:.6mm 1.8mm;border-radius:1mm}.chips span b{color:#F26A1B;font:800 8pt 'Barlow Condensed',Arial;margin-right:1mm}
ul.err li::before{content:"✕";position:absolute;left:0;color:#D32F2F;font-weight:800}
ul.k li::before{content:"";position:absolute;left:0;top:2mm;width:2.2mm;height:2.2mm;background:#F26A1B}
table.t{width:100%;border-collapse:collapse;font-size:8.9pt;margin-top:1mm}
table.t th{background:#E3E9F3;text-align:left;padding:1.2mm 2mm;font:800 9.5pt 'Barlow Condensed',Arial;text-transform:uppercase;letter-spacing:.03em}
table.t td{padding:1.2mm 2mm;border-bottom:1px solid #D3DAE6;vertical-align:top}
.note{margin-top:2.6mm;padding:2.2mm 3mm;background:#FFF3EA;border-left:1.2mm solid #F26A1B;font-size:9.2pt}
.k dl{margin:0}
.kv{display:grid;grid-template-columns:30% 1fr;gap:0 3mm;font-size:9.3pt;border-bottom:1px solid #D3DAE6;padding:.9mm 0}
.kv b{font:800 9.5pt 'Barlow Condensed',Arial;text-transform:uppercase;color:#0E2A57}
.ft{position:absolute;bottom:0;left:0;right:0;height:9mm;display:flex;justify-content:space-between;align-items:center;padding:0 12mm;font-size:7.5pt;color:#566682;border-top:1px solid #D3DAE6}
.cover{background:#0E2A57;color:#fff}
.cover .big{padding:22mm 16mm 0}
.cover .kick{font:700 14pt 'Barlow Condensed',Arial;letter-spacing:.18em;text-transform:uppercase;color:#FFB07F}
.cover h1{font-size:54pt;line-height:.9;margin:4mm 0 5mm}
.cover h1 em{font-style:normal;color:#F26A1B}
.cover p{font-size:12pt;max-width:140mm;color:#D6E0F2}
.cover .imgs{position:absolute;left:0;right:0;bottom:0}
.cover .imgs img{width:100%;display:block}
.toc{padding:16mm 16mm 0}
.toc h1{font-size:30pt;margin-bottom:6mm}
.toc h2{font:800 15pt 'Barlow Condensed',Arial;text-transform:uppercase;color:#F26A1B;margin:5mm 0 2mm}
.toc{padding:12mm 12mm 0}.toc h1{font-size:24pt;margin-bottom:3mm}.toc .r{display:grid;grid-template-columns:8mm 1fr 5mm;border-bottom:1px dotted #9AA7BD;padding:.3mm 0;font-size:6.9pt;line-height:1.2}.toc .r b{font-size:8pt}.toc h2{font-size:9.5pt;margin:2.4mm 0 .6mm}
.toc .r b{font:800 12pt 'Barlow Condensed',Arial;color:#0E2A57}
.chk{display:grid;grid-template-columns:1fr 1fr;gap:0 8mm}
.chk li{padding-left:6.5mm;margin-bottom:1.8mm;font-size:9pt}
.chk li::before{content:"";position:absolute;left:0;top:.7mm;width:3.6mm;height:3.6mm;border:1.4px solid #0E2A57;background:#fff}
</style></head><body>'''
def pagehtml(p,i,total,mode='F'):
    if mode=='B': return pageB(p,i)
    h=f'<section class="pg" data-t="{esc(p["titulo"])}"><div class="hd"><span>Atlas técnico de obra</span><span><i>{esc(p["parte"])}</i></span></div><div class="in">'
    h+=f'<div class="ttl"><div class="num">{p["cap"]}</div><h1>{esc(p["titulo"])}</h1><div class="sub">{esc(p["sub"])}</div></div>'
    if p['fig']=='sec3':
        for f,c in [('sec11','1+1: una placa por cara'),('sec22','2+2: dos placas por cara'),('sec22m','2+2 con membrana')]:
            h+=f'<div class="cap"><b>{c}</b></div><div class="fig"><img src="{FIG}{f}.jpg"></div>'
    elif p['fig']=='cmp':
        pass
    else:
        h+=f'<div class="fig"><img src="{FIG}{p["fig"]}.jpg"></div>'
        if p.get('figcap'):h+=f'<div class="cap">{esc(p["figcap"])}</div>'
    if p['intro']:h+=f'<div style="margin-top:2.6mm">{p["intro"]}</div>'
    if mode=='A':
        left='<h3>Cómo se hace</h3>'+ol(p['pasos']);right='<h3>Datos clave</h3>'+''.join(f'<div class="kv"><b>{esc(k)}</b><span>{esc(v)}</span></div>' for k,v in (p['claves'] or []))
        h+=f'<div class="cols"><div>{left}</div><div>{right}</div></div>'
        h+=f'</div><div class="ft"><span>Guía de buena práctica. Prevalecen el proyecto, la normativa y la ficha del fabricante.</span><span><b>{i}</b></span></div></section>'
        return h
    if p['pasos'] or p['claves'] or p['errores']:
        left=''
        right=''
        if p['pasos']:left+='<h3>Cómo se hace</h3>'+ol(p['pasos'])
        if p['claves']:right+='<h3>Datos clave</h3>'+''.join(f'<div class="kv"><b>{esc(k)}</b><span>{esc(v)}</span></div>' for k,v in p['claves'])
        if p['errores']:right+='<h3 style="margin-top:3mm;color:#D32F2F">Errores frecuentes</h3>'+ul(p['errores'],'err')
        if p.get('si'):right+='<h3 style="margin-top:3mm;color:#1B8F50">Cómo va</h3>'+ul(p['si'],'ok')
        if p['pasos']: h+=f'<div class="cols"><div>{left}</div><div>{right}</div></div>'
        else: h+=f'<div class="cols"><div>{right}</div><div></div></div>' if not p['extra'] else ''
    if p['extra']:h+=f'<div style="margin-top:2.6mm">{p["extra"]}</div>'
    if p['pasos']==None and (p['claves'] or p['errores']) and p['extra']:
        h+='<div class="cols"><div>'+(('<h3>Datos clave</h3>'+''.join(f'<div class="kv"><b>{esc(k)}</b><span>{esc(v)}</span></div>' for k,v in p['claves'])) if p['claves'] else '')+'</div><div>'+(('<h3 style="color:#D32F2F">Errores frecuentes</h3>'+ul(p['errores'],'err')) if p['errores'] else '')+'</div></div>'
    if p['fig']=='cmp':
        h+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:3mm;margin-top:4mm">'+''.join(f'<div><div class="fig"><img src="{FIG}{f}.jpg"></div><div class="cap"><b>{c}</b></div></div>' for f,c in [('p11','1+1'),('p22','2+2'),('p22m','2+2 con membrana')])+'</div>'
    if p['notas']:h+=f'<div class="note">{p["notas"]}</div>'
    if p.get('foto') or p.get('partidas'):
        h+='<div class="cols" style="margin-top:3mm"><div>'+(('<h3>Foto antes de tapar</h3><div style="font-size:9.2pt">'+esc(p['foto'])+'</div>') if p.get('foto') else '')+'</div><div>'+((f'<h3>En tu presupuesto ({len(p["partidas"])} partidas)</h3><div class="chips">'+''.join('<span>'+esc(x.capitalize())+'</span>' for x in p['partidas'][:14])+('<span>…</span>' if len(p['partidas'])>14 else '')+'</div>') if p.get('partidas') else '')+'</div></div>'
    h+=f'</div><div class="ft"><span>Guía de buena práctica. Prevalecen el proyecto, el CTE, el REBT y la ficha del fabricante.</span><span><b>{i}</b></span></div></section>'
    return h

def pageB(p,i):
    h=f'<section class="pg"><div class="hd"><span>Atlas técnico de obra</span><span><i>{esc(p["parte"])}</i></span></div><div class="in">'
    h+=f'<div class="ttl"><div class="num">{p["cap"]}</div><h1>{esc(p["titulo"])}</h1><div class="sub">Datos, comprobaciones y partidas del presupuesto.</div></div>'
    if p.get('extra'):h+=f'<div style="margin-top:1mm">{p["extra"]}</div>'
    left=('<h3 style="color:#D32F2F">Errores frecuentes</h3>'+ul(p['errores'],'err')) if p.get('errores') else ''
    right=('<h3 style="color:#1B8F50">Cómo va</h3>'+ul(p['si'],'ok')) if p.get('si') else ''
    h+=f'<div class="cols" style="margin-top:4mm"><div>{left}</div><div>{right}</div></div>'
    if p.get('notas'):h+=f'<div class="note">{p["notas"]}</div>'
    if p.get('foto') or p.get('partidas'):
        h+='<div class="cols" style="margin-top:4mm"><div>'+(('<h3>Foto antes de tapar</h3><div style="font-size:9.6pt">'+esc(p['foto'])+'</div>') if p.get('foto') else '')+'</div><div>'+((f'<h3>En tu presupuesto ({len(p["partidas"])} partidas)</h3><div class="chips">'+''.join('<span>'+esc(x.capitalize())+'</span>' for x in p['partidas'][:20])+'</div>') if p.get('partidas') else '')+'</div></div>'
    h+=f'</div><div class="ft"><span>Guía de buena práctica.</span><span><b>{i}</b></span></div></section>'
    return h
import os
SPLIT=set(json.load(open('overflow.json',encoding='utf-8'))) if os.path.exists('overflow.json') else set()
def build():
    cnt={}
    PAGES.sort(key=lambda p:int(p['parte'].split(' ·')[0]))
    for p in PAGES:
        k=p['parte'].split(' ·')[0];cnt[k]=cnt.get(k,0)+1;p['cap']=k+'.'+str(cnt[k])
    total=len(PAGES)+4
    h=HTML_HEAD
    # portada
    h+='<section class="pg cover"><div class="big"><div class="kick">Motiva Construcción · Atlas técnico de obra</div><h1>Detalles<br>constructivos <em>en 3D</em></h1><p>Cómo se hace un tabique de pladur y una instalación eléctrica de vivienda, pieza a pieza, con modelos tridimensionales y numerados.</p></div>'
    h+=f'<div class="imgs"><img src="{FIG}p22m.jpg"></div></section>'
    # indice
    h+='<section class="pg"><div class="hd"><span>Atlas técnico de obra</span><span><i>Índice</i></span></div><div class="toc"><h1>Contenido</h1>'
    n=3;cur=None;items=[]
    h+='<div style="column-count:3;column-gap:6mm">'
    for p in PAGES:
        split=p['titulo'] in SPLIT and p.get('pasos')
        if p['parte']!=cur:h+=f'<h2 style="break-after:avoid">{esc(p["parte"])}</h2>';cur=p['parte']
        h+=f'<div class="r" style="break-inside:avoid"><b>{p["cap"]}</b><span>{esc(p["titulo"])}</span><span style="text-align:right">{n}</span></div>'
        items.append((p,'A' if split else 'F',n));n+=1
        if split:items.append((p,'B',n));n+=1
    h+='</div>'
    h+=f'<h2 style="margin-top:6mm">Anexos</h2><div class="r"><b>A.1</b><span>Listas de comprobación</span><span style="text-align:right">{n}</span></div><div class="r"><b>A.2</b><span>Normativa de referencia</span><span style="text-align:right">{n+1}</span></div>'
    h+='</div></section>'
    for (p,mode,pg) in items:h+=pagehtml(p,pg,total,mode)
    pass
    # listas
    k=n
    h+=f'<section class="pg"><div class="hd"><span>Atlas técnico de obra</span><span><i>Anexos</i></span></div><div class="in"><div class="ttl"><div class="num">A.1</div><h1>Listas de comprobación</h1><div class="sub">Para repasar antes de cerrar y antes de entregar.</div></div>'
    h+='<div class="sec">Tabique de pladur</div><ul class="chk">'+''.join(f'<li>{esc(x)}</li>' for x in LISTAS['tab'])+'</ul>'
    h+='<div class="sec">Instalación eléctrica</div><ul class="chk">'+''.join(f'<li>{esc(x)}</li>' for x in LISTAS['ele'])+'</ul>'
    h+='<div class="sec">Fontanería y saneamiento</div><ul class="chk">'+''.join(f'<li>{esc(x)}</li>' for x in LISTAS['font'])+'</ul>'
    h+='<div class="sec">Climatización</div><ul class="chk">'+''.join(f'<li>{esc(x)}</li>' for x in LISTAS['clima'])+'</ul>'
    h+=f'</div><div class="ft"><span>Guía de buena práctica.</span><span><b>{k}</b></span></div></section>'
    h+=f'<section class="pg"><div class="hd"><span>Atlas técnico de obra</span><span><i>Anexos</i></span></div><div class="in"><div class="ttl"><div class="num">A.2</div><h1>Normativa de referencia</h1><div class="sub">Dónde está lo que aquí se resume.</div></div>'
    h+=table(['Tema','Documento'],[['Suministro y evacuación de agua','CTE DB-HS4 y DB-HS5; prevención de legionelosis: RD 487/2022'],['Instalaciones térmicas (climatización)','RITE y normativa de gases fluorados'],['Aislamiento acústico','CTE DB-HR (Protección frente al ruido)'],['Resistencia al fuego','CTE DB-SI (Seguridad en caso de incendio)'],['Accesibilidad de mecanismos','CTE DB-SUA'],['Instalación eléctrica en baja tensión','REBT (Real Decreto 842/2002) e instrucciones técnicas ITC-BT-19, 20, 21, 25 y 27'],['Montaje de sistemas de placa de yeso laminado','Normas UNE de placas de yeso laminado y ficha técnica del sistema de cada fabricante'],['Ensayos y tablas de alturas','Documentación del fabricante del sistema (perfiles, placas, lana y tornillos)']],'t')
    h+='<div class="note"><b>Cómo usar este librito.</b> Es una guía de buena práctica en obra. Las cifras (separaciones, espesores, secciones, alturas) son valores habituales de referencia. Para proyectar o certificar manda siempre el proyecto, la normativa vigente y la ficha técnica del sistema elegido.</div>'
    h+='<div class="sec" style="margin-top:6mm">Capítulos cuyo detalle se puede ampliar</div><div class="cols"><div>'+ul(['Más detalle de solados y alicatados','Carpintería: más tipos de hueco','Cimentación: ejecución por fases'],'k')+'</div><div>'+ul(['Falsos techos registrables','Impermeabilización y cubiertas','Protección contra incendios: más detalle'],'k')+'</div></div>'
    h+=f'</div><div class="ft"><span>Guía de buena práctica.</span><span><b>{k+1}</b></span></div></section></body></html>'
    return h
open('libro.html','w',encoding='utf-8').write(build())
print(len(PAGES)+4,'páginas')
