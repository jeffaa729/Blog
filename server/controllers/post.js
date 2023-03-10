import { db } from "../database.js";
import jwt from "jsonwebtoken";

export const getAllPost = (req,res) =>{
    const q = req.query.cat ? 
    "SELECT p.id, u.img as userImg , `username`, `title`, `descript` , p.img , `cat` , `date`,`likes`, `dislike`  FROM users u JOIN posts p ON u.id = p.uid WHERE `cat` = ?" 
    :
    "SELECT p.id , u.img as userImg , `username`, `title`, `descript` , p.img , `cat` , `date`, `likes`, `dislike` FROM users u JOIN posts p ON u.id = p.uid ORDER BY `date` DESC LIMIT 10" 


    db.query(q,[req.query.cat],(err,data)=>{
        if(err){
            return res.send(err)
        }
        return res.status(200).json(data)
    })
}

export const getHotPost = (req,res) =>{
    const q =  "SELECT p.id , u.img as userImg , `username`, `title`, `descript` , p.img , `cat` , `date`, `likes`, `dislike` FROM users u JOIN posts p ON u.id = p.uid ORDER BY `likes` DESC LIMIT 5" 


    db.query(q,[req.query.cat],(err,data)=>{
        if(err){
            return res.send(err)
        }
        return res.status(200).json(data)
    })
}

export const getPost = (req,res) =>{

    const q = "SELECT p.id , `username`, `title`, `descript` , p.img , `cat` , `date` ,`likes`,`dislike`, u.img as userImg FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?"
    db.query(q, [req.params.id], (err,data)=>{
        if(err){
            return res.send(err)
        }
        return res.status(200).json(data[0])
    })
}


export const addPost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
    
    jwt.verify(token, "key", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "INSERT INTO posts(`title`, `descript`, `img`, `cat`, `date`,`uid`) VALUES (?)";
        
        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
            req.body.date,
            userInfo.id,
        ];

    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Post has been created.");
    });
});
};


export const delPost = (req,res) =>{
    const token = req.cookies.access_token
    if(!token){
        return res.status(401).json("Not authenticated")
    }
    
    jwt.verify(token, "key", (err,userInfo)=>{
        if (err){
            return res.status(403).json('invalid token')
        }
        const postId = req.params.id
        const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?"
        db.query(q,[postId,userInfo.id],(err,data)=>{
            if (err){
                return res.status(403).json("cant delete post")
            }
            return res.status(200).json("post deleted")
        })
        
    })
}
export const updatePost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
    
    jwt.verify(token, "key", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        
        const postId = req.params.id;
        const q =
        "UPDATE posts SET `title`=?,`descript`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";
        
        const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];
        
        db.query(q, [...values, postId, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json("Post has been updated.");
        });
    });
};
