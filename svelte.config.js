import adapter from '@sveltejs/adapter-auto'
// import adapter from '@sveltejs/adapter-node'

// https://github.com/sveltejs/svelte-preprocess
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			$db: './src/db'
		}
	}
}

export default config
