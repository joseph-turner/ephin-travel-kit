import type { NextAuthOptions } from 'next-auth';

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import prisma from '@/lib/prisma';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, id: token.id ?? user?.id };
    },
    async session({ session, token }) {
      return { ...session, user: { ...session.user, id: token.id } };
    },
  },
  pages: { signIn: '/login' },
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log('Authorizing with credentials:', credentials);
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        console.log('Finding user with email:', credentials.email);
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          console.log('No user found, creating new user');
          return await prisma.user.create({
            data: {
              email: credentials.email,
              name: credentials.name ?? credentials.email,
              password: await bcrypt.hash(credentials.password, 10),
            },
          });
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password!,
        );

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials');
        }

        return user;
      },
      credentials: {
        email: { label: 'Email', type: 'email' },
        name: { label: 'Name', type: 'name' },
        password: { label: 'Password', type: 'password' },
      },
      name: 'credentials',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: 'jwt' },
} satisfies NextAuthOptions;

const handler = NextAuth(authOptions);
const { auth, signIn, signOut } = handler;
export { auth, handler, signIn, signOut };
