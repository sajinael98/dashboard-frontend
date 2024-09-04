import { axiosInstance } from "@refinedev/simple-rest";
import CredentialsProvider from "next-auth/providers/credentials";

export const credentialsProvider = CredentialsProvider({
    id: 'credentials',
    credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
        const response = await axiosInstance.post("http://localhost:8080/sys-auth/login", {
            username: credentials?.username,
            password: credentials?.password
        })
        return { ...response.data };
    },
})