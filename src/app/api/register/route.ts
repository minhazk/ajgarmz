import { prisma } from '@/server/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { name, email, password } = await req.json();
    const user = await prisma.user.findUnique({ where: { email } });
    if (user != null) return NextResponse.json({ message: 'User already exists' }, { status: 403 });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });
    return NextResponse.json(newUser);
}
