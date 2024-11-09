const cds = require("@sap/cds");
const MongoClient = require("mongodb").MongoClient;
const { validateBookData } = require("./validateBookData");
const dotenv = require("dotenv");
const { validateDuplicateISBN } = require("./validatorIsbn");
dotenv.config();

const Mongo_Url = process.env.MONGO_URL;
const DB_Books = process.env.DATABASE_BOOKS;
const client = new MongoClient(Mongo_Url);

async function _CreateBook(req) {
  try {
    await validateBookData(req.data);
    await validateDuplicateISBN(req.data.isbn);
    await client.connect();
    const dataBase = client.db(DB_Books);
    const books = dataBase.collection("Books");
    const result = await books.insertOne(req.data);

    req.data._id = result.insertedId;
    return {
      mensaje: "Libro creado exitosamente.",
      datos: req.data
    };
  } catch (error) {
    req.error(400, error.message);
  } finally {
    await client.close();
  }
}

async function _RecoverBook(req) {
  try {
    await client.connect();
    const dataBase = client.db(DB_Books);
    const books = dataBase.collection("Books");

    const { title, author, genre } = req.query;
    const filter = {};
    if (title) filter.title = title;
    if (author) filter.author = author;
    if (genre) filter.genre = genre;

    const result = await books.find(filter).toArray();
    return {
      mensaje: "Libros recuperados exitosamente.",
      datos: result
    };
  } finally {
    await client.close();
  }
}

async function _UpdateBook(req) {
  try {
    await validateBookData(req.data);
    await client.connect();
    const dataBase = client.db(DB_Books);
    const books = dataBase.collection("Books");

    const book = req.data;
    const id = book.isbn;
    delete book.isbn;

    const result = await books.updateOne({ isbn: id }, { $set: book });

    if (result.modifiedCount > 0) {
      return {
        mensaje: "Libro actualizado exitosamente.",
        datos: book
      };
    } else {
      req.error(404, "Libro no encontrado");
    }
  } catch (error) {
    req.error(400, error.message);
  } finally {
    await client.close();
  }
}

async function _DeleteBook(req) {
  try {
    await client.connect();
    const dataBase = client.db(DB_Books);
    const books = dataBase.collection("Books");

    const { isbn } = req.data;
    if (!isbn) {
      return req.error(400, "ISBN es requerido para eliminar un libro.");
    }

    const result = await books.deleteOne({ isbn: isbn });
    if (result.deletedCount == 1) {
      return {
        mensaje: "Libro eliminado exitosamente.",
        estado: "éxito"
      };
    } else {
      req.error(404, "Libro no encontrado");
    }
  } finally {
    await client.close();
  }
}

module.exports = cds.service.impl(function () {
  const { book } = this.entities;
  this.on("INSERT", book, _CreateBook);
  this.on("READ", book, _RecoverBook);
  this.on("UPDATE", book, _UpdateBook);
  this.on("DELETE", book, _DeleteBook);
});
