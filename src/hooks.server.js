import { sequence } from '@sveltejs/kit/hooks'
// import crypto from 'crypto'
import { auth } from '$db/fake_auth'

/** @type {import('@sveltejs/kit').Handle} */
async function logger({ event, resolve }) {
    const start_time = Date.now()
    
    // Espera a resposta, roda outros hooks e carrega...
    const response = await resolve(event)
    console.log(`${Date.now() - start_time}ms ${event.request.method} ${event.url.pathname}`)
    
    return response
}

/** @type {import('@sveltejs/kit').Handle} */
function authorize({ event, resolve }) {
    const user = auth()
    event.locals.user = user
    return resolve(event)
}

export const handle = sequence(logger, authorize)

// // Interceptando fetch
// /** @type {import('@sveltejs/kit').HandleFetch} */
// export function handleFetch({ request, fetch }) {
//     return fetch(request)
// }


// // Interceptando error
// /** @type {import('@sveltejs/kit').HandleServerError} */
// export function handleError({ error, event }) {
//     // logger(error, event)
//     const errorId = crypto.randomUUID()
//     return {
//         message: 'Opa, estou interceptando em um hook',
//         code: `${errorId} - ${error.code}`
//     }
// }