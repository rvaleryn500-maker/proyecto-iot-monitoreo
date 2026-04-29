# DESIGN.md

## Arquitectura General

El sistema consiste en una solución full stack para el monitoreo en tiempo real de dispositivos IoT instalados en vehículos. Permite visualizar datos, estados y alertas desde una interfaz centralizada.

## Frontend

El frontend está desarrollado en Next.js y se encarga de la experiencia del usuario, incluyendo:

-Autenticación de usuarios
-Visualización de dashboard principal
-Mapa de seguimiento en tiempo real
-Gestión de roles y permisos
-Soporte básico de caché para uso offline

## Backend

El backend está construido con Node.js y Express, y centraliza la lógica del sistema:

-Autenticación mediante JWT
-API REST para consumo del frontend
-Comunicación en tiempo real con Socket.IO
-Gestión de alertas y eventos
-Persistencia de datos en SQLite

## Flujo

El flujo general del sistema seria el siguiente:

Dispositivo IoT → Backend → Base de datos → Frontend (Dashboard)

## Roles

El sistema maneja dos niveles de acceso:

-ADMIN: acceso completo a la plataforma y configuración del sistema
-USER: acceso limitado a visualización de datos y monitoreo

## Escalabilidad futura

Se contemplan mejoras a futuro para fortalecer la arquitectura como por ejemplo:

-Migración de SQLite a PostgreSQL
-Contenerización con Docker
-Despliegue en infraestructura cloud
-Mejora en el sistema de alertas y analítica de datos
