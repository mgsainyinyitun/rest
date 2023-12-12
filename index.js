import express from 'express';
import path from 'path';
import { getProducts, addProduct, deleteProduct, updateProduct } from "./controller/products/productControllers.js";
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import userRouter from './router/user/UserRouter.js';
import tkbRoute from './router/tkb/TkbRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("server listen on port : ", PORT);
})

app.get("/", (req, res) => {
    console.log("working")
    res.json({
        message: "successfully start server modified",
    })
})

app.get("/api", (req, res) => {
    res.sendFile(path.join(__dirname, './html/index.html'));
})

app.get("/products", (req, res) => getProducts(req, res));
app.post("/product/add", (req, res) => addProduct(req, res));
app.delete("/product/delete/:id", (req, res) => deleteProduct(req, res));
app.put("/product/update/:id", (req, res) => updateProduct(req, res));

app.use("/user",userRouter);
app.use("/tkb",tkbRoute);