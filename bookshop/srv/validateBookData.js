async function validateBookData(data) {
  const { title, author, genre, publishedDate, isbn, language, price, stock } = data;

  // 1. Validación de campos obligatorios
  if (!title || !author || !genre || !publishedDate || !isbn || !language || price == null || stock == null) {
    throw new Error('Todos los campos son obligatorios.');
  }

  // 2. Validación del formato de ISBN (10 o 13 caracteres)
  const isbnRegex = /^(?:\d{10}|\d{13})$/;
  if (!isbnRegex.test(isbn)) {
    throw new Error('El ISBN debe tener 10 o 13 caracteres numéricos.');
  }

  // 3. Validación del tipo de datos
  if (typeof price !== 'number' || price <= 0) {
    throw new Error('El precio debe ser un número mayor a 0.');
  }
  if (!Number.isInteger(stock) || stock < 0) {
    throw new Error('El stock debe ser un número entero no negativo.');
  }

}

module.exports = {
  validateBookData
};
