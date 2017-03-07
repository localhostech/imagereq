pastecapi
=========

Lightweight Node.js module for the Pastec image recognition API.
Both the opensource and Hosted API are supported.

[![npm](https://img.shields.io/npm/v/pastecapi.svg?maxAge=3600)](https://github.com/fvdm/nodejs-pastecapi/blob/master/CHANGELOG.md)
[![Build Status](https://travis-ci.org/fvdm/nodejs-pastecapi.svg?branch=master)](https://travis-ci.org/fvdm/nodejs-pastecapi)
[![Dependency Status](https://gemnasium.com/badges/github.com/fvdm/nodejs-pastecapi.svg)](https://gemnasium.com/github.com/fvdm/nodejs-pastecapi#runtime-dependencies)
[![Coverage Status](https://coveralls.io/repos/github/fvdm/nodejs-pastecapi/badge.svg?branch=master)](https://coveralls.io/github/fvdm/nodejs-pastecapi?branch=master)

* [Node.js](https://nodejs.org)
* [Pastec](http://pastec.io)
* [API documentation](http://pastec.io/doc#api)


Example
-------

```js
var pastec = require ('pastecapi') ({
  endpoint: 'https://my-pastec-server:4212'
});

// Add image signature to index
pastec.addImage ('./advertising.jpg', console.log);

// Match image against index
pastec.searchIndex ('./logo.jpg', console.log);
```


Installation
------------

`npm install pastecapi`


Configuration
-------------
**( [config] )**

**( [endpoint], [authkey], [timeout] )**


The setup function can take either a config object with settings or arguments.


setting  | type   | required | default                 | description
:--------|:-------|:---------|:------------------------|:-------------------
endpoint | string | no       | `http://localhost:4121` | API endpoint
indexid  | string | no       |                         | Hosted API Index ID
authkey  | string | no       |                         | API auth key, from `--auth-key` flag or Hosted API
timeout  | number | no       | `5000`                  | Wait timeout in ms


```js
// Example 1 - All defaults
var pastec = require ('pastecapi') ();

// Example 2 - Using Hosted API (Pastec.io)
var pastec = require ('pastecapi') ({
  endpoint: 'https://api.pastec.io',
  indexid: 'your index id'
  authkey: 'your authentication key'
});
```


Methods
-------

All methods take a callback function to process the results.

```js
function myCallback (err, data) {
  if (err) {
    console.log (err);
    return;
  }

  console.log (data.image_ids);
}

pastec.searchIndex ('~/image.jpg', myCallback);
```

#### Errors

message                      | description              
:----------------------------|:--------------------------------------------------------
request failed               | Request error occured, see `err.statusCode`, `err.error`
invalid authkey              | Your `authkey` or `indexid` is invalid
endpoint does not allow ping | The API does not accept [.ping](#ping) method


### .addImage
**( image, imageId, callback )**

Upload image to server.


param    | type             | required | description
:--------|:-----------------|:---------|:-----------------------------
image    | buffer or string | yes      | Buffer or local path to image
imageId  | number           | yes      | Index ID for image signature
callback | function         | yes      | Process result


```js
pastec.addImage ('~/image.jpg', 123, console.log);
```


### .deleteImage
**( imageId, callback )**

Remove image signature from index.


param    | type     | required | description
:--------|:---------|:---------|:----------------------------
imageId  | number   | yes      | Index ID for image signature
callback | function | yes      | Process result


```js
pastex.deleteImage (123, console.log);
```


### .searchIndex
**( image, console.log )**

Upload image to server and match its signature against the index.


param    | type             | required | description
:--------|:-----------------|:---------|:-----------------------------
image    | buffer or string | yes      | Buffer or local path to image
callback | function         | yes      | Process result


```js
pastec.searchIndex ('~/image.jpg', console.log);
```


### .loadIndex
**( filepath, callback )**

Load another index from file on the server.


param    | type     | required | description
:--------|:---------|:---------|:---------------------------
filepath | string   | yes      | Path to .dat file on server
callback | function | yes      | Process result


```js
pastec.loadIndex ('/var/lib/pastec/index.dat', console.log);
```


### .writeIndex
**( filepath, callback )**

Write current index to a file on the server.


param    | type     | required | description
:--------|:---------|:---------|:---------------------------
filepath | string   | yes      | Path to .dat file on server
callback | function | yes      | Process result


```js
pastec.writeIndex ('/var/lib/pastec/index.dat', console.log);
```


### .clearIndex
**( callback )**

Clear the current index on the server.


param    | type     | required | description
:--------|:---------|:---------|:--------------
callback | function | yes      | Process result


```js
pastec.clearIndex (console.log);
```


### .ping
**( callback )**

Ping the server to test API access.

**Note:** `.ping` is not available on the Hosted API at `api.pastec.io`.


param    | type     | required | description
:--------|:---------|:---------|:--------------
callback | function | yes      | Process result


```js
pastec.ping (function (err, data) {
  if (err) { return console.log (err); }

  if (data.type === 'PONG') {
    console.log ('Yay it works!');
  } else {
    console.log ('Oh no...');
    console.log (data);
  }
});
```


License
-------

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org>


Author
------

[Franklin van de Meent](https://frankl.in)
