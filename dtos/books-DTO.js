//Data Transfer Object

class IssuedBook{
    _id;
    title;
    author;
    genre;
    year;
    price;
    inStock;
    rating;
    publisher;
    issuedBy;
    issuerAge;
    issuerEmail;

    constructor(user){
        this._id=user.issuedBook._id;
        this.title=user.issuedBook.title;
        this.author=user.issuedBook.author;
        this.genre=user.issuedBook.genre;
        this.year=user.issuedBook.year;
        this.price=user.issuedBook.price;
        this.inStock=user.issuedBook.inStock;
        this.rating=user.issuedBook.rating;
        this.publisher=user.issuedBook.publisher;
        this.issuedBy=user.name;
        this.issuerAge=user.age;
        this.issuerEmail=user.email;
    }
}

module.exports = IssuedBook;
