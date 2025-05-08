# Tareas - Sistema de Gestión de Tareas

Este repositorio contiene un sistema de gestión de tareas compuesto por un backend desarrollado en Laravel y un frontend construido con Vue 3 y Vite. El objetivo del proyecto es permitir a los usuarios gestionar sus tareas de manera eficiente, con funcionalidades como creación, edición, eliminación y visualización de tareas.

## Estructura del Proyecto

```
tareas-backend/   # Backend del proyecto (Laravel)
tareas-frontend/  # Frontend del proyecto (Vue 3 + Vite)
```

### Backend - Laravel

El backend está desarrollado con Laravel, un framework PHP robusto y escalable. Proporciona una API para gestionar las tareas y manejar la autenticación de usuarios.

### Frontend - Vue 3

El frontend está construido con Vue 3 y Vite, ofreciendo una interfaz de usuario moderna y reactiva para interactuar con el sistema.

---

## Requisitos Previos

Asegúrate de tener instaladas las siguientes herramientas en tu sistema:

- **PHP** >= 8.1
- **Composer** >= 2.0
- **Node.js** >= 16.x
- **npm** >= 8.x
- **MySQL** o cualquier base de datos compatible con Laravel
- **Git** (opcional, para clonar el repositorio)

---

## Configuración del Proyecto

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/tareas.git
cd tareas
```

### 2. Configurar el Backend

1. Navega al directorio del backend:

   ```bash
   cd tareas-backend
   ```

2. Instala las dependencias de PHP:

   ```bash
   composer install
   ```

3. Copia el archivo de configuración `.env.example` y renómbralo a `.env`:

   ```bash
   cp .env.example .env
   ```

4. Configura las variables de entorno en el archivo `.env`, como la conexión a la base de datos.

5. Genera la clave de la aplicación:

   ```bash
   php artisan key:generate
   ```

6. Ejecuta las migraciones para crear las tablas en la base de datos:

   ```bash
   php artisan migrate
   ```

7. (Opcional) Si deseas datos de prueba, ejecuta los seeders:

   ```bash
   php artisan db:seed
   ```

8. Inicia el servidor de desarrollo:

   ```bash
   php artisan serve
   ```

   El backend estará disponible en `http://localhost:8000`.

---

### 3. Configurar el Frontend

1. Navega al directorio del frontend:

   ```bash
   cd ../tareas-frontend
   ```

2. Instala las dependencias de Node.js:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

   El frontend estará disponible en `http://localhost:5173`.

---

## Scripts Útiles

### Backend

- `php artisan serve`: Inicia el servidor de desarrollo.
- `php artisan migrate`: Ejecuta las migraciones.
- `php artisan db:seed`: Población de datos de prueba.

### Frontend

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Compila el proyecto para producción.
- `npm run lint`: Ejecuta el linter para verificar errores de código.

---

## Notas Adicionales

- Asegúrate de que el backend y el frontend estén configurados para comunicarse correctamente. Por defecto, el backend debería estar en `http://localhost:8000` y el frontend en `http://localhost:5174`.
- Si estás desplegando el proyecto en un entorno de producción, asegúrate de configurar correctamente las variables de entorno y utilizar un servidor web como Nginx o Apache para el backend.

---

## Licencia

Este proyecto está licenciado bajo la [MIT License](https://opensource.org/licenses/MIT).
