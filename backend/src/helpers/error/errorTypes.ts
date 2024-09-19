export class MainTagError extends Error {
    constructor(message: string) {
        super();
        this.message = message;
    }
}

export class FileTypeError extends Error {
    message: string;

    constructor(fileType: string[]) {
        super();
        this.message = `File type must be of types ${fileType.map((file) => file.toString())} only.`;
    }

    getMessage() {
        return this.message;
    }
}

export class IdNotFoundError extends Error {
    message: string;

    constructor(name: string) {
        super();
        this.message = `The ID for ${name} was not found.`;
    }

    getMessage() {
        return this.message;
    }
}

export class GenericNotFound extends Error {
    message: string;

    constructor(name: string) {
        super();
        this.message = `${name} was not found.`;
    }

    getMessage() {
        return this.message;
    }
}

export class UnauthorizedError extends Error {
    constructor() {
        super();
        this.message = `You are not authorized to change this resource..`;
    }

    getMessage() {
        return this.message;
    }
}

export class ExistsError extends Error {
    message: string;

    constructor(value: string) {
        super();
        this.message = `The inputted value for ${value} already exists.`;
    }

    getMessage() {
        return this.message;
    }
}

export class NotFoundForGivenItem extends Error { 
    message: string;

    constructor(name: string, item: string) {
        super();
        this.message = `${name} was not found for the given ${item}.`
    }

    getMessage() {
        return this.message;
    }
}