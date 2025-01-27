import { DiiaOfficeStatus, EResidentSession, ProfileFeature, UserFeatures, UserSession } from '@pavelglaz/types'

export function profileFeaturesToList(features: UserFeatures): ProfileFeature[] {
    const featuresList = Object.entries(features)
        .filter(([, value]) => value)
        .map(([key]) => key as ProfileFeature)

    return featuresList.filter((feature) => {
        if (feature !== ProfileFeature.office) {
            return true
        }

        return features?.[feature]?.status === DiiaOfficeStatus.ACTIVE
    })
}

export function extractProfileFeatures(session: UserSession | EResidentSession): ProfileFeature[] {
    if (!('features' in session) || !session.features) {
        return []
    }

    return profileFeaturesToList(session.features)
}
