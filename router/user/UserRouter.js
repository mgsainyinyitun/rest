import express from "express";
import { addUser, loginUser, verifyUserToken } from "../../controller/users/userController.js";

const userRouter = express.Router();

userRouter.get('/', verifyUserToken, (req, res) => {
    res.send("user management page");
});

userRouter.post('/login', (req, res, next) => loginUser(req, res, next));

userRouter.post('/signup', (req, res, next) => addUser(req, res, next));


export default userRouter;