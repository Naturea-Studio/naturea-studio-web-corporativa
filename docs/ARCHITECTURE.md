# Arquitectura

Vue 3 con Composition API, Vite, Vue Router en modo historial y Pinia para favoritos. `src/views` contiene portada y vistas secundarias. `src/components` contiene UI compartida. `src/data.ts` agrupa datos conceptuales y recursos. `src/editorial.ts` describe rutas informativas. `src/types.ts` define contratos de dominio.

Al conectar el backend, utiliza una capa de consulta tipada que devuelva estos modelos y mantenga el cálculo de disponibilidad, IVA, logística y reservas en servidor. El carrito modela productos, variantes y configuraciones por separado. Los precios se guardan en céntimos y se formatean con Intl para es-ES.

La portada carga en la entrada y las vistas secundarias en un chunk diferido. El router gestiona título, canonical, robots y Open Graph. Cualquier indexación comercial requiere ampliar el sitemap y valorar prerender para metadatos por URL y respuestas 404 HTTP reales.
