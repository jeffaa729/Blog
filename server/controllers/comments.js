import { db } from "../database.js";
import jwt from "jsonwebtoken";

export const getComments =(req,res) =>{

    const q = "SELECT c.id, c.postId, `content` , `writer` , c.date FROM comments c JOIN posts p ON c.postId = p.id WHERE p.id = ?"

    db.query(q, [req.params.id], (err,data)=>{
        if(err){
            return res.send(err)
        }
        return res.status(200).json(data)
    }) 
}

export const addComments =(req,res) =>{
    
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
    
    jwt.verify(token, "key", (err, userInfor) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "INSERT INTO comments(`content`, `date`, `postId`, `writer`) VALUES (?)";
        
        const values = [
            req.body.content,
            req.body.date,
            req.body.postId,
            req.body.writer,
        ];

    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Comments has been created.");
    });
});
}

