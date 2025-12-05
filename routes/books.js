const express=require("express");
const b_router=express.Router();
const books = require("../data/books.json");
const users=require("../data/users.json")

/**
 * Route: '/books'
 * method: GET
 * Descriptions: Get all the list of books from the system
 * Acess: public
 * Parameters: none
 */

b_router.get("/",(req, res)=>{
    res.status(200).json({
        success: true,
        booksList: books
    });
});

/**
 * Route: '/books/stock'
 * method: GET
 * Descriptions: Get all the book is in stock
 * Acess: public
 * Parameters: NONE
 */

b_router.get("/stock",(req, res)=>{
    const book_ck=books.map((book)=>{
        if(book.inStock){
            return {
                book
            };
        }
    })

    if(!book_ck){
        return res.status(202).json({
            success: true,
            message: `No Book is in stock`
        });
    }

        return res.status(200).json({
            success: true,
            BookList: book_ck
        });

});

/**
 * Route: '/books/:id'
 * method: GET
 * Descriptions: Get book by their ID.
 * Acess: public
 * Parameters: id
 */

b_router.get("/:id",(req, res)=>{

    const {id}=req.params;
    const book=books.find((each)=>each.id===id)

    if(!book){
        return res.status(404).json({
            success:false,
            message: `Book - ${id} not found!`
        });
    }
    res.status(200).json({
        success:true,
        data:book
    });
});

/**
 * Route: '/books'
 * method: POST
 * Descriptions: Create/register book by their ID
 * Acess: public
 * Parameters: None
 */

b_router.post("/",(req, res)=>{

// {
//         "id": "30",
//         "title": "The Last Sunrise",
//         "author": "Zara Fernandes",
//         "genre": "Drama",
//         "year": 2019,
//         "price": 310,
//         "inStock": true,
//         "rating": 4.2,
//         "publisher": "SilverLine Publications"
//     }    

const {id, title, author, genre, year, price, inStock, rating, publisher} = req.body;

if(!id || !title || !author || !genre || !year || !price || !inStock || !rating || !publisher){
    return res.status(404).json({
        success: false,
        message: "Please provide details for all the fields."
    });
}

const book = books.find((each)=>each.id===id);

if(book){
    return res.status(409).json({
        success: false,
        message: `Book - ${id} already exists!`
    });
}

books.push({
    id,
    title,
    author,
    genre,
    year,
    price,
    inStock,
    rating,
    publisher
})

res.status(201).json({
    success:true,
    message: `Book - ${id} added succesfully`,
    bookList: books
})

});

/**
 * Route: '/books/:id'
 * method: PUT
 * Descriptions: Updating book by their ID
 * Acess: public
 * Parameters: id
 */

b_router.put("/:id", (req,res)=>{
    const {id}=req.params;
    const book=books.find((each)=>each.id===id);

    const {data}=req.body;

    // if(!data || Object.keys(data).length===0){
    //     return res.status(404).json({
    //         success:false,
    //         message: "Please provide data to be updated!"
    //     });
    // }

    if(!book){
        return res.status(404).json({
            success: false,
            message:`Book - ${id} does not exists!`
        });
    }

    const UpdatedBook = books.map((item)=>{
        if(item.id===id){
            return {
                ...item,
                ...data
            };
        }
            return item;
    })

    res.status(200).json({
        success: true,
        message:`Book ${id} updated succesfully!`,
        data: UpdatedBook
    });
});

/**
 * Route: '/books/:id'
 * method: DELETE
 * Descriptions: Deleting book by their ID
 * Acess: public
 * Parameters: id
 */

b_router.delete("/:id",(req,res)=>{
    const {id}=req.params;
    const book=books.find((each)=>each.id===id);

    if(!book){
        return res.status(404).json({
            success: false,
            message: `Book - ${id} not found!`
        });
    }
    const updatedBooks = books.filter((each)=>each.id !== id);

    res.status(202).json({
        success: true,
        message: `Book - ${id} removed successfully!`,
        data: updatedBooks
    });
});




module.exports=b_router;