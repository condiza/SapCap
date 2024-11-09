using { bookshop } from '../db/dataModel';

service CatalogoService @( path: '/catalogService'){
    entity Book as projection on bookshop.Books;
}