import { FastifyInstance } from 'fastify'
import { verfyJWT } from '../../middlewares/verify-jwt'
import { search } from './search'
import { nearby } from './nearby'
import { create } from './create'
import { verfiyUserRole } from '@/http/middlewares/verify-user-role'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verfyJWT)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)

  app.post('/gyms', { onRequest: [verfiyUserRole('ADMIN')] }, create)
}
