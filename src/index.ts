import express from "express"
import { initializeDatabase } from "./database/db"
import userRoutes from "./routes/user.route"
import categoryRoutes from "./routes/category.route"

const app = express()
app.use(express.json())

async function main() {
  try {
    await initializeDatabase()
    console.log("DB conectada")

    app.use(userRoutes)
    app.use(categoryRoutes)

    app.listen(3000, () => {
      console.log("Servidor corriendo en http://localhost:3000")
    })
  } catch (error) {
    console.log("Error al iniciar la aplicación:", error)
  }
}

main()

