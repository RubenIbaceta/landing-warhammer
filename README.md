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

## Contenido y referencias

Las fotografías aportadas están incluidas en `public/images`. La vista gris del comparador se recrea con un filtro CSS; no es una fotografía de la pieza antes de pintar. Los tres niveles utilizan la misma miniatura como referencia visual, con variaciones de tratamiento de imagen; no representan tres encargos fotografiados por separado. La página no se presenta como una demo. No incluye testimonios ni cifras ficticias.

El enlace de Instagram muestra un aviso de perfil próximamente disponible; sustituirlo por la URL real cuando exista. Santiago, Chile, se usa como ubicación general editable.

Fuentes proporcionadas:

- https://wallpapers-clan.com/wp-content/uploads/2025/02/warhammer-40k-knight-with-sword-desktop-wallpaper-preview.jpg
- https://warcomprod2024productionstorage.s3.eu-west-2.amazonaws.com/40k_wallpaper_desktop-e8rjnqog41.jpg
- https://redoctobergames.com/wp-content/uploads/2026/07/sundaypreview-jul19-thh_02-mkivassault-ayhdcmjcui-400x400.jpg
- https://i.pinimg.com/originals/a0/29/4b/a0294bf6be6fee036d7e80b600d7c738.jpg
- https://www.artwstudio.com/wp-content/uploads/2023/01/pintado-miniaturas-nivel-1.jpg
- https://fanhammer.org/wp-content/uploads/2023/11/396705208_748856553921628_8037203690548680718_n-466x600.jpg
- https://www.warhammer.com/ur4mtvpiojcu/6fXlLW8VB2GYJ4QBI3thsi/c1f0dfcf20672e3b9242c788e566137d/LP40K-TOUT-280326-CombatPatrols.jpg?fm=webp&w=800

Warhammer 40,000 y sus marcas pertenecen a Games Workshop. Las imágenes pertenecen a sus respectivos autores.
