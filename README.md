# Vue 3 开发 Figma 插件模板

## 介绍

## 启动

```
npm install
npm run dev
```

Figma桌面APP，画布任意地方右键打开菜单，`Plugins`->`Development`->`Import plugin from manifest...`，选择前面创建的`manifest.json`文件路径，即可成功导入插件。

然后通过右键，`Plugins`->`Development`->(插件名)，就可以打开插件。



## 构建
```
npm run build
```

本地构建完需要执行`npm run preview`启动静态资源服务器，才能使用插件。

## 插件通信

Figma 插件分为两个部分：UI 层 与 Plugin 层。UI 层运行在`iframe`中，拥有浏览器API；Plugin 运行在 JS 沙箱中，没有浏览器 API，但是可以访问 [`figma` API](https://www.figma.com/plugin-docs/api/api-reference/)。两者只能用`postMessage`通信。

项目使用 [rpct](https://github.com/Morglod/rpct-js) 进行封装，简化调用。参考了 https://github.com/Morglod/figma-vue-boilerplate

