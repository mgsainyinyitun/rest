import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import { addTkbError, deleteTkbError, getJsonTkbs, getTkbs, updateTkb } from "../../controller/tkb/TkbController.js";

const tkbRoute = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

tkbRoute.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../html/tkb.html'))
});

tkbRoute.get('/all', (req, res) => getTkbs(req,res));

tkbRoute.get('/all/json', (req, res) => getJsonTkbs(req,res));

tkbRoute.post('/add', (req, res) => addTkbError(req,res));

tkbRoute.delete('/delete/:id', (req, res) => deleteTkbError(req,res));

tkbRoute.put("/update/:id", (req, res) => updateTkb(req, res));
export default tkbRoute;
