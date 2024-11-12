using { managed } from '@sap/cds/common';
namespace sap.capire.bookshop; 

entity Books : managed { 
  key ID : Integer;
  title  : String(111);
  descr  : String(1111);
  author : String(50);
  stock  : Integer;
  price  : Decimal(9,2);
}