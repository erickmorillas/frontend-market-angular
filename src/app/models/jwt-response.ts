export interface JwtResponseI {
    body: {
        data: {
            email: string,
            firstname: string,
            lastname: string,
            username: string,
        },
        token: string,
    }
}
