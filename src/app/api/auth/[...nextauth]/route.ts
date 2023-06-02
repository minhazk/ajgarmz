import { prisma } from '@/server/db';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

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
                return await prisma.user.findUnique({ ...credentials });
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/signIn',
    },
});

export { handler as GET, handler as POST };
