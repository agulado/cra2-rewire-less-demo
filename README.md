create-react-app 使用less
===

各种安装
---
#### 全局安装2.0版本create-react-app:
(现在我不太确定这步是不是必须的，本以为将create-react-app升级到@next，react-scripts就会变为@next，但并没有)
```sh
npm install -g create-react-app@next
```

#### 如果没有项目，用create-react-app:
(如已有项目，则略过)
```sh
npx create-react-app my-app
```

#### 升级项目中的react-scripts:
```sh
npm install --save react-scripts@next
```

#### 安装react-app-rewired:
```sh
npm install --save-dev react-app-rewired
```

#### 安装react-app-rewire-less-modules:
```sh
npm install --save-dev react-app-rewire-less-modules
```

代码
---
```javascript
/* /config-overrides.js */
// 用于覆盖默认的webpack配置

const rewireLess = require('react-app-rewire-less-modules');

module.exports = function(config, env) {
	// 此处可以尽情的修改config，比如加loader或plugin，具体请看文档。

	// 进行less处理
    config = rewireLess(config, env);

    return config;
}
```

```diff
  /* package.json */
  // 用react-app-rewired接管scripts

  "scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test --env=jsdom",
+   "test": "react-app-rewired test --env=jsdom"
}
```

```javascript
	/* /src/App.js */

	import React, { Component } from 'react';
	import logo from './logo.svg';
	// import './App.css';
	import './App.less'; // 像引入css一样引入less
	import styleApp from './App.module.less'; // module方式引入less

	class App extends Component {
	  render() {
	    return (
	      <div className="App">
	        <header className={styleApp.AppHeader}> // styleApp.AppHeader 指向 ./App.module.less 中的.AppHeader
	          <img src={logo} className="App-logo" alt="logo" />
	          <h1 className="App-title">Welcome to React</h1>
	        </header>
	        <p className="App-intro">
	          To get started, edit <code>src/App.js</code> and save to reload.
	        </p>
	      </div>
	    );
	  }
	}

	export default App;
```

```css
	// /src/App.less

	.App {
	  text-align: center;
	}

	.App-logo {
	  animation: App-logo-spin infinite 20s linear;
	  height: 80px;
	}

	.App-header {
	  background-color: #222;
	  height: 150px;
	  padding: 20px;
	  color: white;
	}

	.App-title {
	  font-size: 1.5em;
	}

	.App-intro {
	  font-size: large;
	}

	@keyframes App-logo-spin {
	  from { transform: rotate(0deg); }
	  to { transform: rotate(360deg); }
	} 
```

```css
	// /src/App.module.less

	.AppHeader {
	  background-color: #ff0000;
	  height: 150px;
	  padding: 20px;
	  color: #ffff00;
	}
```


