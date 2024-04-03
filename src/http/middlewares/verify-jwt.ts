import { FastifyReply, FastifyRequest } from 'fastify'

export async function verfyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (error) {
    return reply.status(401).send({ message: 'Unauthorized.' })
  }
}
