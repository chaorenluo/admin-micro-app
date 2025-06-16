// vite-proxy-server.js
import { createServer } from 'vite';

export const startProxy = async() => {
  console.log('Starting proxy server...');
  // 创建自定义Vite服务配置
  const server = await createServer({
    // 基础配置
    configFile: false, // 禁用自动加载配置文件
    root: process.cwd(),

    // 开发服务器配置
    server: {
      port: 8000, // 指定端口

      // 代理配置核心部分
      proxy: {
        '/api': {
          target: 'http://admin.debug.8591.com.tw/api', // 后端服务地址
          changeOrigin: true, // 修改请求头origin
          rewrite: (path) => path.replace(/^\/api/, '/v2/') // 路径重写
        }
      }
    }
  });

  // 启动服务
  await server.listen();
};
