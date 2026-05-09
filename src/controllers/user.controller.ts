import { Request, Response } from "express"
import { UserService } from "../services/user.service"

const service = new UserService()

export class UserController {
  async getUsers(req: Request, res: Response) {
    const data = await service.getAll()
    res.json({ status: 200, data })
  }

  async getProfile(req: Request, res: Response) {
    const data = await service.getById(req.params.id as string)
    res.json({ status: 200, data })
  }

  async createUser(req: Request, res: Response) {
    try {
      const data = await service.create(req.body)
      res.json({ status: 200, data })
    } catch (error: any) {
      res.status(400).json({ message: error.message })
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const data = await service.update(req.params.id as string, req.body)
      res.json({ status: 200, data })
    } catch (error: any) {
      res.status(400).json({ message: error.message })
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      await service.delete(req.params.id as string)
      res.json({ status: 200, message: "Eliminado" })
    } catch (error: any) {
      res.status(400).json({ message: error.message })
    }
  }
}