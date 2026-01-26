export const refresh = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                token: "1234567890",
                refreshToken: "1234567890",
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
            });
        }, 1000);
    });
}