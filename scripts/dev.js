const { JSDOM } = require('jsdom');
const fs = require('fs');
const vue = require('@vitejs/plugin-vue');
const path = require('path');
const vite = require('vite');
const axios = require('axios');

const rootDir = path.resolve(__dirname, '../');

const HOST = '127.0.0.1';
const PORT = 3100;
const MODE = 'dev';

// 环境变量赋值
process.env = { ...process.env, ...vite.loadEnv(MODE, rootDir) };

async function dev() {
  await buildMainCode();
  await startDevServer();
  await genIndexHtml();
}

// 生成 html 文件
async function genIndexHtml() {
  const targetHTMLPath = path.resolve(rootDir, 'dist/index.html');
  const htmlContent = await getHTMLfromDevServer();
  const dom = new JSDOM(htmlContent);
  const {
    document,
  } = dom.window;

  const base = document.createElement('base');
  base.setAttribute('href', `http://${HOST}:${PORT}/`);
  dom.window.document.head.insertBefore(base, document.head.firstChild);

  const result = dom.serialize();
  fs.writeFileSync(targetHTMLPath, result);
}

// 构建 code.js 入口
async function buildMainCode() {
  const config = vite.defineConfig({
    configFile: false, // 关闭默认使用的配置文件
    build: {
      emptyOutDir: false, // 不要清空 dist 目录
      lib: { // 使用库模式构建
        entry: path.resolve(rootDir, 'src/worker/code.ts'),
        name: 'code',
        formats: ['es'],
        fileName: () => 'code.js',
      },
      sourcemap: 'inline',
      watch: {},
    },
  });
  return vite.build(config);
}

// 开启 devServer
async function startDevServer() {
  const config = vite.defineConfig({
    mode: 'dev',
    configFile: false,
    plugins: [vue()],
    root: rootDir,
    server: {
      hmr: {
        host: HOST, // 必须加上这个，否则 HMR 会报错
      },
      port: PORT,
    },
  });
  const server = await vite.createServer(config);
  await server.listen();

  server.printUrls();
}

// 通过请求 devServer 获取HTML
async function getHTMLfromDevServer() {
  const rsp = await axios.get(`http://${HOST}:${PORT}/index.html`);
  return rsp.data;
}

dev();
