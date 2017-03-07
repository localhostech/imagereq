/*
Name:           pastecapi - test.js
Author:         Franklin van de Meent (https://frankl.in)
Source & docs:  https://github.com/fvdm/nodejs-pastecapi
Feedback:       https://github.com/fvdm/nodejs-pastecapi/issues
License:        Unlicense (Public Domain, see LICENSE file)
                (https://github.com/fvdm/nodejs-pastecapi/raw/develop/LICENSE)
*/


var fs = require ('fs');
var dotest = require ('dotest');
var app = require ('./');
var path = require ('path');
var dir = path.dirname (module.filename);

var opensource = {
  endpoint: process.env.OPENSOURCE_ENDPOINT || 'http://localhost:4212',
  indexid: process.env.OPENSOURCE_INDEXID || null,
  authkey: process.env.OPENSOURCE_AUTHKEY || null,
  timeout: process.env.OPENSOURCE_TIMEOUT || 5000
};

var hosted = {
  endpoint: process.env.HOSTED_ENDPOINT || 'https://api.pastec.io',
  indexid: process.env.HOSTED_INDEXID || null,
  authkey: process.env.HOSTED_AUTHKEY || null,
  timeout: process.env.HOSTED_TIMEOUT || 5000
};

var pastec = app (opensource);


// Tests
dotest.add ('Module', function (test) {
  test ()
    .isFunction ('fail', 'exports', app)
    .isObject ('fail', 'module', pastec)
    .isObject ('fail', '.config', pastec && pastec.config)
    .isFunction ('fail', '.ping', pastec && pastec.ping)
    .isFunction ('fail', '.writeIndex', pastec && pastec.writeIndex)
    .isFunction ('fail', '.clearIndex', pastec && pastec.clearIndex)
    .isFunction ('fail', '.loadIndex', pastec && pastec.loadIndex)
    .isFunction ('fail', '.searchIndex', pastec && pastec.searchIndex)
    .isFunction ('fail', '.addImage', pastec && pastec.addImage)
    .isFunction ('fail', '.deleteImage', pastec && pastec.deleteImage)
    .done ();
});


/**
 * Opensource API
 */

dotest.add ('Opensource API - Method ping', function (test) {
  pastec.ping (function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .isExactly ('warn', 'data.type', data && data.type, 'PONG')
      .done ();
  });
});

dotest.add ('Opensource API - Method writeIndex', function (test) {
  pastec.writeIndex ('./sampleIndex.dat', function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .isExactly ('warn', 'data.type', data && data.type, 'INDEX_WRITTEN')
      .done ();
  });
});

dotest.add ('Opensource API - Method clearIndex', function (test) {
  pastec.clearIndex (function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .isExactly ('warn', 'data.type', data && data.type, 'INDEX_CLEARED')
      .done ();
  });
});

dotest.add ('Opensource API - Method loadIndex', function (test) {
  pastec.loadIndex ('./sampleIndex.dat', function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .isExactly ('warn', 'data.type', data && data.type, 'INDEX_LOADED')
      .done ();
  });
});

dotest.add ('Opensource API - Method addImage - filename', function (test) {
  pastec.addImage (path.join (dir, 'imageSample.jpg'), 999999999999999, function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .isExactly ('warn', 'data.type', data && data.type, 'IMAGE_ADDED')
      .done ();
  });
});

dotest.add ('Opensource API - Method addImage - buffer', function (test) {
  fs.readFile (path.join (dir, 'imageSample.jpg'), function (errFile, file) {
    test (errFile);

    pastec.addImage (file, 999999999999999, function (err, data) {
      test (err)
        .isObject ('fail', 'data', data)
        .isExactly ('warn', 'data.type', data && data.type, 'IMAGE_ADDED')
        .done ();
    });
  });
});

dotest.add ('Opensource API - Method addImage - error', function (test) {
  pastec.addImage ('', 999999999999999, function (err, data) {
    test ()
      .isError ('fail', 'err', err)
      .info (err.message)
      .isUndefined ('fail', 'data', data)
      .done ();
  });
});

dotest.add ('Opensource API - Method searchIndex - filename', function (test) {
  pastec.searchIndex (path.join (dir, 'imageSample.jpg'), function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .isExactly ('warn', 'data.type', data && data.type, 'SEARCH_RESULTS')
      .done ();
  });
});


dotest.add ('Opensource API - Method searchIndex - buffer', function (test) {
  fs.readFile (path.join (dir, 'imageSample.jpg'), function (errFile, file) {
    test (errFile);

    pastec.searchIndex (file, function (err, data) {
      test (err)
        .isObject ('fail', 'data', data)
        .isExactly ('warn', 'data.type', data && data.type, 'SEARCH_RESULTS')
        .done ();
    });
  });
});

dotest.add ('Opensource API - Method searchIndex - error', function (test) {
  pastec.searchIndex ('', function (err, data) {
    test ()
      .isError ('fail', 'err', err)
      .info (err.message)
      .isUndefined ('fail', 'data', data)
      .done ();
  });
});

dotest.add ('Opensource API - Method deleteImage', function (test) {
  pastec.deleteImage (999999999999999, function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .isExactly ('warn', 'data.type', data && data.type, 'IMAGE_REMOVED')
      .done ();
  });
});

dotest.add ('Opensource API - Error: invalid authkey', function (test) {
  var tmp = app ({
    endpoint: opensource.endpoint,
    indexid: opensource.indexid,
    authkey: '-',
    timeout: opensource.timeout
  });

  tmp.writeIndex ('./sampleIndex.dat', function (err, data) {
    test ()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'invalid authkey')
      .isExactly ('warn', 'err.error', err && err.error, 'AUTHENTIFICATION_ERROR')
      .isUndefined ('fail', 'data', data)
      .done ();
  });
});

