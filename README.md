# hamani – Frontend (React + Vite + Tailwind)

## Tabla de Contenidos
- [Introducción y caso de estudio](#introducción-y-caso-de-estudio)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Estructura del proyecto (árbol)](#estructura-del-proyecto-árbol)
- [Requisitos previos](#requisitos-previos)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Dependencias principales](#dependencias-principales)
- [Descripción de las vistas](#descripción-de-las-vistas)
- [Integración con el backend](#integración-con-el-backend)
- [Contacto](#contacto)

---

## Introducción y caso de estudio

El frontend de **hamani** implementa la interfaz web para un restaurante inspirado en la cultura japonesa, alineado con el caso de estudio del backend.  
Su objetivo es ofrecer una experiencia visual coherente con la identidad del restaurante, permitiendo a los usuarios:

- Explorar el menú por categorías.
- Ver el detalle de cada plato e ingredientes.
- Gestionar reservas de manera sencilla.
- Autenticarse y acceder a un dashboard personalizado.
- Administrar el menú (vista admin) con creación, edición y eliminación de platos.

Este frontend consume la API REST expuesta por el backend de hamani y refleja en tiempo real operaciones como creación de usuarios, autenticación, consultas de disponibilidad y gestión de platos.

---

## Tecnologías utilizadas

- **Vite** – Dev server y bundler para React, con recarga rápida y soporte para TypeScript. [web:219][web:368]
- **React 19** – Biblioteca principal para construir la interfaz de usuario basada en componentes. [web:270]
- **React Router DOM 7** – Manejo de rutas de la SPA (login, signup, menú, panel admin, etc.). [web:217][web:281]
- **TypeScript** – Tipado estático para mejorar mantenibilidad y robustez del código. [web:203]
- **Tailwind CSS** – Framework CSS de utilidades para construir la UI respondiendo al diseño de Figma. [web:213][web:374]
- **jwt-decode** – Decodificación de JWT en el cliente para obtener `id` y `role` del usuario autenticado. [web:206][web:215]

---

## Estructura del proyecto (árbol)

Vista simplificada de la estructura principal del frontend:

hamani-frontend/
├─ index.html
├─ package.json
├─ vite.config.ts
├─ postcss.config.js
├─ tailwind.config.js
├─ eslint.config.js
├─ tsconfig.json
└─ src/
├─ main.tsx # Punto de entrada de React (createRoot + StrictMode).
├─ App.tsx # Definición de rutas con React Router.
├─ index.css # Importa @tailwind base, components, utilities.
├─ assets/
│ ├─ logo.svg
│ ├─ comida.svg
│ ├─ fondo2.svg
│ ├─ totoro.svg
│ ├─ whatsapp.svg
│ ├─ instagram.svg
│ └─ facebook.svg
└─ pages/
├─ Login.tsx # Formulario de inicio de sesión (cliente/admin).
├─ Signup.tsx # Registro de usuario y redirección a /dashboard.
├─ main.tsx # Landing y dashboard del cliente + flujo de reservas.
├─ menu.tsx # Menú público: categorías, platos, modal de detalle.
├─ adminMain.tsx # Landing para administrador.
├─ adminMenu.tsx # Panel admin del menú (listar, ver, editar, eliminar).
├─ addDishPage.tsx # Formulario para crear nuevos platos.
└─ editDishes.tsx # Formulario para editar platos existentes.



---

## Requisitos previos

- Node.js (v18+ recomendado).
- NPM o Yarn.
- Backend de hamani corriendo en `http://localhost:3000` o la URL configurada en `API` dentro de los componentes.
- Navegador moderno (Chrome, Firefox, Edge, etc.).

---

## Instalación y ejecución

1. **Clonar el repositorio del frontend**

https://github.com/Sarasofia1214/hamani_FrontEnd


2. **Instalar dependencias**

npm install


3. **Levantar el servidor de desarrollo**
npm run dev


Por defecto, Vite levantará la app en `http://localhost:5173` (o el puerto que indique la consola).

4. **Build de producción**

npm run build
npm run preview



---

## Dependencias principales

Scripts definidos en `package.json`:

- `dev`: arranca el servidor de desarrollo de Vite.
- `build`: compila TypeScript (`tsc -b`) y genera el build optimizado (`vite build`). [web:200][web:219]
- `preview`: sirve el build de producción de forma local.
- `lint`: ejecuta ESLint con la configuración plana (`eslint.config.js`). [web:165]

Dependencias de runtime:

- `react`, `react-dom`: núcleo de React para el navegador.
- `react-router-dom`: enrutado (rutas públicas, dashboard, admin). [web:217]
- `jwt-decode`: decodificar el token JWT en el navegador para adaptar la UI al usuario. [web:206]

Dependencias de desarrollo:

- `vite`, `@vitejs/plugin-react`, `vite-plugin-svgr`: configuración de bundling, dev server y SVG como componentes.
- `tailwindcss`, `postcss`, `autoprefixer`: sistema de estilos basado en utilidades. [web:180][web:189]
- `typescript`, `@types/react`, `@types/react-dom`, `@types/node`: tipado estático.
- `eslint`, `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `globals`: reglas de linting para JS/TS/React. [web:203]

---

## Descripción de las vistas

- **`/` – Login**  
Formulario de autenticación que envía credenciales al backend (`/auth/login`) y guarda el token en `localStorage` si el login es exitoso. Según el rol del usuario, se redirige al dashboard correspondiente.

- **`/signup` – Registro de usuario**  
Pantalla de registro que envía `name`, `email` y `password` a `/auth/signup`. Tras registro exitoso, almacena el token y redirige al dashboard del cliente.

- **`/dashboard` – Dashboard del cliente (main.tsx)**  
Landing del restaurante para el usuario final, con secciones “Inicio”, “Nosotros” y “Reservación”.  
Incluye un flujo de reservas que:
- Combina fecha, hora y número de personas.
- Consulta disponibilidad con `/reservations/availability`.
- Envía la reserva a `/reservations` asociando el `user_id` leído del JWT.

- **`/menu` – Menú público (menu.tsx)**  
Muestra categorías y platos desde `/categories` y `/dishes`, solo los disponibles.  
Incluye buscador por texto y modal de detalle con ingredientes (`/ingredients/dish/:id`) y precio.

- **`/adminDashboard` – Landing admin (adminMain.tsx)**  
Versión institucional para administradores, con navegación hacia `/adminMenu`.

- **`/adminMenu` – Gestión de menú (adminMenu.tsx)**  
Vista de administración del menú:
- Listar platos agrupados por categoría.
- Buscar por texto.
- Ver detalle, ingredientes y precio en un modal.
- Navegar a edición (`/admin/edit-dish/:id`) o eliminar platos (`DELETE /dishes/:id`).

- **`/admin/add-dish` – Crear plato (addDishPage.tsx)**  
Formulario para que el admin cree nuevos platos:
- Carga categorías desde `/categories`.
- Envía `POST /dishes` con nombre, descripción, precio, URL de imagen y categoría.

- **`/admin/edit-dish/:id` – Editar plato (editDishes.tsx)**  
Formulario de edición:
- Obtiene el `id` de la URL vía `useParams`.
- Carga datos del plato y categorías en paralelo.
- Envía `PUT /dishes/:id` con los cambios.

---

## Integración con el backend

El frontend asume que el backend de hamani está disponible en:
const API = "http://localhost:3000";




Principales puntos de integración:

- **Autenticación**  
  - `POST /auth/signup`  
  - `POST /auth/login`  
  El token JWT devuelto se guarda en `localStorage` para usarlo en futuras solicitudes y decodificar datos como `id` y `role`.

- **Reservas**  
  - `GET /reservations/availability` – comprobar disponibilidad según `datetime` y `people`.  
  - `POST /reservations` – crear nueva reserva asociada al usuario autenticado.

- **Menú**  
  - `GET /categories` – cargar categorías.  
  - `GET /dishes` – cargar platos.  
  - `GET /dishes/:id`, `PUT /dishes/:id`, `DELETE /dishes/:id` – detalles, actualización y eliminación (panel admin).  
  - `GET /ingredients/dish/:id` – obtener ingredientes específicos de cada plato.

Cualquier cambio en la URL base o en los endpoints debe sincronizarse entre frontend y backend para mantener la funcionalidad.

---

## Contacto

Si tienes preguntas, sugerencias o encuentras algún problema con la implementación del frontend de **hamani**, puedes contactarme a través de:

- GitHub: [Sarasofia1214](https://github.com/Sarasofia1214)
