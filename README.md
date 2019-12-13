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


gulp-sass
gulp-autoprefixer
gulp-rtlcss
gulp-rename

## ui.js

react-devtools

    "eth-block-tracker": "^4.4.2",
    "eth-contract-metadata": "^1.11.0",
    "eth-ens-namehash": "^2.0.8",
    "eth-json-rpc-errors": "^1.1.0",
    "eth-json-rpc-filters": "^4.1.1",
    "eth-json-rpc-infura": "^4.0.1",
    "eth-json-rpc-middleware": "^4.2.0",
    "eth-keyring-controller": "^5.3.0",
    "eth-ledger-bridge-keyring": "^0.2.0",
    "eth-method-registry": "^1.2.0",
    "eth-phishing-detect": "^1.1.4",
    "eth-query": "^2.1.2",
    "eth-sig-util": "^2.3.0",
    "eth-token-tracker": "^1.1.10",
    "eth-trezor-keyring": "^0.4.0",
    deep-extend
    deep-freeze-strict

    "ethereumjs-abi": "^0.6.4",
    "ethereumjs-tx": "1.3.7",
    "ethereumjs-util": "5.1.0",
    "ethereumjs-wallet": "^0.6.0",
    "etherscan-link": "^1.0.2",

    abortcontroller-polyfill
    remote-redux-devtools

    "@material-ui/core": "1.0.0",
    "@sentry/browser": "^4.1.1",
    "@zxing/library": "^0.8.0",

    detectrtc
    ramda

    pubnub
    qrcode-generator
    copy-to-clipboard
    boron

    luxon
    abi-decoder
    currency-formatter
    textarea-caret
    lodash.debounce
    lodash.shuffle

    metamask-logo
    debounce
    fuse.js
    webrtc-adapter

    jazzicon
    valid-url
    detect-node

    "ethjs-contract": "^0.2.3",
    "ethjs-ens": "^2.0.0",
    "ethjs-query": "^0.3.4",

    c3
    d3

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

pify
end-of-stream
react-tooltip-component
react-select

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


### gulp

#### css

```js
// high level tasks
gulp.task('dev:extension',
  gulp.series(
    'dev:scss',
    gulp.parallel(
      'dev:extension:js',
      'dev:copy'
    )
  )
)
```

將scss輸出到 css/output
```js
// scss compilation and autoprefixing tasks
gulp.task('dev:scss', createScssBuildTask({
  src: 'ui/app/css/index.scss',
  dest: 'ui/app/css/output',
  devMode: true,
  pattern: 'ui/app/**/*.scss',
}))
```

dev:copy 再將輸出的css 複製到專案輸出
```js
createCopyTasks('css', {
  source: './ui/app/css/output/',
  destinations: commonPlatforms.map(platform => `./dist/${platform}`),
})
```

** temp hidden **
\ui\app\css\index.scss

note //@import '../../../node_modules/react-select/dist/react-select';

