# web3-extension

MetaMask/[metamask-extension](https://github.com/MetaMask/metamask-extension)
[releases](https://github.com/MetaMask/metamask-extension/releases)

## usage

`$ yarn start`

## gulp

[Quick Start](https://gulpjs.com/docs/en/getting-started/quick-start)

## dev:extension

```js
// manifest tinkering
gulp.task('dev:copy',
  gulp.series(
    gulp.parallel(...copyDevTaskNames),
  )
)

// high level tasks
gulp.task('dev:extension',
  gulp.series(
    gulp.parallel(
      //'dev:extension:js',
      'dev:copy'
    )
  )
)
```

## dev:copy

`$ npm install --save-dev gulp gulp-watch`

## build js

`$ npm install --save-dev lodash.assign`
watchify
browserify
envify
gulp-util
vinyl-source-stream
vinyl-buffer
gulp-sourcemaps
babelify
brfs
gulp-livereload

babel-eslint

#### debug
gulp-livereload 5.0\Bin\MSBuild.exe


### dependencies

npm install browserify-derequire
loglevel
metamask-inpage-provider
post-message-stream
npm i web3 web3-stream-provider
@babel/runtime

`npm i ethjs`  會幫裝　core-js@2.6.11　提供　web3　使用

#### contentscript.js

npm i dnode 
npm i extensionizer
extension-port-stream

### more

core-js

> Error: Cannot find module 'core-js/modules/es6.function.name' from 'C:\research\web3-extension\node_modules\web3\dist'

closed: `npm i ethjs`

npm WARN deprecated core-js@2.6.11: core-js@<3 is no longer maintained and not recommended
for usage due to the number of issues. Please, upgrade your dependencies to the actual version of core-js@3.
