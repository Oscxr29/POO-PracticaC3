import { Router } from "express"
import { UserController } from "../controllers/user.controller"

const router = Router()
const controller = new UserController()

router.get("/user", controller.getUsers)
router.get("/user/profile/:id", controller.getProfile)
router.post("/user", controller.createUser)
router.put("/user/:id", controller.updateUser)
router.delete("/user/:id", controller.deleteUser)

export default router