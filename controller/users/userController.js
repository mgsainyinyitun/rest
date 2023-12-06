import User from "../../models/users/userModel.js";
import firebase from "../../firebase.js";
import uniqid from 'uniqid';
import { getFirestore, collection, setDoc, doc, query, where, getDocs, updateDoc } from "firebase/firestore";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const db = getFirestore(firebase);
const userRef = collection(db, "users");

export function verifyUserToken(req, res, next) {
    const token = req.header('Authorization');
    console.log('heder auth:', token);
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWTTOKENKEY);
        req.name = decoded.name;

        console.log(decoded);
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

async function findUserByUserName(name) {
    const q = query(userRef, where("name", "==", name));
    let user = await getDocs(q).then(docs => {
        let tempuser = null;
        docs.forEach(doc => {
            tempuser = doc.data();
        });
        return tempuser;
    });
    return user;
}

export const loginUser = async (req, res, next) => {
    const { name, password } = req.body;
    findUserByUserName(name)
        .then(user => {
            console.log(user);
            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (result) {
                        // if successfully login
                        // generate access token
                        const token = jwt.sign(
                            {
                                name: user.name,
                                role: user.role,
                            },
                            process.env.JWTTOKENKEY,
                            {
                                expiresIn: "3m"
                            });
                        // generate refresh token
                        const refreshToken = jwt.sign({ name: user.name }, process.env.JWTREFRESHTOKEN,
                            {
                                expiresIn: "1d"
                            }
                        )
                        // store refresh token in database
                        updateUser(user.id, {
                            refreshToken
                        });

                        res.status(200).json({
                            message: "successfully login!",
                            token,
                            refreshToken,
                        })
                    } else {
                        res.status(401).json({
                            message: "password incorrect!"
                        })
                    }
                })
            } else {
                return res.status(401).json({
                    message: "user not found"
                })
            }
        })
}

export const updateUser = async (uid, data) => {
    const docRef = doc(db, "users", uid);
    updateDoc(docRef, data)
        .then(() => {
            return Promise.resolve(0);
        })
        .catch((error) => {
            return Promise.reject(error);
        });
}


export const addUser = async (req, res, next) => {
    if (req.body.password.length < 6) {
        return res.status(400).json({ message: "Password less than 6 characters" })
    }
    bcrypt.hash(req.body.password, 10).then(hashed => {
        let user = new User(
            uniqid(),
            req.body.name,
            req.body.role,
            new Date().toISOString(),
            hashed
        )
        setDoc(doc(db, "users", user.getUserId()), user.getUser())
            .then(() => {
                res.status(200).json(user.getUser())
            })
            .catch((error) => {
                console.error('Error adding user:', error);
                res.status(401).json(error)
            });
    })
}
