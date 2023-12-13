import TKBError from "../../models/tkberror/TKBError.js";
import uniqid from 'uniqid';

import { getFirestore, collection, query, getDocs, doc, deleteDoc, setDoc, updateDoc, orderBy } from "firebase/firestore";
import firebase from "../../firebase.js";

const db = getFirestore(firebase);
const tkbRef = collection(db, "tkb");


function convertISOToYYYYMMDD(isoString) {
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}


export const getTkbs = async (req, res) => {
    const { sort, order, date } = req.query;
    const q = query(tkbRef, orderBy(sort || "occureDate", order || "desc"));  // desc , asc 

    const querySnapshot = await getDocs(q);
    let tkbs = [];
    querySnapshot.forEach((doc) => {
        let tkb = new TKBError(
            doc.data().id,
            doc.data().occureDate ? doc.data().occureDate : null,
            doc.data().group,
            doc.data().server,
            doc.data().serverity,
            doc.data().fase,
            doc.data().message
        )

        if (date) {
            if (convertISOToYYYYMMDD(tkb.occureDate) === date) {
                tkbs.push(tkb.display());
            }

        } else {
            tkbs.push(tkb.display());
        }
    });

    res.json({
        totalRecords:tkbs.length,
        data: tkbs
    });
};


export const getJsonTkbs = async (req, res) => {
    const { sort, order, date } = req.query;
    const q = query(tkbRef, orderBy(sort || "occureDate", order || "desc"));  // desc , asc 
    const querySnapshot = await getDocs(q);
    let tkbs = [];
    querySnapshot.forEach((doc) => {
        let tkb = new TKBError(
            doc.data().id,
            doc.data().occureDate ? doc.data().occureDate : null,
            doc.data().group,
            doc.data().server,
            doc.data().serverity,
            doc.data().fase,
            doc.data().message
        )
        tkbs.push(tkb.getTKBError());
    });

    if (date) {
        var ftkbs = tkbs.filter(tkb => { return convertISOToYYYYMMDD(tkb.occureDate) === date; }
        );
        res.json({
            totalRecords: ftkbs.length,
            date: ftkbs
        })
    } else
        res.json({
            totalRecords: tkbs.length,
            data: tkbs
        });
};


export const addTkbError = async (req, res) => {
    let tkb = new TKBError(
        uniqid(),
        new Date().toISOString(),
        req.body.group || "",
        req.body.server || "",
        req.body.serverity || "",
        req.body.fase || null,
        req.body.message || ""
    )

    setDoc(doc(db, "tkb", tkb.getErrorId()), tkb.getTKBError())
        .then(() => {
            res.json(tkb.getTKBError())
        })
        .catch((error) => {
            console.error('Error adding product:', error);
            res.json(error);
        });
}


export const deleteTkbError = async (req, res) => {
    const docRef = doc(db, "tkb", req.params.id);

    deleteDoc(docRef)
        .then(() => {
            console.log('Error successfully deleted.');
            res.json({
                deletedId: req.params.id
            })
        })
        .catch((error) => {
            console.error('Error deleting error:', error);
            res.json(error);
        });
}

export const updateTkb = async (req, res) => {
    const docRef = doc(db, "tkb", req.params.id);
    const data = req.body;
    updateDoc(docRef, data)
        .then(() => {
            console.log('Tkb error successfully updated.');
            res.json({
                updatedId: req.params.id
            })
        })
        .catch((error) => {
            console.error('Error updating Tkb error:', error);
            res.json(error);
        });
}