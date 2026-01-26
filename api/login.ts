import { mockUser } from "./mockUser";

export const login = async (email: string, password: string) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === "john.doe@example.com" && password === "password") {
                resolve(mockUser);
            } else {
                reject(new Error("Invalid credentials"));
            }
        }, 1000);
    });
}