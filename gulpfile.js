const watchify = require('watchify')
const browserify = require('browserify')
const envify = require('envify/custom')
const gulp = require('gulp')
const gutil = require('gulp-util')
const watch = require('gulp-watch')
const sourcemaps = require('gulp-sourcemaps')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const assign = require('lodash.assign')

const browserPlatforms = [
    'firefox',
    'chrome',
]
const commonPlatforms = [
    // browser extensions
    ...browserPlatforms,
]

// copy universal

const copyTaskNames = []
const copyDevTaskNames = []

createCopyTasks('locales', {
  source: './app/_locales/',
  destinations: commonPlatforms.map(platform => `./dist/${platform}/_locales`),
})

function createCopyTasks (label, opts) {
if (!opts.devOnly) {
    const copyTaskName = `copy:${label}`
    copyTask(copyTaskName, opts)
    copyTaskNames.push(copyTaskName)
}
const copyDevTaskName = `dev:copy:${label}`
    copyTask(copyDevTaskName, Object.assign({ devMode: true }, opts))
    copyDevTaskNames.push(copyDevTaskName)
}

function copyTask (taskName, opts) {
    const source = opts.source
    const destination = opts.destination
    const destinations = opts.destinations || [destination]
    const pattern = opts.pattern || '/**/*'
    const devMode = opts.devMode

    return gulp.task(taskName, function () {
        if (devMode) {
        watch(source + pattern, (event) => {
            livereload.changed(event.path)
            performCopy()
        })
    }

    return performCopy()
})

function performCopy () {
    // stream from source
    let stream = gulp.src(source + pattern, { base: source })

    // copy to destinations
    destinations.forEach(function (destination) {
    stream = stream.pipe(gulp.dest(destination))
    })

    return stream
}
}

// build js
const buildJsFiles = [
    'inpage',
    'contentscript'
]

// bundle tasks
createTasksForBuildJsExtension({ buildJsFiles, taskPrefix: 'dev:extension:js', devMode: true })

function createTasksForBuildJsExtension ({ buildJsFiles, taskPrefix, devMode, testing, bundleTaskOpts = {} }) {
    // inpage must be built before all other scripts:
    const rootDir = './app/scripts'
    const nonInpageFiles = buildJsFiles.filter(file => file !== 'inpage')
    const buildPhase1 = ['inpage']
    const buildPhase2 = nonInpageFiles
    const destinations = browserPlatforms.map(platform => `./dist/${platform}`)
    bundleTaskOpts = Object.assign({
      buildSourceMaps: true,
      sourceMapDir: '../sourcemaps',
      minifyBuild: !devMode,
      buildWithFullPaths: devMode,
      watch: devMode,
      devMode,
      testing,
    }, bundleTaskOpts)
    createTasksForBuildJs({ rootDir, taskPrefix, bundleTaskOpts, destinations, buildPhase1, buildPhase2 })
}

function createTasksForBuildJs ({ rootDir, taskPrefix, bundleTaskOpts, destinations, buildPhase1 = [], buildPhase2 = [] }) {
    // bundle task for each file
    const jsFiles = [].concat(buildPhase1, buildPhase2)
    jsFiles.forEach((jsFile) => {
      gulp.task(`${taskPrefix}:${jsFile}`, bundleTask(Object.assign({
        label: jsFile,
        filename: `${jsFile}.js`,
        filepath: `${rootDir}/${jsFile}.js`,
        externalDependencies: bundleTaskOpts.devMode ? undefined : externalDependenciesMap[jsFile],
        destinations,
      }, bundleTaskOpts)))
    })
    // compose into larger task
    const subtasks = []
    subtasks.push(gulp.parallel(buildPhase1.map(file => `${taskPrefix}:${file}`)))
    if (buildPhase2.length) subtasks.push(gulp.parallel(buildPhase2.map(file => `${taskPrefix}:${file}`)))
  
    gulp.task(taskPrefix, gulp.series(subtasks))
}

