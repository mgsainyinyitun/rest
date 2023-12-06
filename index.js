import express from 'express';
import path from 'path';
import { getProducts, addProduct, deleteProduct, updateProduct } from "./controller/products/productControllers.js";
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import userRouter from './router/user/UserRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("server listen on port : ", PORT);
})

app.get("/", (req, res) => {
    res.json({
        message: "successfully start server",
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