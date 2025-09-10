import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import string from 'vite-plugin-string';


export default defineConfig({
	plugins: [sveltekit() ,string({
		include: "**/*.html" // Include all HTML files
	  })]
});
