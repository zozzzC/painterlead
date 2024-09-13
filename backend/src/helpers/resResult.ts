import express, { NextFunction } from 'express';

export default function resResultIsError({ result }: { result: any }): boolean {
    if (result != undefined) {
        if (Object.keys(result).length == 0) {
            return responseIsError({ response: result });
        }
        return false;
    }
    return false;
}

function responseIsError({ response }: { response: [] }) {
    try {
        if (response.at(0) === 'error') {
            return true;
        }
        return false;
    } catch (err: any) {
        return err;
    }
}

// export default function resResult({ result }: { result: any }) {
//     return (req: express.Request, res : express.Response, next: NextFunction) {
//         if (result != undefined) {
//             if (Object.keys(result).length == 0 && responseIsError({response: result})) {
//                 return res.send
//             }
//         } {
//             return res.send(200);
//         }
//     }
// }