dotest.add ('Opensource API - Error: request failed', function (test) {
  var tmp = app ({
    endpoint: opensource.endpoint,
    indexid: opensource.indexid,
    authkey: opensource.authkey,
    timeout: 1
  });

  tmp.writeIndex ('./sampleIndex.dat', function (err, data) {
    test ()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'request failed')
      .isError ('fail', 'err.error', err && err.error)
      .isExactly ('fail', 'err.error.code', err && err.error && err.error.code, 'TIMEOUT')
      .isUndefined ('fail', 'data', data)
      .done ();
  });
});


/**
 * Hosted API
 */

dotest.add ('Hosted API - Method ping', function (test) {
  pastec = app (hosted);

  pastec.ping (function (err, data) {
    test ()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'endpoint does not allow ping')
      .isUndefined ('fail', 'data', data)
      .done ();
  });
});

dotest.add ('Hosted API - Method writeIndex', function (test) {
  pastec.writeIndex ('./sampleIndex.dat', function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .isExactly ('warn', 'data.type', data && data.type, 'INDEX_WRITTEN')
      .done ();
  });
});

dotest.add ('Hosted API - Method clearIndex', function (test) {
  pastec.clearIndex (function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .isExactly ('warn', 'data.type', data && data.type, 'INDEX_CLEARED')
      .done ();
  });
});

dotest.add ('Hosted API - Method loadIndex', function (test) {
  pastec.loadIndex ('./sampleIndex.dat', function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .isExactly ('warn', 'data.type', data && data.type, 'INDEX_LOADED')
      .done ();
  });
});

dotest.add ('Hosted API - Method addImage - filename', function (test) {
  pastec.addImage (path.join (dir, 'imageSample.jpg'), 999999999999999, function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .isExactly ('warn', 'data.type', data && data.type, 'IMAGE_ADDED')
      .done ();
  });
});

dotest.add ('Hosted API - Method addImage - buffer', function (test) {
  fs.readFile (path.join (dir, 'imageSample.jpg'), function (errFile, file) {
    test (errFile);

    pastec.addImage (file, 999999999999999, function (err, data) {
      test (err)
        .isObject ('fail', 'data', data)
        .isExactly ('warn', 'data.type', data && data.type, 'IMAGE_ADDED')
        .done ();
    });
  });
});

dotest.add ('Hosted API - Method addImage - error', function (test) {
  pastec.addImage ('', 999999999999999, function (err, data) {
    test ()
      .isError ('fail', 'err', err)
      .info (err.message)
      .isUndefined ('fail', 'data', data)
      .done ();
  });
});

dotest.add ('Hosted API - Method searchIndex - filename', function (test) {
  pastec.searchIndex (path.join (dir, 'imageSample.jpg'), function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .isExactly ('warn', 'data.type', data && data.type, 'SEARCH_RESULTS')
      .done ();
  });
});


dotest.add ('Hosted API - Method searchIndex - buffer', function (test) {
  fs.readFile (path.join (dir, 'imageSample.jpg'), function (errFile, file) {
    test (errFile);

    pastec.searchIndex (file, function (err, data) {
      test (err)
        .isObject ('fail', 'data', data)
        .isExactly ('warn', 'data.type', data && data.type, 'SEARCH_RESULTS')
        .done ();
    });
  });
});

dotest.add ('Hosted API - Method searchIndex - error', function (test) {
  pastec.searchIndex ('', function (err, data) {
    test ()
      .isError ('fail', 'err', err)
      .info (err.message)
      .isUndefined ('fail', 'data', data)
      .done ();
  });
});

dotest.add ('Hosted API - Method deleteImage', function (test) {
  pastec.deleteImage (999999999999999, function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .isExactly ('warn', 'data.type', data && data.type, 'IMAGE_REMOVED')
      .done ();
  });
});

dotest.add ('Hosted API - Error: invalid authkey', function (test) {
  var tmp = app ({
    endpoint: hosted.endpoint,
    indexid: hosted.indexid,
    authkey: '-',
    timeout: hosted.timeout
  });

  tmp.writeIndex ('./sampleIndex.dat', function (err, data) {
    test ()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'invalid authkey')
      .isExactly ('warn', 'err.error', err && err.error, 'AUTHENTIFICATION_ERROR')
      .isUndefined ('fail', 'data', data)
      .done ();
  });
});

dotest.add ('Hosted API - Error: request failed', function (test) {
  var tmp = app ({
    endpoint: hosted.endpoint,
    indexid: hosted.indexid,
    authkey: hosted.authkey,
    timeout: 1
  });

  tmp.writeIndex ('./sampleIndex.dat', function (err, data) {
    test ()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'request failed')
      .isError ('fail', 'err.error', err && err.error)
      .isExactly ('fail', 'err.error.code', err && err.error && err.error.code, 'TIMEOUT')
      .isUndefined ('fail', 'data', data)
      .done ();
  });
});

dotest.add ('Setup arguments', function (test) {
  var tmp = app ('example.lan', 123);

  test ()
    .isExactly ('fail', 'config.endpoint', tmp.config.endpoint, 'example.lan')
    .isNull ('fail', 'config.authkey', tmp.config.authkey)
    .isExactly ('fail', 'config.timeout', tmp.config.timeout, 123)
    .done ();
});


// Start the tests
dotest.run ();
