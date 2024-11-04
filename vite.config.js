import path from "path"
import { defineConfig } from "vite"
import Vue from "@vitejs/plugin-vue"

export default defineConfig({
    plugins: [Vue()],
    build: {
        lib: {
            name: "virtual-scroll",
            entry: path.resolve(__dirname, 'src/index.js'),
        },
        outDir: "./dist"
    },
    rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: ['vue'],
        output: {
            // Provide global variables to use in the UMD build
            // for externalized deps
            globals: {
                vue: 'Vue'
            }
        }
    }
})
