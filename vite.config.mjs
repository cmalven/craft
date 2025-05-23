import { defineConfig, loadEnv } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import viteRestart from 'vite-plugin-restart';
import { vitePluginCraftCms } from 'vite-plugin-craftcms';
import sassGlobImports from 'vite-plugin-sass-glob-import';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/

export default defineConfig(({ command, mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    base: command === 'serve' ? '' : '/dist/',
    publicDir: './src/static',
    server: {
      port: process.env.VITE_DEV_PORT || 3000,
      host: false, // Set to `true` to enable network access
      cors: { origin: 'https://your-project-slug.ddev.site' },
      hmr: {
        host: process.env.VITE_DEV_BASE_ADDRESS, // Necessary only if `https` is true
      },
      https: true,
    },
    build: {
      emptyOutDir: true,
      manifest: true,
      outDir: './web/dist/',
      rollupOptions: {
        input: './src/entry.html',
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
          quietDeps: true,
          silenceDeprecations: ['import', 'mixed-decls'],
        },
      },
    },
    plugins: [
      mkcert(),
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
      sassGlobImports(),
      viteRestart({
        reload: ['./templates/**/*', './modules/**/*'],
      }),
      vitePluginCraftCms({
        outputFile: './templates/_partials/vite.twig',
        devServerBaseAddress: process.env.VITE_DEV_BASE_ADDRESS,
      }),
    ],
  };
});
