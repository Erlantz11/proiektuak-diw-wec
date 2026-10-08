# Currículum de Nobita Nobi

CV en HTML y CSS del personaje Nobita Nobi, construido con `box-sizing: border-box`, variables CSS, unidades `rem`, `calc()`, `min()`, imagen de fondo, gradiente, tarjetas moldeables, Grid, Flexbox y diseño responsive.

## Archivos

- `index.html` — estructura del CV.
- `nobita.css` — todos los estilos.
- `nobita.jpg` — foto de perfil (debe estar en la misma carpeta que `index.html`).
- `escuela.jpg` — foto de fondo de la cabecera (debe estar en la misma carpeta que `index.html`).

## Estructura del CV

Inspirado en la maquetación del CV de Son Goku (foto y barra lateral a toda altura, cabecera de color sólido dentro de la columna de contenido, y una "hoja" de ancho fijo centrada sobre un fondo neutro), el documento se divide en:

1. **`.page-outer`** — fondo neutro que ocupa toda la ventana y centra la hoja, simulando el visor de un PDF.
2. **`.sheet`** — la "hoja" del CV en sí: ancho fijo (`min(60rem, 96vw)`), esquinas redondeadas y sombra, para que se vea como una página y no como una web que ocupa todo el ancho del navegador.
3. **`.sidebar`** — foto, datos personales, habilidades (con barras de progreso), objetos clave, idiomas y una cita. Ocupa toda la altura de la hoja (no solo la de su propio contenido), igual que en el CV de Goku.
4. **`.main-content`** — cabecera de color sólido (`.cv-header`) que integra, en un mismo bloque oscuro, el nombre (`.header-top`) y el perfil profesional (`.header-profile`, en dos columnas en escritorio) — igual que en el CV de Goku, donde el perfil está pegado a la cabecera y no es una caja aparte. Debajo, sobre fondo blanco: experiencia (con listas de viñetas, no párrafos), formación en tarjetas numeradas 01-04, y un bloque de dos columnas con los logros destacados (lista) junto a las manías y trucos (etiquetas) — replicando el "Logros destacados / Técnicas y transformaciones" de Goku. Cierra con el registro de hazañas en tabla.

La hoja usa **Flexbox** como layout general (`.sheet`): en móvil apila la barra lateral y el contenido en una columna; a partir del media query, los coloca en fila, con la barra lateral de ancho fijo y el contenido ocupando el resto. Dentro de las secciones se usa **Grid** con `gap` para las tarjetas de formación (`.training-grid`) y para el bloque de logros/manías (`.split-block`), y **Flexbox** para alinear etiquetas, cabeceras de tarjeta, los datos personales y las dos columnas del perfil profesional. El registro de hazañas se muestra en una tabla HTML semántica, envuelta en `.table-wrapper` con `overflow-x: auto` para que siga siendo legible en móvil sin necesitar otro media query.

## Datos simplificados

Se ha quitado el correo y el teléfono ficticios de la cabecera (poco realistas para un estudiante de primaria) y se han sustituido por etiquetas cortas, reutilizando la misma clase `.tag` que ya se usaba en la barra lateral, en vez de crear una clase nueva.

## Animaciones

La página se presenta con una pequeña entrada en cascada al cargar, más viva que antes pero sin dejar de ser sobria (nada de rebotes ni parpadeos):

- La barra lateral y el contenido principal aparecen sección a sección, con un ligero desvanecimiento y desplazamiento hacia arriba (`@keyframes fade-in-up`), cada bloque con un pequeño retraso respecto al anterior.
- Las barras de habilidades "crecen" desde 0 hasta su valor final al cargar (`@keyframes grow-bar`).
- Las tarjetas se elevan ligeramente al pasar el ratón por encima.
- Las etiquetas y las filas de la tabla de registro cambian de color al pasar el ratón.

Todo con `transition` o animaciones cortas (0.2 a 0.6 segundos) y sin JavaScript.

## Clases reutilizadas

- `.widget` — mismas tarjetas para datos personales, habilidades, objetos clave e idiomas en la barra lateral.
- `.card` — misma tarjeta base para los tres puestos de experiencia.
- `.tag` — mismo estilo de etiqueta para objetos clave, idiomas, manías y trucos, y las etiquetas de la cabecera (con la variante `.tag-light` para verse bien sobre fondo oscuro).

## Técnicas CSS aplicadas

- Variables en `:root` para colores, radios de borde, tamaños de fuente (`rem`) y espaciados, evitando repetir valores.
- `calc()` para el padding vertical de la cabecera oscura (`calc(var(--space-lg) + 0.5rem)`).
- `min()` para limitar el ancho de la hoja (`min(60rem, 96vw)`) y el tamaño del nombre en la cabecera (`min(2.5rem, 8vw)`).
- Imagen de fondo real (`escuela.jpg`, muy atenuada) combinada con un patrón de puntos (`radial-gradient`), un anillo decorativo y un gradiente lineal claramente visible entre el dorado principal y el marrón oscuro (`linear-gradient(135deg, var(--color-primary) 0%, var(--color-header-bg) 62%)`) en la cabecera, imitando el cielo degradado y el emblema circular de la cabecera de Goku.
- Paleta minimalista: blanco como base, un acento dorado apagado y un tono oscuro solo en la cabecera y el pie, imitando el bloque de color sólido del CV de Goku.
- Ningún uso de `!important`.

## Enfoque responsive: mobile first

Se ha elegido **mobile first**: los estilos base (sin media query) definen una única columna, pensada para pantallas pequeñas, y a partir de ahí se añade complejidad progresivamente. Se ha elegido este enfoque porque:

- Un CV se consulta a menudo desde el móvil (por ejemplo, al compartir el enlace), así que priorizar esa experiencia como base tiene sentido.
- Partir de una sola columna obliga a simplificar el contenido y el orden de lectura antes de añadir la disposición más compleja de dos columnas, en lugar de ir "recortando" un diseño de escritorio ya complejo.
- Es más sencillo ir añadiendo reglas con `min-width` para pantallas más grandes que sobrescribir un diseño de escritorio completo con `max-width` en pantallas pequeñas.

## Media query

Se utiliza un único breakpoint:

```css
@media (min-width: 48rem) { ... }
```

48rem equivale a 768px, un punto de corte habitual que separa los móviles (incluidos en horizontal) de tablets/portátiles pequeños. A partir de ahí:

- `.sheet` pasa de columna a fila: la barra lateral (`.sidebar`) toma un ancho fijo (`--sidebar-width`) y el contenido (`.main-content`) ocupa el resto, con la barra lateral estirándose automáticamente a toda la altura de la hoja gracias a `align-items: stretch`.
- `.training-grid` pasa de 1 a 4 columnas y `.split-block` (logros + manías) de 1 a 2, ambas manteniendo el `gap`.
- `.header-profile` pasa de columna a fila, para que la etiqueta/título del perfil y el párrafo queden lado a lado, como en la cabecera de Goku.

Por debajo de ese ancho, la barra lateral se apila encima del contenido y las cuadrículas pasan a una sola columna, para que sea legible sin necesidad de hacer zoom ni desplazarse horizontalmente.