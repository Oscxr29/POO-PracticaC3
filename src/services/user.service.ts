import { AppDataSource } from "../database/db";
import { User } from "../entities/user.entity";

export class UserService {
    private repo = AppDataSource.getRepository(User);

    async getAll(){
        return await this.repo.find();
    }
    async getById(id:string){
        return await this.repo.findOneBy({id});
    }
    async create(data: any) {
        if (!data.nombre) throw new Error("Nombre requerido")

    const emailRegex = /\S+@\S+\.\S+/
    if (!emailRegex.test(data.email)) {
      throw new Error("Email inválido")
    }

    const user = this.repo.create(data)
    return await this.repo.save(user)
  }

  async update(id: string, data: any) {
    const user = await this.getById(id)
    if (!user) throw new Error("Usuario no encontrado")

    Object.assign(user, data)
    return await this.repo.save(user)
  }

  async delete(id: string) {
    const user = await this.getById(id)
    if (!user) throw new Error("Usuario no encontrado")

    return await this.repo.remove(user)
  }
}
