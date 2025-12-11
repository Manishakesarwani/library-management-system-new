const {BookModel, UserModel} = require("../models/index");
const IssuedBooks=require("../dtos/books-DTO");

// const getAllBooks=()=>{

// }
// const getSingleBookById=()=>{}

// module.exports={
//     getAllBooks,
//     getSingleBookById
// }

// b_router.get("/",(req, res)=>{
//     res.status(200).json({
//         success: true,
//         booksList: books
//     });
// });

exports.getAllBooks=async(req, res)=>{
const books=await BookModel.find();
if(!books){
    return res.status(404).json({
        success:false,
        message:"No Books in the system!"
    });
}
res.status(200).json({
    success:true,
    data: books
});
}



// b_router.get("/:id",(req, res)=>{

//     const {id}=req.params;
//     const book=books.find((each)=>each.id===id)

//     if(!book){
//         return res.status(404).json({
//             success:false,
//             message: `Book - ${id} not found!`
//         });
//     }
//     res.status(200).json({
//         success:true,
//         data:book
//     });
// });
exports.getSingleBookById=async(req,res)=>{
    const {id}=req.params;
    const book=await BookModel.findById(id);
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
}

// b_router.get("/stock",(req, res)=>{
//     const book_ck=books.map((book)=>{
//         if(book.inStock){
//             return {
//                 book
//             };
//         }
//     })

//     if(!book_ck){
//         return res.status(202).json({
//             success: true,
//             message: `No Book is in stock`
//         });
//     }

//         return res.status(200).json({
//             success: true,
//             BookList: book_ck
//         });

// });

exports.getAllBookIsInStock=async (req,res)=>{
    const allBooks=await BookModel.find({
        inStock: true
    }).populate("inStock");

    if(!allBooks){
        return res.status(404).json({
            success: false,
            message: "No Books are in Stock!"
        });
    }

    return res.status(200).json({
        success: true,
        BookList: allBooks
    });
}

exports.getAllIssuedBooks=async(req, res)=>{
    const users=await UserModel.find({
        issuedBook:{$exists:true}
    }).populate("issuedBook");

    // console.log(users[0].issuedBook);

    const issuedBooks=users.map((each)=>{
        return new IssuedBooks(each);
    });

    if(issuedBooks.length===0){
        return res.status(404).json({
            success: false,
            message: "No Bookes issued yet!"
        });
    }
    return res.status(200).json({
        success: true,
        BookList: issuedBooks
    });
}

// b_router.post("/",(req, res)=>{

// const {id, title, author, genre, year, price, inStock, rating, publisher} = req.body;

// if(!id || !title || !author || !genre || !year || !price || !inStock || !rating || !publisher){
//     return res.status(404).json({
//         success: false,
//         message: "Please provide details for all the fields."
//     });
// }

// const book = books.find((each)=>each.id===id);

// if(book){
//     return res.status(409).json({
//         success: false,
//         message: `Book - ${id} already exists!`
//     });
// }

// books.push({
//     id,
//     title,
//     author,
//     genre,
//     year,
//     price,
//     inStock,
//     rating,
//     publisher
// })

// res.status(201).json({
//     success:true,
//     message: `Book - ${id} added succesfully`,
//     bookList: books
// })

// });

exports.createBook=async (req, res)=>{
    const {data} = req.body;
    if(!data || Object.keys(data).length===0){
        return res.status(400).json({
            success: false,
            message: "Please mention data for all fields."
        });
    }
    await BookModel.create(data);

    const allBooks=await BookModel.find();
    return res.status(200).json({
        success: true,
        message: "Book created successfully!",
        BookList: allBooks
    });
}

// b_router.put("/:id", (req,res)=>{
//     const {id}=req.params;
//     const book=books.find((each)=>each.id===id);

//     const {data}=req.body;

//     if(!book){
//         return res.status(404).json({
//             success: false,
//             message:`Book - ${id} does not exists!`
//         });
//     }

//     const UpdatedBook = books.map((item)=>{
//         if(item.id===id){
//             return {
//                 ...item,
//                 ...data
//             };
//         }
//             return item;
//     })

//     res.status(200).json({
//         success: true,
//         message:`Book ${id} updated succesfully!`,
//         data: UpdatedBook
//     });
// });

exports.updateBook=async(req, res)=>{
    const {id}=req.params;
    const {data}=req.body;

    if(!data || Object.keys(data).length===0){
        return res.status(400).json({
            success: false,
            message: "Please provide details for the book to be updated!"
        });
    }

    // const getBook=await BookModel.findById(id);
    // const getBook=await BookModel.findByIdAndUpdate(id, data, {new: true});
    const getBook=await BookModel.findOneAndUpdate({_id: id}, data, {new: true});

    if(!getBook){
        return res.status(404).json({
            success: false,
            message: "No such book found in the system!"
        })
    }

    // Object.assign(getBook, data);
    // await getBook.save();

    res.status(200).json({
        success: true,
        message: "Book updated successfully!",
        bookDetails: getBook
    });
}

// b_router.delete("/:id",(req,res)=>{
//     const {id}=req.params;
//     const book=books.find((each)=>each.id===id);

//     if(!book){
//         return res.status(404).json({
//             success: false,
//             message: `Book - ${id} not found!`
//         });
//     }
//     const updatedBooks = books.filter((each)=>each.id !== id);

//     res.status(202).json({
//         success: true,
//         message: `Book - ${id} removed successfully!`,
//         data: updatedBooks
//     });
// });

exports.deleteBook=async(req, res)=>{
    const {id}=req.params;
    const book=await BookModel.findById(id);

    if(!book){
        return res.status(404).json({
            success: false,
            message: "No such book present in the system!"
        })
    }

    await BookModel.findByIdAndDelete(id);

    const allBooks=await BookModel.find();

    res.status(200).json({
        success:true,
        message:"Book deleted successfully!",
        BookList: allBooks
    })

}