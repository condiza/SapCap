using { managed } from '@sap/cds/common';

namespace bookshop;

entity Books : managed {
   key isbn          : String(13);         // Código ISBN del libro (13 caracteres)
   title             : String(100);        // Título del libro (hasta 100 caracteres)
   author            : String(50);         // Nombre del autor (hasta 50 caracteres)
   genre             : String(30);         // Género literario del libro (hasta 30 caracteres)
   publishedDate     : Date;               // Fecha de publicación
   language          : String(20);         // Idioma del libro (hasta 20 caracteres)
   price             : Decimal(10, 2);     // Precio del libro (hasta 10 dígitos, con 2 decimales)
   stock             : Integer;            // Cantidad en inventario (número entero)
}
