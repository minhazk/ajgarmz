import { prisma } from '@/server/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, _req) {
                const { email, password } = credentials as { email: string; password: string };
                const user = await prisma.user.findUnique({ where: { email } });
                if (user == null) return null;
                if (!(await bcrypt.compare(password, user.password))) return null;
                return user;
            },
        }),
    ],
    callbacks: {
        session: ({ session, user }) => ({
            ...session,
            user: {
                ...session.user,
                id: user.id,
            },
        }),
    },
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/signIn',
    },
});

export { handler as GET, handler as POST };