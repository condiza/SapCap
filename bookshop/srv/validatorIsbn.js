const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const Mongo_Url = process.env.MONGO_URL;
const DB_Books = process.env.DATABASE_BOOKS;
const client = new MongoClient(Mongo_Url);

async function validateDuplicateISBN(isbn) {
  // Conectar a la base de datos para comprobar si ya existe el ISBN
  await client.connect();
  const dataBase = await client.db(DB_Books);
  const books = await dataBase.collection("Books");

  // Buscar si existe un libro con el mismo ISBN
  const existingBook = await books.findOne({ isbn: isbn });

  if (existingBook) {
    throw new Error("Ya existe un libro con el mismo ISBN.");
  }
}

module.exports = {
  validateDuplicateISBN,
};
