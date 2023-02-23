import express from "express"
import {getLikes, addLikes,delLikes } from "../controllers/like.js"

const router = express.Router()

router.get("/:id&:uid",getLikes)
router.post("/",addLikes)
router.delete("/:id&:uid&:enum",delLikes)


export default router