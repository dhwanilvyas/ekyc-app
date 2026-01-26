import { mockUser } from "./mockUser";

/**
 * status = 0 => success
 * status = 1 => fail
 */

export const me = async (status = 0) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (status === 0) {
                resolve(mockUser);
            } else if (status === 1) {
                reject("Error fetching user profile");
            }
        }, 1000);
    });
}