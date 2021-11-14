整体：react脚手架、redux、router、style-components、axios、antd；函数式组件hooks进行开发。

1. 全局安装：yarn、React脚手架；创建基本结构

   ```bash
   npm install -g yarn
   npm install -g create-react-app
   
   create-react-app h-music-web-react
   ```

2. 删除文件中无用代码（暂时用不到）。清空src文件夹中文件、public文件下favicon.ico和index.html之外的文件都删除掉。

3. 引入normalizecss并初始化全局css样式`@import "normalize.css";`

   ```bash
   yarn add normalizecss
   ```

4. react脚手架将webpack相关配置隐藏【除非`yarn eject`，不过不推荐直接修改默认配置】，借助craco自定义配置（后续的antd的默认配置也可以修改，不过需要引入`import 'antd/dist/antd.less';`）

   ```bash
   yarn add @craco/craco
   ```

5. 安装router

   ```bash
   yarn add react-router-dom	//安装router
   yarn add react-router-config	//对路由进行统一管理
   ```

6. 使用css-in-js书写样式代码

   ```bash
   yarn add styled-components
   ```

7. 引入antd和图标，并在全局样式中引入`@import "antd/dist/antd.css";`

   ```
   yarn add antd @ant-design/icons
   ```

8. axios网络请求封装

   ```
   yarn add axios
   ```

9. 引入redux全局状态管理，react hooks和分reducer

   ```
   yarn add redux react-redux redux-thunk
   ```

10. 借助`immutable`有效率保证react的不变性，借助`redux-immutable`帮助store进行reducer合并

    ```
    yarn add immutable redux-immutable
    ```

接下来就是页面开发......
