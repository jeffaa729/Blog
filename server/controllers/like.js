import { db } from "../database.js"
import jwt from "jsonwebtoken";

export const addLikes =(req,res) =>{
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!")
    
    jwt.verify(token, "key", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const q = "INSERT INTO post_likes (`post_id`,`user_id`, `like_or_dislike`) VALUES (?) "
        
        const values = [req.body.postId, req.body.userId, req.body.enum]

        var q2
        if (values[2] === 'like'){
            q2 = "UPDATE posts SET `likes` = likes + 1 WHERE id = ?"
        }else{
            q2 = "UPDATE posts SET `dislike` = dislike + 1 WHERE id = ?"
        } 
        db.query(q2,values[0],(err,data)=>{
            if (err) return res.status(500).json(err)
        })

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.json("Likes and Dislikes has been updated.")
        });
    });
}

export const delLikes =(req,res) =>{
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!")
    
    jwt.verify(token, "key", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!")
        
        const q = "DELETE FROM post_likes WHERE `post_id` = ? and `user_id` = ? " 
        const values = [req.params.id,req.params.uid]
        var q2
        if (req.params.enum === 'like'){
            q2 = "UPDATE posts SET `likes` = likes - 1 WHERE id = ?"
        }else{
            q2 = "UPDATE posts SET `dislike` = dislike - 1 WHERE id = ?"
        } 

        db.query(q2,values[0],(err,data)=>{
            if (err) return res.status(500).json(err)
        })

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json("Likes and Dislikes has been updated.")
        });
    });
}
export const getLikes =(req,res) =>{
        
        const q = "SELECT like_or_dislike FROM post_likes WHERE `post_id` = ? AND `user_id` = ?"
        const values = [req.params.id,req.params.uid]
        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json(data)
        })
    }