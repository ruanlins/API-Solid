import { FastifyInstance } from 'fastify'
import { verfyJWT } from '../../middlewares/verify-jwt'
import { create } from './create'
import { validate } from './validate'
import { metrics } from './metrics'
import { history } from './history'
import { verfiyUserRole } from '@/http/middlewares/verify-user-role'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verfyJWT)

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)

  app.post('/gyms/:gymId/check-ins', create)
  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: [verfiyUserRole('ADMIN')] },
    validate,
  )
}
