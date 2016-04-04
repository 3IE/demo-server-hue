# Welcome to the server-hue

This repository demonstrates how to control philips hue with node-js and typescript

## Prerequisites
If you are on Windows, don't forget install grunt-cli.

## Important
The socket.io support is based on a develop version of typefx (commit 52dfb61 develop branch). This version isn't yet publish on npm

## Installation
Clone the repository :
```
$ git clone https://github.com/3IE/server-hue.git
$ cd server-hue
$ npm install
$ grunt
$ node .build\app.js
```

To test the server browse these urls :
```
http://localhost:3000/home
http://localhost:3000/api/getResponse
```