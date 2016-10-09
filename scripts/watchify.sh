#!/bin/sh

watchify client/js/main.jsx -t [ babelify --presets [ es2015 react ] ] -o client/bundled/bundle.js
