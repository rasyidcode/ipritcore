export type ActionResult = {
    success: boolean | null,
    message?: string | null,
    error?: string,
    errors?: Record<string, string[] | undefined>
}

export const getActionError = (error: unknown): ActionResult => {
    let actionError: ActionResult = {
        success: false,
        error: 'Something went wrong'
    }

    if (error instanceof ActionFormValidationError) {
        actionError.error = error.message
        actionError.errors = error.errors
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
    errors: Record<string, string[] | undefined>;

    constructor(message: string, errors: Record<string, string[] | undefined>) {
        super(message)

        this.errors = errors
    }
}
