import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

//elmentPlus按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'



export default defineConfig({
  server: {
    host: 'localhost',
    port: 9999, // 端口
    // proxy: {
    //   '/api': { // 请求接口中要替换的标识
    //     target: 'http://localhost:8080/elm/', // 代理地址
    //     changeOrigin: true, // 是否允许跨域
    //     secure: true,
    //     rewrite: (path) => path.replace(/^\/api/, '') // api标志替换为''
    //   }
    // }
  },
  configureWebpack: {
    externals:{
      AMap: "window.AMap" //注意
    }
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports:['vue','vue-router']
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      //实际路径转换@->  src
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
