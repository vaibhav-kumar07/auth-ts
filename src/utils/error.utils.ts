export class ValidationError extends Error {
    public details: Record<string, string>;

    constructor(details: Record<string, string>) {
        super("Validation Error");
        this.name = "ValidationError";
        this.details = details;
    }
}

export class BusinessError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "BusinessError";
    }
}

export const throwValidationError = (errors: Record<string, string>): void => {
    if (Object.keys(errors).length > 0) {
        throw new ValidationError(errors);
    }
};

export const throwBusinessError = (condition: boolean, message: string): void => {
    if (condition) {
        throw new BusinessError(message);
    }
};
