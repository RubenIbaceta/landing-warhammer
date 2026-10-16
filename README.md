# Forja Oscura

Landing de pintura de miniaturas creada con React, Vite y Lucide. Diseño adaptable a móvil y escritorio, sin servicios externos para los formularios.

## Ejecutar

Desde esta carpeta:

```sh
npm install
npm run dev
```

Para generar la versión de producción:

```sh
npm run build
npm run preview
```

## GitHub y Vercel

Repositorio: https://github.com/RubenIbaceta/landing-warhammer

Para trabajar desde una copia nueva:

```sh
git clone https://github.com/RubenIbaceta/landing-warhammer.git
cd landing-warhammer
npm ci
npm run dev
```

En Vercel, importar el repositorio `RubenIbaceta/landing-warhammer` con estos ajustes:

- Framework: Vite.
- Root Directory: raíz del repositorio (`./`). El contenido de esta carpeta se sube directamente a la raíz del repositorio.
- Install Command: `npm ci`.
- Build Command: `npm run build`.
- Output Directory: `dist`.
- No requiere variables de entorno.

`vercel.json` incluye los ajustes de compilación. Al conectar GitHub con Vercel, los cambios enviados a `main` publican una nueva versión de producción.

## Funcionalidades

- Navegación por secciones y menú móvil.
- Servicios con selección del tipo de miniatura.
- Tres niveles con selección automática en el formulario.
- Galería filtrable y ampliación con navegación por flechas, cierre con Escape y control del foco.
- Comparador deslizante compatible con ratón, tacto y teclado.
- Preguntas frecuentes desplegables.
- Formulario validado con hasta cinco fotografías JPG, PNG o WEBP de 5 MB cada una, selección y arrastre de archivos.
- Exportación de la solicitud a JSON con fotografías integradas. No envía correos ni información a un servidor. Para recibir solicitudes reales, conectar un servicio de correo o un backend.
- Respeto de la preferencia de movimiento reducido.

