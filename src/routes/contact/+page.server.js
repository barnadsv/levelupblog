import { fail } from '@sveltejs/kit'

// /** @type {import('./$types').PageServerLoad} */
// export async function load() {
//     return {}
// }

/** @type {import('./$types').Actions} */
export const actions = {
    // Usar apenas default action ou usar várias named actions...
    // default: async ({ locals, request }) => {
    email: async ({ locals, request }) => {
            if (!locals?.user?.roles?.includes('admin')) {
            return fail(401, {
                error_message: 'Un-Authorized'
            })
        }

        const data = await request.formData()
        const name = data.get('name')
        const email = data.get('email')
        const message = data.get('message')
        console.log(name, email, message)
        return {
            message: 'Email Sent!'
        }
    },
    test: () => {
        console.log('hit test action')
    }
}