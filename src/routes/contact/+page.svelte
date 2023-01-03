<script>
    // import { enhance } from '$app/forms'
    import { applyAction, deserialize } from '$app/forms'
    import { invalidateAll } from '$app/navigation'

    // /** @type {import('./$types').PageData} */
    // export let data

    /** @type {import('./$types').ActionData} */
    export let form
    // $: console.log('form', form)

    // Standard onSubmit event
    /** @param {any} event */
    async function handleForm(event) {
        // this = form element
        // Creating form data
        const data = new FormData(this)
        // Sending our own fetch post request
        const res = await fetch(this.action, {
            method: 'POST',
            body: data
        })

        // Get data by deserializing it
        const result = deserialize(await res.text())

        // See if it was sucessful
        // If successful, reloada all loaded data
        if (result.type === 'success') { 
            // Reloadas all data
            await invalidateAll()
        }

        // Populating form
        // Will redirect if thrown redirect in action
        // Show error page if thrown error
        applyAction(result)
    }

</script>

<!-- Fail -->
{#if form?.error_message}
    <p>{form.error_message}</p>
{/if}

<!-- Success -->
{#if form?.message}
    <p>{form.message}</p>
{:else}
    <!-- <form use:enhance={({ form, data, action, cancel }) => {
        // form     -> form element
        // data     -> FormData object
        // action   -> url form posts to
        // cancel() -> cancels form
        return ({ result, update }) => {
            update()
            // result -> 'ActionResult'
            // update -> runs all of the default use:enhance
        }
    }} 
    action="/contact?/email" 
    method="POST"> -->
    <!-- Se for para o mesmo caminho, pode ser action="?/email"--> 
    <!-- Action = route + ?/ + action_name -->
    <form on:submit|preventDefault={handleForm} action="/contact?/email">
        <label>
            Name: <input type="text" required name="name" id="name" />
        </label>
        <label>
            Email: <input type="email" required name="email" id="email" />
        </label>
        <label>
            Message: <textarea required name="message" id="message" />
        </label>
        <button type="submit">Send Email</button>
    </form>
{/if}

<style>
    form {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
        padding: 1.25rem;
    }

    label {
        display: block;
    }
</style>