using { sap.capire.bookshop as my } from '../db/datamodel';
service AdminService @(impl: './server.ts') { 
  entity Books as projection on my.Books;

}