export interface Program {
    id: number

    title: string

    description: string

    pricePerStudent: number

    durationMinutes: number

    targetGroup: string

    minGroupSize: number

    maxGroupSize: number

    location: string

    language: string

    status: string

    createdAt: string

    updatedAt: string

    organizationId: number
}