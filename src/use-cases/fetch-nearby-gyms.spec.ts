import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -22.5106942,
      longitude: -47.7730355,
    })

    await gymsRepository.create({
      title: 'Distant Gym',
      description: null,
      phone: null,
      latitude: -22.695691,
      longitude: -47.6639191,
    })

    const { gyms } = await sut.execute({
      userLatitude: -22.51024,
      userLongitude: -47.7742159,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
