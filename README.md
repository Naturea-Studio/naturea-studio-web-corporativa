# Naturea Studio

Prototipo de un estudio de mobiliario y decoración de madera natural. La home está completa y el catálogo inicial reúne conceptos con precios orientativos.

## Desarrollo local

Requiere Node.js 22 y npm.

```sh
npm ci
npm run dev
npm run lint
npm run typecheck
npm run build
npm run preview
```

`npm run format` aplica Prettier. El workflow de GitHub Actions ejecuta lint, typecheck y build.

## Entornos

Copia `.env.example` a `.env.local` para ajustar la URL canónica. La indexación requiere activación explícita en un build de producción. Vercel aplica además `X-Robots-Tag: noindex, follow` de forma global en la configuración de prueba. El fallback de Vercel permite abrir rutas de Vue Router directamente.

`npm run build` genera `dist/`. El despliegue de prueba usa Vercel con configuración versionada. La configuración comercial del dominio se reservará para una fase posterior.

## Documentación

- [Proyecto](docs/PROJECT.md), [negocio](docs/BUSINESS.md), [mercado](docs/MARKET.md) y [marca](docs/BRAND.md).
- [Arquitectura](docs/ARCHITECTURE.md), [sistema de diseño](docs/DESIGN-SYSTEM.md) y [decisiones](docs/DECISIONS.md).
- [Catálogo](docs/CATALOG.md), [colecciones](docs/COLLECTIONS.md) y [materiales](docs/MATERIALS.md).
- [Configurador y proyectos](docs/CONFIGURATOR.md), [piezas únicas](docs/UNIQUE-PIECES.md) y [profesionales](docs/PROFESSIONAL.md).
- [Roadmap](docs/ROADMAP.md).
