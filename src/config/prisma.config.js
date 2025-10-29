import { PrismaClient } from "../generated/prisma/client.js";


const prisma = new PrismaClient()

// prisma.$queryRaw`SHOW TABLES`.then(rs => console.log(rs))

export default prisma