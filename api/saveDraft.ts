import { SubmissionForm } from "@/types";

export const saveDraft = (data: SubmissionForm) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, 500);
    })
}