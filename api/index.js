import Fastify from 'fastify'

const app = Fastify({
    logger: false,
    disableRequestLogging: true,
})

app.post('/api/webhook', async (req, reply) => {
    const {body} = req
    console.log(`Received webhook: ${JSON.stringify(body, null, 2)}`)
    reply.code(200).send({message: 'Webhook received'})
})

export default async function handler(req, reply) {
    await app.ready()
    app.server.emit('request', req, reply)
}