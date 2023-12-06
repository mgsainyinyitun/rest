import firebase from "../../firebase.js";
import Product from "../../models/products/productModel.js";
import uniqid from 'uniqid';

import { getFirestore, collection, query, getDocs, doc, deleteDoc, setDoc, updateDoc, orderBy } from "firebase/firestore";
const db = getFirestore(firebase);
const productRef = collection(db, "products");

export const getProducts = async (req, res) => {
    const { sort, order } = req.query;
    const q = query(productRef, orderBy(sort, order));  // desc , asc 
    const querySnapshot = await getDocs(q);
    let prods = [];
    querySnapshot.forEach((doc) => {
        let product = new Product(
            doc.data().id,
            doc.data().name,
            doc.data().price,
            doc.data().createdAt ? doc.data().createdAt : null
        )
        prods.push(product.getProduct());
    });
    res.json({
        data: prods
    });
};

export const addProduct = async (req, res) => {
    let product = new Product(
        uniqid(),
        req.body.name,
        req.body.price,
        new Date().toISOString()
    )

    setDoc(doc(db, "products", product.getProductId()), product.getProduct())
        .then(() => {
            res.json(product.getProduct())
        })
        .catch((error) => {
            console.error('Error adding product:', error);
            res.json(error);
        });
}

export const deleteProduct = async (req, res) => {
    const docRef = doc(db, "products", req.params.id);

    deleteDoc(docRef)
        .then(() => {
            console.log('Product successfully deleted.');
            res.json({
                deletedId: req.params.id
            })
        })
        .catch((error) => {
            console.error('Error deleting product:', error);
            res.json(error);
        });
}


export const updateProduct = async (req, res) => {
    const docRef = doc(db, "products", req.params.id);
    const data = req.body.name && req.body.price ?
        {
            name: req.body.name,
            price: req.body.price
        } : req.body.name && !req.body.price ?
            {
                name: req.body.name
            } : !req.body.name && req.body.price ?
                {
                    price: req.body.price
                } : null;

    if (data == null) res.json({ message: "update data not found!" })

    console.log(data);

    updateDoc(docRef, data)
        .then(() => {
            console.log('Product successfully updated.');
            res.json({
                updatedId: req.params.id
            })
        })
        .catch((error) => {
            console.error('Error updating product:', error);
            res.json(error);
        });
}