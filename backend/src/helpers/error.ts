export default class responseError {
    errors: { [key: string]: any };

    constructor() {
        this.errors = {};
        this.errors['error'] = {};
    }

    get allErrors() {
        return JSON.stringify(this.errors.error);
    }

    createNewError({
        errorType,
        errorMessage,
    }: {
        errorType: string;
        errorMessage: string;
    }) {
        if (this.errors.error[errorType]) {
            const nextIndex = this.errors.error.errorType.length;
            this.errors.error.errorType[nextIndex] = errorMessage;
        } else {
            this.errors.error[errorType] = [];
            this.errors.error.errorType[0] = errorMessage;
        }
    }
}
