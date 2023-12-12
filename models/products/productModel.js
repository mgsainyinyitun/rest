class Product {
    constructor(id, name, price,createdAt) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.createdAt = createdAt;
    }

    getProductId(){
        return this.id;
    }

    getProduct() {
        return ({
            id: this.id,
            name: this.name,
            price: this.price,
            createdAt:this.createdAt
        })
    }
}

export default Product;