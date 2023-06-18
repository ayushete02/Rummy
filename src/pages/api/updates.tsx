import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { walletAddress, isWin } = req.body;
            console.log("wallet address", walletAddress, "iswin is :", isWin);
            // Check if the user exists based on the wallet address
            const user = await prisma.user.findUnique({ where: { address: walletAddress } });
            console.log("wallet address from db", user);

            if (user) {
                // User found, proceed with updating the user data
                if (isWin) {
                    await prisma.user.update({
                        where: { id: user.id }, // Update based on the user's ID
                        data: {
                            game_win: (user.game_win || 0) + 1,
                            total_amount: new Prisma.Decimal((user.total_amount || 0)).plus(100.00),
                        },
                    });
                } else {
                    await prisma.user.update({
                        where: { id: user.id }, // Update based on the user's ID
                        data: {
                            game_loss: (user.game_loss || 0) + 1,
                            total_amount: new Prisma.Decimal((user.total_amount || 0)).minus(10.00),
                        },
                    });
                }

                res.status(200).json({ message: 'User data updated successfully.' });
            } else {
                res.status(404).json({ error: 'User not found.' });
            }
        } catch (error) {
            console.error('Error updating user data:', error);
            res.status(500).json({ error: 'Internal server error.' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed.' });
    }
}
