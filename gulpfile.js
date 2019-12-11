const gulp = require('gulp')
const watch = require('gulp-watch')

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