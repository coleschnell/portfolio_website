import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dsv from '@rollup/plugin-dsv';
import string from 'vite-plugin-string';


export default defineConfig({
	plugins: [sveltekit(), dsv(),string({
		include: "**/*.html" // Include all HTML files
	  })]
});
