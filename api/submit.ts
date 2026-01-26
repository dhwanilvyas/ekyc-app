/**
 * 
 * state = 0 => Success
 * state = 1 => Validation error
 * state = 2 => Authentication error
 * state = 3 => Server error
 */

export const submit = async (data: any, state = 0) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 0) {
                resolve({
                    "submissionId": "SUB-123",
                    "status": "RECEIVED"
                });
            } else if (state === 1) {
                reject({
                    submissionId: null,
                    status: "FAILED",
                    errors: [
                        {
                            field: "name",
                            message: "Name is required",
                        },
                    ],
                });
            } else if (state === 2) {
                reject({
                    submissionId: null,
                    status: "FAILED",
                    error: "Authentication failed"
                });
            } else if (state === 3) {
                reject({
                    submissionId: null,
                    status: "FAILED",
                    error: "Something went wrong"
                });
            }
        }, 1000);
    });
}