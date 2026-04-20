# Serigrafia PWA

Este es un proyecto de aplicación web progresiva (PWA) para la gestión de serigrafía. La aplicación permite la autenticación de usuarios, la gestión de roles y la administración de usuarios.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

- **src/**: Contiene el código fuente de la aplicación.
  - **app.ts**: Punto de entrada de la aplicación que configura la PWA y gestiona rutas y servicios.
  - **auth/**: Módulo para la gestión de usuarios y roles.
    - **users.ts**: Define la clase `User` para representar a los usuarios.
    - **roles.ts**: Define la clase `Role` para representar los roles de usuario.
  - **pages/**: Contiene los componentes de las diferentes páginas de la aplicación.
    - **login.ts**: Componente para la autenticación de usuarios.
    - **dashboard.ts**: Componente que muestra el panel de control del usuario.
    - **admin.ts**: Componente para la gestión de usuarios y roles por parte de administradores.
  - **services/**: Contiene servicios para la gestión de autenticación y usuarios.
    - **authService.ts**: Funciones para gestionar la autenticación.
    - **userService.ts**: Funciones para gestionar usuarios.
  - **types/**: Define las interfaces para la tipificación de datos.
    - **index.ts**: Contiene las interfaces para usuarios y roles.

- **public/**: Contiene archivos públicos de la aplicación.
  - **manifest.json**: Manifiesto de la PWA que define propiedades como nombre, icono y tema.
  - **service-worker.js**: Código del service worker para funcionalidad offline y gestión de caché.

- **package.json**: Configuración de npm que lista dependencias y scripts necesarios.
- **tsconfig.json**: Configuración de TypeScript que especifica opciones del compilador.
- **README.md**: Documentación del proyecto.

## Instalación

Para instalar las dependencias del proyecto, ejecuta:

```
npm install
```

## Uso

Para iniciar la aplicación, utiliza el siguiente comando:

```
npm start
```

Esto iniciará un servidor de desarrollo y abrirá la aplicación en tu navegador.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la licencia MIT.