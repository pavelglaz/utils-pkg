import { describe, expect, it, vi } from 'vitest'

import { ApiError, BadRequestError } from '@pavelglaz/errors'

import { Guards } from '../../src/guards'

describe('Guards', () => {

    describe('apiError', () => {
        it('should return false', () => {
            const error = new Error('error')

            const result = Guards.apiError(error)

            expect(result).toBeFalsy()
        })

        it('should return true for ApiError instance', () => {
            const errorCode = 10001
            const error = new ApiError('errorMessage', errorCode)

            const result = Guards.apiError(error)

            expect(result).toBeTruthy()
        })

        it('should return true when the extended class is checked', () => {
            const error = new BadRequestError('badRequestErrorMessage')

            const result = Guards.apiError(error)

            expect(result).toBeTruthy()
        })
    })

    it('should return true for Error instance', () => {
        const error = new Error('error')

        const result = Guards.isError(error)

        expect(result).toBeTruthy()
    })

    describe('isSettledError', () => {
        it('should return true if settled value is rejected', async () => {
            const [value] = await Promise.allSettled([Promise.reject(new Error('error'))])
            const result = Guards.isSettledError(value)

            expect(result).toBeTruthy()
        })

        it('should return false if settled value is fulfilled', async () => {
            const [value] = await Promise.allSettled([Promise.resolve(10)])
            const result = Guards.isSettledError(value)

            expect(result).toBeFalsy()
        })
    })
})
