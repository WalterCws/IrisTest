# PruebaIris
# IrisExam

Este repositorio contiene una web app con la funcionalidad de un TO DO LIST

## 1) IrisFronted
    Aplicación web

  - Desarrollo en angular 18  
  - Funcionalidades
    - Crear tareas con descripción y fecha de vencimiento.
    - Filtrar tareas por completadas , pendietnes y vencidas.
    - Marcar tareas como favoritas.
    - Marcar tareas completadas.
    - Eliminar tareas. 

## Live server
El proyecto esta desplegado en un sitio estatico de Azure `https://salmon-glacier-0a7ded20f.4.azurestaticapps.net/`

## Development server

Para correr el proyecto de forma local debe contar con angular en su versión 18 o susperior y node js v18.1+

Sobre el path /IrisFrontend

Restaurar dependencias: `npm install`

Ejecutar aplicación `ng serve`. 

Navegue http://localhost:4200

## 2) BackEnd 
    aplicación api 

  - Desarrollada en .net8 usando minimal api. 
  - Arquitectura limpia y orientada al dominio.
  - Implementa CI/CD mediante Github Actions.
  - Despliegue en Azure app services
  - Colleción de postman: IrisTest.postman_collection.json

## Live server

El proyecto esta desplegado en un app services de Azure `https://iris-test-fvhydgd0cngdethy.eastus2-01.azurewebsites.net/`

## Development server

Instalar SDK .Net 8
Configurar las siguientes variables de ambiente o en su defecto el archivo appsetting.json

    "Jwt": {
        "Issuer": "url del api",
        "Audience": "url del api",
        "Key": "llave de 512 bits"
    },
    "ConnectionStrings": {
    "database": "cadena de conexión a base de datos a sql server"
    }

Agregar la migración a la base de datos
Ejecute el archivo 'database-migration.sql' en su base de datos 

Sobre el path ./Backend/Iris

Correr aplicación: dotnet run 

Navegue a `http://localhost:5211/swagger/index.html`

## Anotaciones

Se adjunta una colleción de postman para consumir el CRUD sobre la tabla iris.Task donde se almacena la información.
La aplicación tambien cuenta con swagger habilitado para realizar el consumo de los endpoints expuestos.

El api implementa una autenticación simple mediante token JWT. 
Para simular la validación de usuarios, el endponint /api/v1/auth valida que el payload contenga un email con formato correcto.

La base de datos utilizada es SQL server, que se encuentra alojada en AWS RDS.




