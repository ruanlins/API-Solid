import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -27.0747279,
      longitude: -49.4889672,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
