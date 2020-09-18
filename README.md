
# Hallo
E-commerce del curso de ReactJS de Coderhouse </br>
por **Estrella Portocarrero**

## Instrucciones de instalación
``` 
git clone https://github.com/strlla/Hallo-ecommerce.git
npm install
npm start
```
## Routes
|Route| Descripción |
|--|--|
| / | Home y listado de todos los productos. |
| /item/:id | Detalles del producto según el id del item. En caso de que el produtco en la base de datos, se avisa al usuario al respecto.
| /category/:categoryId | Listado de productos según categoría. |
| /cart | Carrito en el que se muestra un resumen del pedido del usuario.|

## Walkthrough
![demo](demo/demo.gif)

## Dependencias
- [react-router-dom](https://www.npmjs.com/package/react-router-dom)
- [firebase](https://www.npmjs.com/package/firebase) </br>
Librerías usadas para proporcionar un **contenido más dinámico e interactivo**:
 - [framer-motion](https://www.npmjs.com/package/framer-motion): libreria open-source para realizar animaciones.
 - [styled-components](https://www.npmjs.com/package/styled-components): libreria que permite crear componentes de React, y al mismo tiempo definir sus estilos condicionados a sus propiedades.
