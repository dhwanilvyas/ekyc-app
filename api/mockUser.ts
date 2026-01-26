export const mockUser = {
    user: {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
    },
    session: {
        token: "1234567890",
        refreshToken: "1234567890",
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    }
};