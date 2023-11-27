class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }


    getProductId(){
        return this.id;
    }

    getProduct() {
        return ({
            id: this.id,
            name: this.name,
            price: this.price
        })
    }
}

export default Product;
