import { withAuth } from "next-auth/middleware";

export default withAuth(
    // function middleware(req: NextRequestWithAuth) {
    //     console.log(req.nextUrl.pathname)
    //     console.log(req.nextauth.token)
    // },
    {
        pages: {
            signIn: '/login',
            error: '/error'
        }
    }
)