// task generators
function generateBundler (opts, performBundle) {
    const browserifyOpts = assign({}, watchify.args, {
      plugin: [],
      transform: [],
      debug: opts.buildSourceMaps,
      fullPaths: opts.buildWithFullPaths,
    })
  
    const bundleName = opts.filename.split('.')[0]
  
    // activate sesify
    const activateAutoConfig = Boolean(process.env.SESIFY_AUTOGEN)
    // const activateSesify = activateAutoConfig
    const activateSesify = activateAutoConfig && ['background'].includes(bundleName)
    if (activateSesify) {
      configureBundleForSesify({ browserifyOpts, bundleName })
    }
  
    if (!activateSesify) {
      browserifyOpts.plugin.push('browserify-derequire')
    }
  
    if (!opts.buildLib) {
      if (opts.devMode && opts.filename === 'ui.js') {
        browserifyOpts['entries'] = ['./development/require-react-devtools.js', opts.filepath]
      } else {
        browserifyOpts['entries'] = [opts.filepath]
      }
    }
  
    let bundler = browserify(browserifyOpts)
      .transform('babelify')
      // Transpile any dependencies using the object spread/rest operator
      // because it is incompatible with `esprima`, which is used by `envify`
      // See https://github.com/jquery/esprima/issues/1927
      .transform('babelify', {
        only: [
          './**/node_modules/libp2p',
        ],
        global: true,
        plugins: ['@babel/plugin-proposal-object-rest-spread'],
      })
      .transform('brfs')
  
    if (opts.buildLib) {
      bundler = bundler.require(opts.dependenciesToBundle)
    }
  
    if (opts.externalDependencies) {
      bundler = bundler.external(opts.externalDependencies)
    }
  
    // Inject variables into bundle
    bundler.transform(envify({
      METAMASK_DEBUG: opts.devMode,
      NODE_ENV: opts.devMode ? 'development' : 'production',
      IN_TEST: opts.testing,
      PUBNUB_SUB_KEY: process.env.PUBNUB_SUB_KEY || '',
      PUBNUB_PUB_KEY: process.env.PUBNUB_PUB_KEY || '',
    }), {
      global: true,
    })
  
    if (opts.watch) {
      bundler = watchify(bundler)
      // on any file update, re-runs the bundler
      bundler.on('update', async (ids) => {
        const stream = performBundle()
        await endOfStream(stream)
        livereload.changed(`${ids}`)
      })
    }
  
    return bundler
}

function bundleTask (opts) {
    let bundler
  
    return performBundle
  
    function performBundle () {
      // initialize bundler if not available yet
      // dont create bundler until task is actually run
      if (!bundler) {
        bundler = generateBundler(opts, performBundle)
        // output build logs to terminal
        bundler.on('log', gutil.log)
      }
  
      let buildStream = bundler.bundle()
  
      // handle errors
      buildStream.on('error', (err) => {
        beep()
        if (opts.watch) {
          console.warn(err.stack)
        } else {
          throw err
        }
      })
  
      // process bundles
      buildStream = buildStream
        // convert bundle stream to gulp vinyl stream
        .pipe(source(opts.filename))
        // buffer file contents (?)
        .pipe(buffer())
  
      // Initialize Source Maps
      if (opts.buildSourceMaps) {
        buildStream = buildStream
          // loads map from browserify file
          .pipe(sourcemaps.init({ loadMaps: true }))
      }
  
      // Minification
      if (opts.minifyBuild) {
        buildStream = buildStream
          .pipe(terser({
            mangle: {
              reserved: [ 'MetamaskInpageProvider' ],
            },
          }))
      }
  
      // Finalize Source Maps
      if (opts.buildSourceMaps) {
        if (opts.devMode) {
          // Use inline source maps for development due to Chrome DevTools bug
          // https://bugs.chromium.org/p/chromium/issues/detail?id=931675
          buildStream = buildStream
            .pipe(sourcemaps.write())
        } else {
          buildStream = buildStream
            .pipe(sourcemaps.write(opts.sourceMapDir))
        }
      }
  
      // write completed bundles
      opts.destinations.forEach((dest) => {
        buildStream = buildStream.pipe(gulp.dest(dest))
      })
  
      return buildStream
  
    }
}

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
      'dev:extension:js',
      'dev:copy'
    )
  )
)

function beep () {
    process.stdout.write('\x07')
}