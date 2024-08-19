export default function resResult({ result }: { result: any }): boolean {
    if (result != undefined) {
        if (Object.keys(result).length == 0) {
            return true;
        }
    }
    return false;
}
