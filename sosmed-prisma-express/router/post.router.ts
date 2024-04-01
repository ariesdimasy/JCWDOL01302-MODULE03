import { Router } from "express"
import * as postController from "./../controllers/post.controller"

const router = Router()

router.get("/", postController.getAllPosts)
router.get("/:id", postController.getDetailPost)
router.post("/", postController.createPost)

export default router
