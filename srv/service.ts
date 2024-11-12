import  cds  from '@sap/cds';


export default cds.service.impl(async function () {
    const Books = this.entities.Books;

    if (!Books) {
        console.error('La entidad Books no está definida.');
        throw new Error('La entidad Books no está disponible.');  
    }

    interface Book {
        ID : String;
        title  : String;
        descr  : String;
        author : String;
        stock  : Number;
        price  : Number;
    }

    // registar

    this.on('register', async (req) =>{
        const data : Book = req.data;

        const newBook : Book = {
            ID: cds.utils.uuid(),
            title  : data.title,
            descr  : data.descr,
            author : data.author,
            stock  : data.stock,
            price  : data.price
        }
        await INSERT.into(this.entities.Books).entries(newBook);
        req.reply('Libro creado con éxito');
    });

})