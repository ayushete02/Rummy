import { useState } from 'react';
import { PrismaClient, User } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export async function getUsers(sortBy: string = ''): Promise<User[]> {
    const users = await prisma.user.findMany({
        orderBy: { total_amount: sortBy === 'asc' ? 'asc' : 'desc' },
    });
    return users;
}
