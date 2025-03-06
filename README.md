# Diario de desarrollo

## 13-2-2025 (Clase)

-   Creación inicial del proyecto con Vite y React
-   Implementación de TailwindCSS para los estilos
-   Configuración del repositorio GitHub y primer commit
-   Planificación de la estructura básica del proyecto

## 17-2-2025 (Clase)

-   Creación del proyecto en Firebase
-   Configuración de Firestore para la base de datos
-   Implementación de Firebase Authentication
-   Creación de archivo de configuración para conectar con Firebase

## 20-2-2025 (Clase)

-   Creación de todas las páginas principales (Inicio, Tema, Búsqueda, Formulario)
-   Configuración del sistema de rutas con React Router
-   Implementación del componente de navegación principal
-   Primeros pasos en la estructura del formulario para añadir vehículos

## 1-3-2025 (Casa)

-   Implementación de operaciones básicas CRUD con Firestore
-   Desarrollo del formulario para añadir nuevos coches
-   Creación del listado principal de vehículos en la página de inicio
-   Solución de problema con las referencias a Firestore
-   Problema: No podía mostrar los datos después de guardarlos
-   Solución: Corregir la forma de acceder a los documentos en Firestore

## 2-3-2025 (Casa)

-   Diseño y maquetación inicial de las tarjetas de coches
-   Implementación de página detalle para mostrar información completa
-   Problema: Las imágenes no se cargaban correctamente
-   Solución: Añadido manejo de errores para mostrar imagen por defecto
-   Problema: El formulario no validaba correctamente los campos
-   Pendiente: Mejorar validaciones del formulario

## 5-3-2025 (Clase y Casa)

-   Separado navbar a su propio componente para mejor organización
-   Añadida ruta para ver detalles de un vehículo específico
-   Implementado redirección automática para URLs no encontradas
-   Añadida funcionalidad de búsqueda en tiempo real
-   Creado componente Searchbar para reutilización
-   Problema: La búsqueda solo funcionaba con términos exactos
-   Solución: Implementada búsqueda insensible a mayúsculas/minúsculas
-   Mejorada la visualización de resultados de búsqueda
-   Implementada edición y eliminación de coches
-   Mejorado formulario de edición y creación
-   Problema: Bug en el formulario al editar campos específicos
-   Pendiente: Corregir el bug del formulario

## 6-3-2025 (Clase y + Casa)

-   Creado componente CarCard reutilizable para mostrar tarjetas de coches
-   Implementada consistencia visual entre listado principal y resultados de búsqueda
-   Refactorizado código para mejorar la reutilización de componentes
-   Problema: Código duplicado en List y Búsqueda para mostrar los coches
-   Solución: Extraer lógica común a un componente CarCard reutilizable
-   Problema: Los estilos no eran consistentes entre diferentes tamaños de pantalla
-   Solución: Mejorada la responsividad con clases específicas de Tailwind
-   Corregido el bug en el formulario de edición que no permitía guardar ciertos campos
-   Implementada mejor gestión de errores en la carga de imágenes
-   Añadida validación adicional en la búsqueda para incluir modelo y descripción
-   Pendiente: Implementar paginación para manejar grandes cantidades de vehículos
-   Problema: A veces la navegación entre páginas no actualiza correctamente el scroll
-   Pendiente: Investigar solución para reset del scroll al cambiar de página

# Documentación caReact

## Acerca de caReact

caReact es una aplicación web desarrollada como proyecto final para el módulo de Desarrollo Web Cliente. Se trata de un "concesionario" virtual donde los usuarios pueden ver un catálogo de vehículos, estos vehículos se pueden crear, editar y/o eliminar al completo. También consta de un buscador por si se llena de vehículos y es complicado encontrar alguno. En un futuro los usuarios podrán crear una cuenta e iniciar sesión así abriendo el abanico de las posibilidade del proyecto.

## Tecnologías utilizadas

-   React
-   Vite
-   React Routers
-   Tailwind CSS
-   Firebase/Firestore
-   Firebase Authentication (No implementado)

## Cómo ejecutar el proyecto

### Requisitos previos

-   Node.js
-   npm, yarn, bun, etc...
-   Git

### Pasos a seguir para seguir desarrollando el catálogo.

1. Clona el repositorio
2. Instal·la las dependencias
3. Inicia el servidor de desarrollo con "npm run dev"

## Organización del códgido (Estructura)

El código al haberse creado con Vite+React viene la estructura default de Vite.

Dentro de la carpeta source (/src), tneemos tres carpetas principales:

    Componentes:
        Contiene componentes reutilizables que se utilizan en varias partes de la aplicación.
    Pages:
        Contiene los componentes que están asociados a rutas específicas de la aplicación.
    Config:
        Archivos de configuración

## Mejoras futuras (ideas)

-   Implementar un sistema de paginación para el catálogo.
-   Mejorar validaciones en formulario de vehículos
-   Añadir sistema de autenticación ya empezado y no acabado.
-   Desarrollar un panel de administración estaría top.
-   Permitir subir imágenes y no cogerlas de internet. (Firebase Storage pero vale dinero)
-   Implementar modo oscuro
-   Implementar sistema de comentarios

## Autor

Desarrollado por Sergi Camps para el módulo de Desarrollo Web en Entorno Cliente del ciclo formativo de DAW.
