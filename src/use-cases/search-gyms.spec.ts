import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search gym by title', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -27.0747279,
      longitude: -49.4889672,
    })

    await gymsRepository.create({
      title: 'TypeScript Gym',
      description: null,
      phone: null,
      latitude: -27.0747279,
      longitude: -49.4889672,
    })

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -27.0747279,
        longitude: -49.4889672,
      })
    }

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21' }),
      expect.objectContaining({ title: 'JavaScript Gym 22' }),
    ])
  })
})
