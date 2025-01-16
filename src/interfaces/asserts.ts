import { TokenData, VerifiedBaseTokenData } from '@pavelglaz/types'

export interface AssertsContainer {
    isRefreshTokenExists(tokenData: TokenData): asserts tokenData is VerifiedBaseTokenData<TokenData>
    assertObjectHasOnlyOneOf<T extends object>(object: T, ...keys: (keyof T)[]): void | never
}
