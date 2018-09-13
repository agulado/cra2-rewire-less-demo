create-react-app 使用自配置文件和less-modules
===

Installation
---
##### `Step 1` 全局安装2.0版本[create-react-app](https://github.com/facebook/create-react-app):
(现在我不太确定这步是不是必须的，本以为将create-react-app升级到@next，react-scripts就会变为@next，但并没有)
```sh
npm install -g create-react-app@next
```

##### `Step 2` 如果没有项目，用create-react-app创建项目并进入:
(如已有项目，则略过)
```sh
create-react-app my-app && cd my-app
```

##### `Step 3` 升级项目中的react-scripts:
```sh
npm install --save react-scripts@next
```

#####  `Step 4` 安装[react-app-rewired](https://github.com/timarney/react-app-rewired):
```sh
npm install --save-dev react-app-rewired
```

##### `Step 5` 安装[react-app-rewire-less-modules](https://github.com/andriijas/react-app-rewire-less-modules):
```sh
npm install --save-dev react-app-rewire-less-modules less
```

##### `Step 6` 安装[ideal-rewires](https://github.com/harrysolovay/ideal-rewires):
```sh
npm install --save-dev ideal-rewires
```

Usage
---
```javascript
/* /config-overrides.js */
const idealRewires = require('ideal-rewires');
const rewireLess = require('react-app-rewire-less-modules');

const {
    webpack: idealRewires_webpack
} = idealRewires({
    babelrc: false,
    eslintrc: true,
    stylelintrc: false
});

module.exports = {
    webpack: function(config, env) {
        config = idealRewires_webpack(config, env);

        config = rewireLess(config, env);

        return config;
    }
};
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
	/* /src/App.less */

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
	/* /src/App.module.less */

	.AppHeader {
	  background-color: #ff0000;
	  height: 150px;
	  padding: 20px;
	  color: #ffff00;
	}
```

Demo
---
[Demo](https://github.com/agulado/cra2-rewire-less-demo/tree/master/demo)
不用再走创建项目的流程，npm install后可以直接看效果。
如想从第一步开始体验完整流程，可以自己尝试在一个空的文件夹，从Step1开始。


