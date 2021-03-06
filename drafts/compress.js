var UglifyJS = require('uglify-js')
var fs = require('fs')

var result = UglifyJS.minify('../trigfills.js', {
  mangle: true,
  compress: {
    properties:true,
    warnings:true,
    sequences: true,
    dead_code: true,
    conditionals: true,
    booleans: true,
    unused: true,
    if_return: true,
    join_vars: true,
    drop_console: false
  }
});

fs.writeFileSync('../trigfills.min.js', result.code)