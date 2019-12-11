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
