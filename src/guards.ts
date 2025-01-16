import { ApiError } from '@pavelglaz/errors'

export const Guards = {
    isError(value: unknown): value is Error {
        return value instanceof Error
    },

    apiError(err: Error): err is ApiError {
        return err instanceof ApiError
    },

    isSettledError(value: PromiseSettledResult<unknown>): value is PromiseRejectedResult {
        return value.status === 'rejected'
    },
}
