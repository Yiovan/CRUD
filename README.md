# CRUD, Create, Read, Update, Delete
    
## Descripción
Una aplicación web construida bajo la arquitectura MVC utilizando Node.js, Express y EJS como motor de plantillas. La plataforma permite a los usuarios explorar, gestionar y votar por temas de aprendizaje y sus enlaces asociados. El contenido se reordena de forma dinámica basándose en la cantidad de votos para asegurar que los materiales más útiles mantengan una alta visibilidad.

## Características
- **Gestión de Temas (CRUD):** Crear, leer, actualizar y eliminar temas educativos.
- **Gestión de Enlaces:** Agregar y remover enlaces de referencia dentro de cualquier tema.
- **Sistema de Votación:** Los usuarios pueden votar a favor de temas y enlaces individuales. La interfaz ordena dinámicamente los elementos de forma descendente considerando la cantidad de votos.
- **Interacciones Asíncronas:** Las votaciones emplean JavaScript nativo (Vanilla JS) para procesar las peticiones y actualizar la interfaz sin necesidad de recargar la página entera.
- **Persistencia Local:** Los datos se almacenan y consumen desde un archivo JSON local (`database.json`), funcionando como un mecanismo persistente ligero.

## Tecnologías Utilizadas
- Backend: Node.js, Express.js
- Motor de Plantillas: EJS
- Frontend: HTML5, CSS3 (Nativo), JavaScript (Nativo)
- Arquitectura: Patrón Modelo-Vista-Controlador (MVC)

## Prerrequisitos
- Node.js instalado en su entorno.
- NPM (Node Package Manager).

## Instalación

1. Clonar el repositorio:
   git clone https://github.com/Yiovan/CRUD.git

2. Navegar al directorio del proyecto:
   cd 8vo_challenge

3. Instalar las dependencias requeridas:
   npm install

## Uso

1. Iniciar el servidor (modo desarrollo local):
   npm run dev

   O en modo de producción:
   npm start

2. Acceder a la aplicación:
   Abrir un navegador web y dirigirse a: http://localhost:3000

## Estructura y Arquitectura
La aplicación se apega estrictamente al patrón de diseño MVC:

- **Modelo (`/models`):** Centraliza la lógica de datos e interactúa directamente con `database.json`. Gestiona los cálculos de ordenamiento y conteos de votos.
- **Vista (`/views`):** Plantillas EJS responsables de renderizar el HTML que recibe el cliente. Mantienen una estructura limpia enfocada netamente en presentación.
- **Controlador (`/controllers`):** Procesa las peticiones HTTP entrantes, interactúa con el Modelo para mutar o recuperar información y delega la renderización a la Vista.
