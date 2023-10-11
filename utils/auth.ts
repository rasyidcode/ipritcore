import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import { NextAuthOptions } from 'next-auth'

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        })
    ],
    pages: {
        signIn: '/login',
        error: '/error'
    },
    callbacks: {
        async signIn({ }) {
            return false
        },
    }
} satisfies NextAuthOptions