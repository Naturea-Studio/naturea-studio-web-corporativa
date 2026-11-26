# De demo a tienda

## Orden de apertura

1. **Infraestructura.** Crear un proyecto de Supabase de pruebas, aplicar migraciones y verificar las políticas con usuarios independientes. Configurar correo de autenticación, copias de seguridad y monitorización. Este repositorio usa únicamente la clave pública en el navegador.
2. **Cuentas.** Validar altas, confirmación y recuperación con el proveedor de correo. Definir gestión, exportación y borrado de datos, y separar permisos de clientes, profesionales y operadores.
3. **Inventario y reservas.** Crear fichas de piezas físicas con SKU, fotografía, medidas, precio y estado aprobados. Probar reservas concurrentes, caducidad y cancelación antes de activar el acceso público.
4. **Pedidos y pagos.** Sustituir el carrito simulado por un pedido persistente. Calcular importes y transporte en el servidor. Integrar proveedor en modo prueba y validar webhooks firmados, idempotencia, reintentos y reembolsos. El carrito actual sigue siendo una simulación sin pasarela.
5. **Operación.** Validar fiscalidad, facturación, condiciones de venta, privacidad, envíos, devoluciones, seguridad e instrucciones de producto con los responsables correspondientes. Preparar soporte, conciliación, gestión de incidencias y despliegue de producción.

## Desarrollo local

Con Docker y Supabase CLI disponibles, ejecutar `supabase start` y `supabase db reset` sobre la base **local desechable**. Copiar la URL de API y la clave pública de `supabase status` a `.env.local`. Arrancar con `npm run dev`. Para un entorno alojado, revisar la configuración y aplicar las migraciones al proyecto de pruebas elegido.

La aplicación mantiene la demo si faltan las variables de Supabase. Mantener los productos conceptuales separados del inventario comercial y no crear stock de muestra en producción.
