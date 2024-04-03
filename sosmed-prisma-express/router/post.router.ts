import { Router } from "express"
import * as postController from "./../controllers/post.controller"
import { adminGuard, verifyToken } from "../middleware/auth.middleware"

const router = Router()

router.get("/", postController.getAllPosts)
router.get("/:id", verifyToken, postController.getDetailPost)
router.post("/", verifyToken, adminGuard, postController.createPost)

export default router
