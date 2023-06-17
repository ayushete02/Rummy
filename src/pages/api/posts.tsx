import { PrismaClient } from '@prisma/client';
//to check the data (can be deleted )
export default async function handler(req, res) {
    const prisma = new PrismaClient();
    const posts = await prisma.user.findMany();

    console.log(posts);

    await prisma.$disconnect();

    res.status(200).json({ message: 'Table data logged' });
}
