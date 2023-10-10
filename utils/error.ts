export type ActionError = {
    error: string,
    data?: object
}

export const getActionError = (error: unknown): ActionError => {
    let actionError: ActionError = {
        error: 'Something went wrong'
    }

    if (error instanceof ActionFormValidationError) {
        actionError.error = error.message
        actionError.data = error.data
    } else if (error instanceof Error) {
        actionError.error = error.message
    } else if (error && typeof error === 'object' && 'message' in error) {
        actionError.error = String(error.message)
    } else if (typeof error === 'string') {
        actionError.error = error
    }

    return actionError
}

export class ActionFormValidationError extends Error {
    data: object;

    constructor(message: string, errors: object) {
        super(message)

        this.data = {
            errors: errors
        }
    }
}