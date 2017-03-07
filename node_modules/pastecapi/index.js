/*
Name:         pastecapi
Description:  Lightweight module for Pastec image recognition API
Author:       Franklin van de Meent (https://frankl.in)
Source code:  https://github.com/fvdm/nodejs-pastecapi
Feedback:     https://github.com/fvdm/nodejs-pastecapi/issues
License:      Unlicense (Public Domain, see LICENSE file)
*/

var httpreq = require ('httpreq');
var fs = require ('fs');

var config = {
  endpoint: 'http://localhost:4121',
  timeout: 5000
};


/**
 * Process response error
 *
 * @callback callback
 * @param message {string} - error.message
 * @param err {Error, string} - error.error
 * @param res {object} - httpreq response details
 * @param callback {function} - `function (err) {}`
 * @returns {void}
 */

function processError (message, err, res, callback) {
  var error = new Error (message);

  error.statusCode = res && res.statusCode;
  error.error = err;
  callback (error);
}


/**
 * Process HTTP response
 *
 * @callback callback
 * @param err {Error, null} - httpreq error
 * @param res {object} - httpreq response details
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function processResponse (err, res, callback) {
  var data = res && res.body || '';

  if (err) {
    processError ('request failed', err, res, callback);
    return;
  }

  try {
    data = JSON.parse (data);
  } catch (e) {
    processError ('request failed', e, res, callback);
    return;
  }

  if (data.type && data.type.match (/(AUTHENTIFICATION_ERROR|NO_AUTH_KEY|WRONG_INDEX_OR_AUTH_KEY)/)) {
    processError ('invalid authkey', data.type, res, callback);
    return;
  }

  callback (null, data);
}


/**
 * Communicate with API
 *
 * @callback callback
 * @param {object} options
 * @param {string} options.method=GET - HTTP method
 * @param {string} options.path=/ - Request path, i.e. /index/searcher
 * @param {object} options.parameters - Request query parameters
 * @param {object} options.json - POST JSON data
 * @param {object} options.files - Upload files paths
 * @param {number} options.timeout=5000 - Override request timeout in ms
 * @param {function} callback - Callback function
 * @returns {void}
 */

function talk (options, callback) {
  if (config.indexid) {
    options.path = options.path.replace (/^\/index/, '/indexes/' + config.indexid);

    if (options.json && options.json.type === 'PING' && config.endpoint === 'https://api.pastec.io') {
      callback (new Error ('endpoint does not allow ping'));
      return;
    }
  }

  options.url = config.endpoint + options.path;
  options.method = options.method || 'GET';
  options.timeout = options.timeout || config.timeout;
  options.headers = options.headers || {};
  options.headers ['User-Agent'] = 'pastecapi node/' + process.versions.node;

  if (config.authkey) {
    options.headers.AuthKey = config.authkey;
  }

  function doResponse (err, res) {
    processResponse (err, res, callback);
  }

  httpreq.doRequest (options, doResponse);
}


/**
 * Test API access
 *
 * @callback callback
 * @param {function} callback - Process result
 * @returns {void}
 */

function ping (callback) {
  var options = {
    method: 'POST',
    path: '/',
    json: {
      type: 'PING'
    }
  };

  talk (options, callback);
}


/**
 * Load index from file on server
 *
 * @param {string} indexPath - Path to .dat file on server
 * @param {function} callback - Process result
 * @returns {void}
 */

function loadIndex (indexPath, callback) {
  var options = {
    method: 'POST',
    path: '/index/io',
    json: {
      type: 'LOAD',
      index_path: indexPath
    }
  };

  talk (options, callback);
}


/**
 * Write index to file on server
 *
 * @callback callback
 * @param {string} indexPath - Path of .dat file on server
 * @param {function} callback - Process result
 * @returns {void}
 */

function writeIndex (indexPath, callback) {
  var options = {
    method: 'POST',
    path: '/index/io',
    json: {
      type: 'WRITE',
      index_path: indexPath
    }
  };

  talk (options, callback);
}


/**
 * Clear index on server
 *
 * @callback callback
 * @param {function} callback - Process result
 * @returns {void}
 */

function clearIndex (callback) {
  var options = {
    method: 'POST',
    path: '/index/io',
    json: {
      type: 'CLEAR'
    }
  };

  talk (options, callback);
}


/**
 * Match image against index
 *
 * @callback callback
 * @param {string|buffer} image - Buffer or local path to image
 * @param {function} callback - Process result
 * @returns {void}
 */

function searchIndex (image, callback) {
  var options = {
    method: 'POST',
    path: '/index/searcher',
    binary: true
  };

  // Binary pass through
  if (image instanceof Buffer) {
    options.body = image;
    options.headers = {
      'Content-Length': image.length,
      'Content-Type': 'image/jpeg'
    };

    talk (options, callback);
    return;
  }

  // Read file to buffer
  fs.readFile (image, function (err, data) {
    if (err) {
      callback (err);
      return;
    }

    options.body = data;
    options.headers = {
      'Content-Length': data.length,
      'Content-Type': 'image/jpeg'
    };

    talk (options, callback);
  });
}


/**
 * Remove image signature from index
 *
 * @callback callback
 * @param {number} imageId - Index ID of image signature
 * @param {function} callback - Process result
 * @returns {void}
 */

function deleteImage (imageId, callback) {
  var options = {
    method: 'DELETE',
    path: '/index/images/' + imageId
  };

  talk (options, callback);
}


/**
 * Add image signature to index
 *
 * @callback callback
 * @param {string|buffer} image - Buffer or local path to image
 * @param {number} imageId - Index ID for image
 * @param {function} callback - Process result
 * @returns {void}
 */

function addImage (image, imageId, callback) {
  var options = {
    method: 'PUT',
    path: '/index/images/' + imageId,
    binary: true
  };

  // Binary pass through
  if (image instanceof Buffer) {
    options.body = image;
    options.headers = {
      'Content-Length': image.length,
      'Content-Type': 'image/jpeg'
    };

    talk (options, callback);
    return;
  }

  // Read file to buffer
  fs.readFile (image, function (err, data) {
    if (err) {
      callback (err);
      return;
    }

    options.body = data;
    options.headers = {
      'Content-Length': data.length,
      'Content-Type': 'image/jpeg'
    };

    talk (options, callback);
  });
}


/**
 * Module setup
 *
 * @param {string} endpoint - REST API base URL
 * @param (string} authkey - API auth key (--auth-key flag)
 * @param {number} timeout - Request wait timeout in ms
 * @returns {object} - Module methods
 */

module.exports = function (endpoint, authkey, timeout) {
  if (typeof endpoint === 'object') {
    config.endpoint = endpoint.endpoint || config.endpoint;
    config.indexid = endpoint.indexid || null;
    config.authkey = endpoint.authkey || null;
    config.timeout = endpoint.timeout || config.timeout;
  } else {
    if (typeof authkey === 'number') {
      timeout = authkey;
      authkey = null;
    }

    config.endpoint = endpoint || config.endpoint;
    config.timeout = timeout || config.timeout;
    config.authkey = authkey || null;
  }

  return {
    config,
    ping,
    loadIndex,
    writeIndex,
    clearIndex,
    searchIndex,
    addImage,
    deleteImage
  };
};
