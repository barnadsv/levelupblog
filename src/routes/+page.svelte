<script>
    import { navigating, page, updated, getStores } from '$app/stores'
    import Teste from '$lib/Teste.svelte'
    import '$db/start'
    /** @type {import('./$types').PageData} */
    export let data

    // $: console.log('$navigating', $navigating)
    // $: console.log('$page', $page)

    $: ({ latest_episode } = data)
</script>

<h3>{latest_episode.title}</h3>


<Teste />