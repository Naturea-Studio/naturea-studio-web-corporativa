# SEO y captación

Las consultas son hipótesis de intención. Se desconoce su volumen y coste por clic. La demo permanece con `noindex, follow` en Vercel y las fichas conceptuales quedan fuera del sitemap. El sitemap de portada queda como base del lanzamiento y no se anuncia en el robots de la demo. La ficha de producto añade migas estructuradas y evita declarar oferta, stock, reseñas o prestaciones sin verificar.

| Intención           | Consultas iniciales                                                           | Entrada y acción                                               |
| ------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Compra exploratoria | bandeja de nogal decorativa, bandeja de madera para llaves, bandeja recibidor | Ficha de bandeja. Comparar la huella y los acabados.           |
| Inspiración         | objetos de madera para recibidor, decoración en nogal                         | Portada y decoración. Explorar la bandeja.                     |
| Información         | acabado mate madera, nogal aceite natural                                     | Materiales y referencias de la ficha. Comparar veta y proceso. |
| Encargo             | mesa de madera a medida, mesa nogal a medida                                  | Página a medida. Configurar y preparar borrador.               |

Portada, decoración, ficha, materiales, colecciones y a medida tienen títulos o descripciones específicos. La portada incluye etiquetas Open Graph en el HTML. En las rutas internas, Vue llena metadatos tras renderizar. Para difusión real, prerenderizar las entradas prioritarias para los robots sociales, ampliar sitemap con URLs verificadas y comprobar Search Console tras retirar el noindex del entorno comercial.

## Experimentos preparados

1. **Prueba moderada.** Mensaje «Un lugar para las llaves al llegar». Mostrar la ficha y la herramienta a 8 personas. Aproximadamente 3 horas, 0 € de canal. Medir 5 comparaciones completas y 3 solicitudes voluntarias de seguimiento tras ver 35 €. La descarga local puede apoyar la observación. La aceptación se registra manualmente con permiso.
2. **Publicación orgánica.** Comparar el render de uso en recibidor con un detalle de veta en dos publicaciones. Aproximadamente 2 horas, 0 € de pauta. Alternar orden y usar enlaces con `utm_source=instagram&utm_medium=organic&utm_campaign=piloto_bandeja&utm_content=recibidor` y `utm_content=veta`. Métrica inicial: 10 clics cualificados y 3 comparaciones observadas o comunicadas. Activar medición agregada solo tras validar la recogida de datos.
3. **Entrevistas a interioristas.** Presentar el estudio a 3 profesionales, aproximadamente 2 horas y 0 € en canal. Éxito si 2 proponen un uso concreto y piden revisar muestra o ficha para un proyecto. La mesa de trabajo ya permite crear y descargar una ficha local.

La web permite probar la navegación con UTM y la descarga. Los UTM no se registran todavía. El checkbox voluntario del estudio se incluye en la descarga local y no envía datos. No hay campañas activas ni envíos automáticos.
