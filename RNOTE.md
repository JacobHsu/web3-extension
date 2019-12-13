# Note

app\scripts\inpage.js

```js
    // Emit networkChanged event on network change
    if ('networkVersion' in state && state.networkVersion !== self.networkVersion) {
      self.networkVersion = state.networkVersion
      self.emit('networkChanged', state.networkVersion)
    }
```


test\e2e\contract-test\contract.js

```js
  ethereum.on('networkChanged', (networkId) => {
    networkDiv.innerHTML = networkId
  })
```


[SyntaxError: 'import' and 'export' may appear only with 'sourceType: module' - Wait what?](https://stackoverflow.com/questions/40029113/syntaxerror-import-and-export-may-appear-only-with-sourcetype-module-w)


babel.config.js


Error: Cannot find module './platforms/extension' from 'C:\research\web3-extension\app\scripts'

copy metamask-extension-7.7.1\app\scripts platforms

@babel/runtime 缺core-js
[Error: Cannot find module '@babel/runtime/core-js/object/keys'](https://www.cnblogs.com/xiao-pengyou/p/11110240.html)
[How to solve Module not found: Can't resolve '@babel/runtime/core-js/map' ](https://stackoverflow.com/questions/56845169/how-to-solve-module-not-found-cant-resolve-babel-runtime-core-js-map-in-mat)

"@babel/runtime": "^7.0.0-beta.46", 舊版runtime才有core-js

because `@babel/runtime": "7.0.0-beta.42` still requires core-js as a dependency, in specific it requires core-js ^2.5.3