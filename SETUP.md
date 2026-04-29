# SETUP.md

## Requisitos

Antes de ejecutar el proyecto, asegúrate de tener instalado lo siguiente:

-Node.js (versión recomendada LTS)
-npm (incluido con Node.js)

## Backend

Para iniciar el backend, sigue estos pasos

-cd backend
-npm install
-node src/index.js

## Importante
-Asegúrate de ejecutar los comandos desde la raíz del proyecto.
-Si el servidor no inicia, verifica que no haya otro proceso usando el puerto configurado.

## Servidor Backend

El backend se ejecuta en:
http://localhost:3001

## Frontend

Para iniciar el frontend:

-cd frontend
-npm install
-npm run dev

Una vez iniciado, la aplicación estará disponible en:

http://localhost:3000

## Simulador IoT

Para ejecutar el simulador de datos, sigue estos pasos:

-cd backend
-node simulador.js

Este script genera datos simulados para pruebas del sistema en tiempo real.

## Usuarios de prueba

Para acceder al sistema puedes usar los siguientes usuarios:

-admin → usuario administrador
-user → usuario estándar