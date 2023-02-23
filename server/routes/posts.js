import express from "express"
import { addPost,getAllPost,getPost,delPost,updatePost } from "../controllers/post.js"

const router = express.Router()

router.get("/",getAllPost)
router.get("/:id",getPost)
router.post("/",addPost)
router.delete("/:id",delPost)
router.put("/:id",updatePost)

export default router