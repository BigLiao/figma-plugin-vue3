const vue = require('@vitejs/plugin-vue');
const path = require('path');
const vite = require('vite');

const rootDir = path.resolve(__dirname, '../');

const MODE = 'prod';


// 环境变量赋值
process.env = { ...process.env, ...vite.loadEnv(MODE, rootDir) };

async function build() {
  await buildMainCode();
  await buildHtml();
}

// 构建 code.js 入口
async function buildMainCode() {
  const config = vite.defineConfig({
    configFile: false, // 关闭默认使用的配置文件
    build: {
      // emptyOutDir: false, // 不要清空 dist 目录
      lib: { // 使用库模式构建
        entry: path.resolve(rootDir, 'src/worker/code.ts'),
        name: 'code',
        formats: ['es'],
        fileName: () => 'code.js',
      },
      sourcemap: false,
    },
  });
  return vite.build(config);
}

// 开启 devServer
async function buildHtml() {
  const config = vite.defineConfig({
    mode: MODE,
    base: process.env.VITE_APP_PUBLIC_PATH,
    configFile: false,
    plugins: [vue()],
    root: rootDir,
    build: {
      emptyOutDir: false, // 不要清空 dist 目录
      rollupOptions: {
        output: {
          entryFileNames: '[name].js', // 不要hash，以实现热更
          assetFileNames: 'assets/[name][extname]',
          chunkFileNames: 'assets/[name].js',
        },
      },
      sourcemap: false,
    },
  });
  await vite.build(config);
}

build();
