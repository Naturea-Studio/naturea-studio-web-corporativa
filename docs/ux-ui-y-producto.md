# UX, interfaz y producto

## Revisión experta

Se recorrió en navegador la portada y la ficha a 390 px y en escritorio. Antes del cambio, la portada ofrecía colecciones y mobiliario con peso equivalente. La ficha de bandeja mostraba un carrito simulado junto a un mensaje de indisponibilidad y dejaba dimensiones y acabado como texto pendiente. En móvil, las acciones antecedían a la primera imagen de la ficha. El recorrido comunicaba bien el tono visual y dejaba sin resolver el encaje de una pieza concreta.

## Decisiones e implementación

- Prioridad B2C en España. La portada abre con un objeto y su uso cotidiano. La escena de scroll transita del contorno de la bandeja a una referencia de veta, con las dos imágenes en paralelo en móvil y con movimiento reducido. La portada utiliza un render editorial generado con ImageGen, identificado como conceptual.
- En la ficha de bandeja, comparar huella y referencias de acabado sustituye el carrito de simulación como acción primaria. El visitante introduce las cuatro medidas. El dibujo y el mensaje se actualizan al girar 90°. Los materiales son referencias y no prometen el aspecto de la pieza final. La descarga es local.
- Mantener colecciones y mobiliario a medida como recorridos secundarios con identidad propia.

| Entrada                | Decisión del visitante                                          | Acción                                       |
| ---------------------- | --------------------------------------------------------------- | -------------------------------------------- |
| Portada                | Entender qué es y para qué sirve                                | Explorar la bandeja                          |
| Ficha de bandeja       | Evaluar el espacio y la referencia visual                       | Probar en mi espacio y descargar comparación |
| Colecciones y catálogo | Comparar lenguajes de diseño                                    | Abrir una ficha                              |
| Materiales             | Reconocer la veta y las opciones en estudio                     | Consultar referencias                        |
| A medida               | Explorar proporciones de una mesa                               | Abrir el configurador                        |
| Profesionales          | Preparar una propuesta                                          | Abrir mesa de trabajo                        |
| Cuenta y reservas      | Acceder a servicios cuando el entorno de pruebas esté conectado | Iniciar sesión o consultar reservas          |

La inspección y las pruebas de navegador comprueban implementación. Sigue pendiente observar a usuarios reales con tareas sin pistas: identificar el uso, introducir medidas, explicar qué cambio revela el scroll y distinguir precio de estudio de disponibilidad real. Objetivo: 5 de 8 completan el recorrido de comparación sin ayuda y 8 de 8 entienden que la ficha presenta un concepto.
