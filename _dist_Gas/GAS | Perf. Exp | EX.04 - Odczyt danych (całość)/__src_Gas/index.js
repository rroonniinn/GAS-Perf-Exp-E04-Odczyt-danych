var global=this;function menu() {
}
function onOpen() {
}(function (factory) {
	typeof define === 'function' && define.amd ? define('index', factory) :
	factory();
}((function () { 'use strict';

	/**
	 * Funkcja rekursywna odpalająca przekazany callback określoną
	 * liczę razy. Przydatna do testów wydajności
	 *
	 * @param {Number} count Liczba od 1 do 1000
	 * @param {Function} callback
	 * @returns
	 */
	const looper = (count, callback) => {
	  if (count <= 0) throw new Error('Wrong count number');
	  if (count > 1000) throw new Error('Too much recursion');
	  if (count === 1) return callback();
	  callback();
	  return looper(count - 1, callback);
	};

	/**
	 * Shuffle random array of numbers. Based on "the right" algorithm:
	 * https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
	 *
	 * @param {array} arr Array of elements
	 * @returns {array} Shuffled array
	 */
	const randomShuffleArray = arr => {
	  for (let i = arr.length - 1; i > 0; i--) {
	    const j = Math.floor(Math.random() * i);
	    const temp = arr[i];
	    arr[i] = arr[j];
	    arr[j] = temp;
	  }

	  return arr;
	};

	/**
	 * Returns (pseudo) random integer from min - max range (inclusive)
	 *
	 * @param {number} min Min value (inclusive)
	 * @param {number} max Max value (inclusive)
	 */
	const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

	/* eslint-disable max-params */
	/**
	 * Returns an array of random unique numbers from given range
	 *
	 * @param {number} quant Quantity of numbers
	 * @param {number} min Min value
	 * @param {number} max Max value
	 * @param {boolean} startEnd Whether to include min and max value
	 * @param {boolean} sort Whether to sort final values
	 * @param {boolean} unique Whether values have to be unique
	 * @param {number[]} arr Tablica startowa indeksów (używna jeśli któreś
	 * indeksy mają być umieszczone w tablicy)
	 * @returns {number[]}
	 */

	const randomIntegersArray = (quant, min, max, unique = false, startEnd = false, sort = false, arr = []) => {
	  if (unique && quant > max - min + 1) {
	    throw new Error('To restrictive min and max for given quantity');
	  }

	  if (arr.length === quant) {
	    return sort ? arr.sort((a, b) => a - b) : randomShuffleArray(arr);
	  }

	  if (startEnd) {
	    arr.push(min, max);
	  }

	  const random = randomInteger(min, max);

	  if (unique) {
	    if (!arr.includes(random)) {
	      arr.push(random);
	    }
	  } else {
	    arr.push(random);
	  }

	  return randomIntegersArray(quant, min, max, unique, false, sort, arr);
	};

	/**
	 * Generates array 2d filled with random integers from 0 to 1000
	 *(both inclusive)
	 *
	 * @param {number} rows Number of rows
	 * @param {number} cols Number of cols
	 */

	const randomIntegersArray2d = (rows, cols) => {
	  const arr = [];

	  while (arr.length < rows) {
	    arr.push(randomIntegersArray(cols, 0, 1000, false, false, false));
	  }

	  return arr;
	};

	/**
	 * Zwraca sheetObject arkusza o podanej nazwie.
	 * Jeśli drugi parametr nie jest podany - pobiera arkusz
	 * z bieżącego pliku (bound)
	 *
	 * @memberof Lib_Gas
	 *
	 * @param {string} sheetName Nazwa arkusza
	 * @param {string} [fileId] Id pliku
	 * @returns {Object} Obiekt arkusza
	 */
	const getSheet = (sheetName, fileId = null) => {
	  if (fileId) return SpreadsheetApp.openById(fileId).getSheetByName(sheetName);
	  return SpreadsheetApp.getActive().getSheetByName(sheetName);
	};

	/**
	 * Pobiera zawartość wkazanego zakresu w przekazanym arkuszu
	 *
	 * @memberof Lib_Gas
	 *
	 * @param {Object<string, any>} sheetObj Obiekt arkusza
	 * @param {string} [range] Zakres np. <tt>A2:B2'</tt>, <tt>'A4'</tt>.
	 * Jeśli brak, to zostanie pobrana cała, wypełniona
	 * zawartość danych (getDataRange)
	 * @returns {Array[]} Tablica 2D z pobranymi wartościami
	 */
	const getValues = (sheetObj, range) => {
	  if (range) return sheetObj.getRange(range).getValues();
	  return sheetObj.getDataRange().getValues();
	};

	/**
	 * Zwraca ID folderu lub pliku z przekazanego URL-a,
	 *
	 * @memberof Lib_Gas
	 *
	 * @param {string} url URL folderu lub pliku
	 * @returns {string} ID
	 */
	const getIdFromUrl = url => {
	  // folder
	  if (url.lastIndexOf('folders') > -1) {
	    return /folders\/(.+)/.exec(url)[1];
	  } // file
	  // return /d\/(.+)\//.exec(url)[1];


	  return /d\/([^/]+)/.exec(url)[1];
	};

	/**
	 * check if item is undefined
	 * @param {*} item the item to check
	 * @return {boolean} whether it is undefined
	 * */
	const isUndefined = item => typeof item === 'undefined';

	/**
	 * get the stack
	 * @param {Error} e the error
	 * @return {string} the stack trace
	 */
	const errorStack = e => {
	  try {
	    // 	// throw a fake error
	    throw new Error(); // x is undefined and will fail under use struct
	    // - ths will provoke an error so i can get the call stack
	  } catch (err) {
	    return `Error:${e}\n${err.stack.split('\n').slice(1).join('\n')}`;
	  }
	};
	 // return 'Error:' + e + '\n' + err.stack.split('\n').slice(1).join('\n');

	// default checker
	const errorQualifies = errorText => ['Exception: Service invoked too many times', 'Exception: Rate Limit Exceeded', 'Exception: Quota Error: User Rate Limit Exceeded', 'Service error:', 'Exception: Service error:', 'Exception: User rate limit exceeded', 'Exception: Internal error. Please try again.', 'Exception: Cannot execute AddColumn because another task', 'Service invoked too many times in a short time:', 'Exception: Internal error.', 'User Rate Limit Exceeded', 'Exception: ???????? ?????: DriveApp.', 'Exception: Address unavailable', 'Exception: Timeout', 'GoogleJsonResponseException: Rate Limit Exceeded' // eslint-disable-next-line eqeqeq
	].some(e => errorText.toString().slice(0, e.length) == e);

	/* eslint-disable complexity */

	/* eslint-disable max-params */

	/* eslint-disable max-lines-per-function */

	/**
	 * recursive rateLimitExpBackoff()
	 * @param {function} callBack some function to call that might return rate
	 * limit exception
	 * @param {object} options properties as below
	 * @param {number} [attempts=1] optional the attempt number of this
	 * instance - usually only used recursively and not user supplied
	 * @param {number} [options.sleepFor=750] optional amount of time to sleep
	 * for on the first failure in missliseconds
	 * @param {number} [options.maxAttempts=5] optional maximum number
	 * of amounts to try
	 * @param {boolean} [options.logAttempts=true] log re-attempts to Logger
	 * @param {function} [options.checker] function to check whether error
	 * is retryable
	 * @param {function} [options.lookahead] function to check response
	 * and force retry (passes response,attemprs)
	 * @return {*} results of the callback
	 */

	const expBackoff = (callBack, options, attempts) => {
	  // sleepFor = Math.abs(options.sleepFor ||
	  // eslint-disable-next-line no-param-reassign
	  options = options || {};
	  const optionsDefault = {
	    sleepFor: 750,
	    maxAttempts: 5,
	    checker: errorQualifies,
	    logAttempts: true
	  }; // mixin

	  Object.keys(optionsDefault).forEach(function (k) {
	    // eslint-disable-next-line no-prototype-builtins
	    if (!options.hasOwnProperty(k)) {
	      options[k] = optionsDefault[k];
	    }
	  }); // for recursion
	  // eslint-disable-next-line no-param-reassign

	  attempts = attempts || 1; // make sure that the checker is really a function

	  if (typeof options.checker !== 'function') {
	    throw errorStack('if you specify a checker it must be a function');
	  } // check properly constructed


	  if (!callBack || typeof callBack !== 'function') {
	    throw errorStack('you need to specify a function for rateLimitBackoff to execute');
	  }

	  function waitABit(theErr) {
	    // give up?
	    if (attempts > options.maxAttempts) {
	      throw errorStack(`${theErr} (tried backing off ${attempts - 1} times`);
	    } else {
	      // wait for some amount of time based on how many times
	      // we've tried plus a small random bit to avoid races
	      Utilities.sleep( // eslint-disable-next-line no-restricted-properties
	      Math.pow(2, attempts) * options.sleepFor + Math.round(Math.random() * options.sleepFor));
	    }
	  } // try to execute it


	  try {
	    const response = callBack(options, attempts); // maybe not throw an error but is problem nevertheless

	    if (options.lookahead && options.lookahead(response, attempts)) {
	      if (options.logAttempts) {
	        Logger.log(`backoff lookahead:${attempts}`);
	      }

	      waitABit('lookahead:');
	      return expBackoff(callBack, options, attempts + 1);
	    }

	    return response;
	  } catch (err) {
	    // there was an error
	    if (options.logAttempts) {
	      Logger.log(`backoff ${attempts}:${err}`);
	    } // failed due to rate limiting?


	    if (options.checker(err)) {
	      waitABit(err);
	      return expBackoff(callBack, options, attempts + 1);
	    } // some other error


	    throw errorStack(err);
	  }
	};

	/**
	 * randBetween
	 * get an random number between x and y
	 * @param {number} min the lower bound
	 * @param {number} max the upper bound
	 * @return {number} the random number
	 * */
	const randBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

	/**
	 * get an arbitrary alpha string
	 * @param {number} length of the string to generate
	 * @return {string} an alpha string
	 * */

	const arbitraryString = length => {
	  let s = '';

	  for (let i = 0; i < length; i++) {
	    s += String.fromCharCode(randBetween(97, 122));
	  }

	  return s;
	};

	/**
	 * generateUniqueString
	 * get a unique string
	 * @param {number} optAbcLength the length of the alphabetic prefix
	 * @return {string} a unique string
	 * */

	const generateUniqueString = optAbcLength => {
	  const abcLength = isUndefined(optAbcLength) ? 3 : optAbcLength;
	  return new Date().getTime().toString(36) + arbitraryString(abcLength);
	};

	/**
	 * check something is a blob
	 * not a comprehensive test
	 */
	const isBlob = blob => blob && typeof blob === 'object' && typeof blob.setContentTypeFromExtension === 'function' && typeof blob.getBytes === 'function';

	/**
	 * isObject
	 * check if an item is an object
	 * @memberof DbAbstraction
	 * @param {object} obj an item to be tested
	 * @return {boolean} whether its an object
	 * */
	const isObject = obj => obj === Object(obj);

	/**
	 * test for a date object
	 * @param {*} ob the on to test
	 * @return {boolean} t/f
	 */

	const isDateObject = ob => isObject(ob) && ob.constructor && ob.constructor.name === 'Date';

	/**
	 * @param {[*]} arguments unspecified number and type of args
	 * @return {string} a digest of the arguments to use as a key
	 */
	const keyDigest = () => // conver args to an array and digest them
	Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_1, Array.prototype.slice // eslint-disable-next-line no-undef
	.call(arguments).map(function (d) {
	  return Object(d) === d ? JSON.stringify(d) : d.toString();
	}).join('-'), Utilities.Charset.UTF_8));

	/* eslint-disable max-lines */
	/* eslint-disable max-params */

	/* eslint-disable max-lines-per-function */

	/**
	 * utils for squeezing more out of Apps Script quotas
	 * @namespace Squeeze
	 */

	/**
	 * utilities for zipping and chunking data for property stores and cache
	 * @constructor ChunkingUtils
	 */

	const Chunking = function () {
	  // the default maximum chunksize
	  const self = this;
	  let chunkSize_ = 9 * 1024;
	  let store_;
	  let prefix_ = 'chunking_';
	  const overhead_ = 12;
	  const digestOverhead_ = 40 + 10;
	  let respectDigest_ = true;
	  let compressMin_ = 300; // --default functions for these operations
	  // how to read a string

	  let readFromStore_ = (store, key) => expBackoff(() => store.getProperty(key)); // how to write a string


	  let writeToStore_ = (store, key, str) => expBackoff(() => store.setProperty(key, str)); // how to get an object


	  let getObject_ = (store, key) => {
	    const result = readFromStore_(store, key);
	    return result ? JSON.parse(result) : null;
	  }; // how to set an object


	  let setObject_ = (store, key, ob, expire) => {
	    const s = JSON.stringify(ob || {});
	    writeToStore_(store, key, s, expire);
	    return s.length;
	  }; // how to remove an object


	  let removeObject_ = (store, key) => expBackoff(() => store.deleteProperty(key));
	  /**
	   * check that a variable is a function and throw if not
	   * @param {function} [func] optional function to check
	   * @return {function} the func
	   */


	  const checkAFunc = func => {
	    if (func && typeof func !== 'function') {
	      throw new Error('argument should be a function');
	    }

	    return func;
	  };
	  /**
	   * set the max chunksize
	   * @param {number} chunkSize the max size
	   * @return {Chunking} self
	   */


	  self.setChunkSize = function (chunkSize) {
	    chunkSize_ = chunkSize;
	    return self;
	  };
	  /**
	   * minimum size over which to compress
	   * @return {boolean} respectDigest the max size
	   */


	  self.getCompressMin = function () {
	    return compressMin_;
	  };
	  /**
	   * whether to respect digest to avoid rewriting unchanged records
	   * @param {boolean} compressMin the min size
	   * @return {Chunking} self
	   */


	  self.setCompressMin = function (compressMin) {
	    if (!isUndefined(compressMin)) compressMin_ = compressMin;
	    return self;
	  };
	  /**
	   * whether to respect digest to avoid rewriting unchanged records
	   * @return {boolean} respectDigest
	   */


	  self.getRespectDigest = function () {
	    return respectDigest_;
	  };
	  /**
	   * whether to respect digest to avoid rewriting unchanged records
	   * @param {boolean} respectDigest the max size
	   * @return {Chunking} self
	   */


	  self.setRespectDigest = function (respectDigest) {
	    if (!isUndefined(respectDigest_)) respectDigest_ = respectDigest;
	    return self;
	  };
	  /**
	   * get the max chunksize
	   * @return {number} chunkSize the max size
	   */


	  self.getChunkSize = function () {
	    return chunkSize_;
	  };
	  /**
	   * set the key prefix
	   * @param {string} prefix the key prefix
	   * @return {Chunking} self
	   */


	  self.setPrefix = function (prefix) {
	    if (!isUndefined(prefix)) prefix_ = prefix.toString();
	    return self;
	  };
	  /**
	   * get the prefix
	   * @return {string} prefix the prefix
	   */


	  self.getPrefix = function () {
	    return prefix_;
	  };
	  /**
	   * set the store
	   * @param {object} store the store
	   * @return {Chunking} self
	   */


	  self.setStore = function (store) {
	    store_ = store;
	    return self;
	  };
	  /**
	   * get the store
	   * @return {object} the store
	   */


	  self.getStore = function () {
	    return store_;
	  };
	  /**
	   * set how to get an object
	   * @param {function} func how to get an object
	   * @return {Chunking} self
	   */


	  self.funcGetObject = function (func) {
	    // func should take a store, key and return an object
	    getObject_ = checkAFunc(func);
	    return self;
	  };
	  /**
	   * set how to get an object
	   * @param {function} func how to set an object
	   * @return {Chunking} self
	   */


	  self.funcSetObject = function (func) {
	    // func should take a store, key and an object,
	    // and return the size of the stringified object
	    setObject_ = checkAFunc(func);
	    return self;
	  };
	  /**
	   * set how to read from store
	   * @param {function} func how to read from store
	   * @return {Chunking} self
	   */


	  self.funcReadFromStore = function (func) {
	    // func should take a store key, and return a string
	    readFromStore_ = checkAFunc(func);
	    return self;
	  };
	  /**
	   * set how to write to store
	   * @param {function} func how to set an object
	   * @return {Chunking} self
	   */


	  self.funcWriteToStore = function (func) {
	    // func should take a store key and a string to write
	    writeToStore_ = checkAFunc(func);
	    return self;
	  };
	  /**
	   * set how to remove an object
	   * @param {function} func how to remove an object
	   * @return {Chunking} self
	   */


	  self.funcRemoveObject = function (func) {
	    // func should take a store, key
	    removeObject_ = checkAFunc(func);
	    return self;
	  };

	  const payloadSize_ = () => {
	    if (chunkSize_ <= overhead_) {
	      // eslint-disable-next-line no-throw-literal
	      throw `chunksize must be at least ${overhead_ + 1}`;
	    }

	    return chunkSize_ - overhead_;
	  };

	  const digest_ = what => keyDigest();

	  const uid_ = () => generateUniqueString();

	  const getChunkKey_ = key => `${key}_${uid_()}`;

	  const fudgeKey_ = key => {
	    if (isUndefined(key) || key === null) // eslint-disable-next-line no-throw-literal
	      throw 'property key must have a value';
	    return typeof key === 'object' ? digest_() : key;
	  };
	  /**
	   * sets a property using multiple entries if its going to be too big
	   *  use self.setBigProperty() from outside, which first deletes
	   * existing stuff
	   *  as well as checking the digest
	   * @param {object} propKey the key
	   * @param {string} sob the thing to write
	   * @return {number} total length of everything written
	   */


	  const setBigProperty_ = (propKey, sob, expire) => {
	    // always crush big properties
	    let size = 0; // crush the object

	    const skipZip = sob.length < compressMin_;
	    let chunks;
	    let crushed = skipZip ? sob : self.zip(sob); // get the digest
	    // the digest is used to avoid updates when theres no change

	    const digest = digest_(); // if we have an overflow, then need to write multiple properties

	    if (crushed.length > payloadSize_() - digestOverhead_) {
	      chunks = [];
	    } // now split up the big thing if needed
	    // expire should be a little bigger for the chunks
	    // to make sure they dont go away


	    do {
	      // peel off a piece
	      const chunk = crushed.slice(0, payloadSize_());
	      crushed = crushed.slice(chunk.length);

	      if (chunks) {
	        // make a new entry for the key
	        const key = getChunkKey_(propKey);
	        size += setObject_(self.getStore(), key, {
	          chunk
	        }, expire ? expire + 1 : expire); // remember the key

	        chunks.push(key);
	      } else {
	        size += setObject_(self.getStore(), propKey, {
	          chunk,
	          digest,
	          skipZip
	        }, expire);
	      }
	    } while (crushed.length); // now write the index if there were chunks


	    if (chunks) {
	      size += setObject_(self.getStore(), propKey, {
	        chunks,
	        digest,
	        skipZip
	      }, expire);
	    }

	    return size;
	  };
	  /**
	   * get the keys of multiple entries if it was too big
	   * @param {PropertiesService} props the service to use
	   * @param {object} propKey the key
	   * @return {object} the result {chunks:[],data:{}} - an array of keys,
	   * or some actual data
	   */


	  self.getChunkKeys = function (propKey) {
	    // in case the key is an object
	    // eslint-disable-next-line no-param-reassign
	    propKey = fudgeKey_(propKey);
	    let data;
	    const crushed = getObject_(self.getStore(), propKey); // at this point, crushed is an object with either
	    // a .chunk property with a zipped version of the data, or
	    // a .chunks property with an array of other entries to get
	    // a .digest property with the digest of all the data which
	    // identifies it as a master
	    // its a non split item

	    if (crushed && crushed.chunk && crushed.digest) {
	      // uncrush the data and parse it back to an object
	      // if there are no associated records
	      data = crushed.chunk ? JSON.parse(crushed.skipZip ? crushed.chunk : self.unzip(crushed.chunk)) : null;
	    } // return either the data or where to find the data


	    return {
	      chunks: crushed && crushed.chunks ? crushed.chunks : null,
	      data,
	      digest: crushed ? crushed.digest : '',
	      skipZip: crushed && crushed.skipZip
	    };
	  };
	  /**
	   * remove an entry and its associated stuff
	   * @param {object} propKey the key
	   * @return {Props} self
	   */


	  self.removeBigProperty = function (propKey) {
	    // in case the key is an object
	    propKey = fudgeKey_(propKey);
	    let removed = 0; // always big properties are always crushed

	    const chunky = self.getChunkKeys(prefix_ + propKey); // now remove the properties entries

	    if (chunky && chunky.chunks) {
	      chunky.chunks.forEach(function (d) {
	        removeObject_(self.getStore(), d);
	        removed++;
	      });
	    } // now remove the master property


	    if (chunky.digest) {
	      removeObject_(self.getStore(), prefix_ + propKey);
	      removed++;
	    }

	    return removed;
	  };
	  /**
	   * updates a property using multiple entries if its going to be too big
	   * @param {object} propKey the key
	   * @param {object} ob the thing to write
	   * @param {number} expire secs to expire
	   * @return {size} of data written - if nothing done, size is 0
	   */


	  self.setBigProperty = function (propKey, ob, expire) {
	    // in case the key is an object
	    propKey = fudgeKey_(propKey);
	    let slob; // donbt allow undefined

	    if (isUndefined(ob)) {
	      throw 'cant write undefined to store';
	    } // blob pulls it out


	    if (isBlob(ob)) {
	      slob = {
	        contentType: ob.getContentType(),
	        name: ob.getName(),
	        content: Utilities.base64Encode(ob.getBytes()),
	        blob: true
	      };
	    } else if (isDateObject(ob)) {
	      // convery to timestamp
	      slob = {
	        date: true,
	        content: ob.getTime()
	      };
	    } else if (typeof ob === 'object') {
	      // strinfigy
	      slob = {
	        content: JSON.stringify(ob),
	        parse: true
	      };
	    } else {
	      slob = {
	        content: ob
	      };
	    } // pack all that up to write to the store


	    const sob = JSON.stringify(slob); // get the digest

	    const digest = keyDigest(); // now get the master if there is one

	    const master = getObject_(self.getStore(), prefix_ + propKey);

	    if (master && master.digest && master.digest === digest && respectDigest_ && !expire) {
	      // nothing to do
	      return 0;
	    } // need to remove the previous entries and add this new one


	    self.removeBigProperty(propKey);
	    return setBigProperty_(prefix_ + propKey, sob, expire);
	  };
	  /**
	   * gets a property using multiple entries if its going to be too big
	   * @param {object} propKey the key
	   * @return {object} what was retrieved
	   */


	  self.getBigProperty = function (propKey) {
	    let myPackage; // in case the key is an object

	    propKey = fudgeKey_(propKey); // always big properties are always crushed

	    const chunky = self.getChunkKeys(prefix_ + propKey); // that'll return either some data, or a list of keys

	    if (chunky && chunky.chunks) {
	      const p = chunky.chunks.reduce((p, c) => {
	        const r = getObject_(self.getStore(), c); // should always be available

	        if (!r) {
	          throw `missing chunked property ${c} for key ${propKey}`;
	        } // rebuild the crushed string


	        return p + r.chunk;
	      }, ''); // now uncrush the result

	      myPackage = JSON.parse(chunky.skipZip ? p : self.unzip(p));
	    } else {
	      // it was just some data
	      myPackage = chunky ? chunky.data : null;
	    } // now need to unpack;


	    if (myPackage) {
	      if (myPackage.parse) {
	        return JSON.parse(myPackage.content);
	      }

	      if (myPackage.date) {
	        return new Date(myPackage.content);
	      }

	      if (myPackage.blob) {
	        return Utilities.newBlob(Utilities.base64Decode(myPackage.content), myPackage.contentType, myPackage.name);
	      }

	      return myPackage.content;
	    }

	    return null;
	  };
	  /**
	   * crush for writing to cache.props
	   * @param {string} crushThis the string to crush
	   * @return {string} the b64 zipped version
	   */


	  self.zip = function (crushThis) {
	    return Utilities.base64Encode(Utilities.zip([Utilities.newBlob(crushThis)]).getBytes());
	  };
	  /**
	   * uncrush for writing to cache.props
	   * @param {string} crushed the crushed string
	   * @return {string} the uncrushed string
	   */


	  self.unzip = function (crushed) {
	    return Utilities.unzip(Utilities.newBlob(Utilities.base64Decode(crushed), 'application/zip'))[0].getDataAsString();
	  };
	};

	const Squeeze = {
	  Chunking
	};

	/* eslint-disable max-params */
	/* eslint-disable max-lines-per-function */

	/**
	 * Jak tego używać:
	 * https://ramblings.mcpher.com/google-apps-scripts-snippets-2/squeezing-more-into-and-getting-more-out-of-cache-services/
	 */

	function CrusherPluginCacheService() {
	  // writing a plugin for the Squeeze service is pretty straighforward.
	  // you need to provide an init function which sets up how to
	  // init/write/read/remove objects from the store
	  // this example is for the Apps Script cache service
	  const self = this; // these will be specific to your plugin

	  let settings_; // standard function to check store is present and of the correct type

	  const checkStore = () => {
	    if (!settings_.store) throw new Error('You must provide a cache service to use');
	    if (!settings_.chunkSize) throw new Error('You must provide the maximum chunksize supported');
	    return self;
	  };
	  /**
	   * write an item
	   * @param {object} store whatever you initialized store with
	   * @param {string} key the key to write
	   * @param {string} str the string to write
	   * @param {number} expiry time in secs
	   * @return {object} whatever you like
	   */


	  const write = (store, key, str, expiry) => {
	    checkStore();
	    return expBackoff(() => expiry ? store.put(key, str, expiry) : store.put(key, str));
	  };
	  /**
	   * read an item
	   * @param {object} store whatever you initialized store with
	   * @param {string} key the key to write
	   * @return {object} whatever you like
	   */


	  const read = (store, key) => {
	    checkStore();
	    return expBackoff(() => store.get(key));
	  };
	  /**
	   * remove an item
	   * @param {string} key the key to remove
	   * @return {object} whatever you  like
	   */


	  const remove = (store, key) => {
	    checkStore();
	    return expBackoff(() => store.remove(key));
	  }; // start plugin by passing settings you'll need for operations

	  /**
	   * @param {object} settings these will vary according
	   * to the type of store
	   */


	  self.init = function (settings) {
	    settings_ = settings || {}; // set default chunkzise for cacheservice

	    settings_.chunkSize = settings_.chunkSize || 100000; // respect digest can reduce the number of chunks read,
	    // but may return stale

	    settings_.respectDigest = isUndefined(settings_.respectDigest) ? false : settings_.respectDigest; // must have a cache service and a chunksize

	    checkStore(); // now initialize the squeezer

	    self.squeezer = new Squeeze.Chunking().setStore(settings_.store).setChunkSize(settings_.chunkSize).funcWriteToStore(write).funcReadFromStore(read).funcRemoveObject(remove).setRespectDigest(settings_.respectDigest).setCompressMin(settings_.compressMin).setPrefix(settings_.prefix); // export the verbs

	    self.put = self.squeezer.setBigProperty;
	    self.get = self.squeezer.getBigProperty;
	    self.remove = self.squeezer.removeBigProperty;
	    return self;
	  }; // return your own settings
	}

	/* eslint-disable max-params */
	/**
	 * Cache Object
	 * @typedef {Object} CacheObject
	 * @property {object} init Metoda do inicjacji obiektu (nie używana pub)
	 * @property {function} get Pobieranie danych z cacha
	 * @property {function} put Wprowadzanie danych do cacha
	 */

	/**
	 * Obiekt do obsługi cachowania z biblioteki mcpher
	 * @type {CacheObject} obj
	 */

	const crusherCache = {
	  init: new CrusherPluginCacheService().init({
	    store: CacheService.getScriptCache()
	  }),

	  /**
	   * Pobieranie danych z cacha
	   * @param {string} key Klucz danych z cacha
	   */
	  get(key) {
	    return this.init.get(`cr-${key}`);
	  },

	  /**
	   * @param {string} key Klucz danych z cacha
	   * @param {any} vals Dane do wprowadzenia
	   * @param {number} t Czas przechowywania danych (minuty - max 6 * 60)
	   */
	  put(key, vals, t) {
	    this.init.put(`cr-${key}`, vals, 60 * t);
	  }

	};

	/**
	 * Własna implementacja pipe oparta na materiale z
	 * // https://medium.com/javascript-scene/reduce-composing-software-fe22f0c39a1d
	 *
	 * @param {function}  fns Dowolna liczna funkcji
	 * @returns {(x:any) => any} Zwraca funkcję oczekującą wartości inicjalnej
	 */
	const pipe = (
	/** @type {array} */
	...fns) => x => fns.reduce((v, f) => f(v), x);

	/**
	 * Times Sheets
	 * @typedef {Object} TimesSheets
	 * @property {string} LOCAL Wklejka lokalna
	 * @property {string} EXTER Wklejka do zewnętrznych plików
	 * @property {string} CACHE Wklejka do cacha
	 */

	/**
	 * @type {TimesSheets} SHEETS Arkusze do wklejania wyników eksperymentów
	 */
	const SHEETS = {
	  LOCAL: 'T: Odczyt lokalnie',
	  EXTER: 'T: Odczyt external',
	  CACHE: 'T: Odczyt cache'
	};
	/**
	 * Arkusze lokalne z których pobieramy dane podczas eksperymentu
	 * @type {Object<string, string>} LOCAL_SHEET
	 */

	const LOCAL_SHEET = {
	  l100: 'res100',
	  l200: 'res200',
	  l500: 'res500',
	  l1000: 'res1000',
	  l2000: 'res2000',
	  l4000: 'res4000',
	  l8000: 'res8000',
	  l16000: 'res16000'
	};
	/**
	 * URLe zewnętrznych arkuszy z których pobieramy dane (pochodzą
	 * z eksperymentu https://docs.google.com/spreadsheets/d/1qV5DkLLS2XcZC2Oc3QsikbOtsA41N2PNBKyZghWbytY/edit#gid=1946600950)
	 * @type {Object<string, string>} EXT_SHEET_URL
	 */

	const EXT_SHEET_URL = {
	  l100: 'https://docs.google.com/spreadsheets/d/1DAsts1B-JuYZUNoQ5oNthmty6LsljPbik5zBZUOjkxg',
	  l200: 'https://docs.google.com/spreadsheets/d/1YxrLrGK-qRM67D6RgBb03Ozvd7ZtNuahwLXlV18QMsw',
	  l500: 'https://docs.google.com/spreadsheets/d/1XZEMpV-BX0X_vRoXwDQE2Fx3Lfug1_cCbssFAN7D-nM',
	  l1000: 'https://docs.google.com/spreadsheets/d/1weGq34nlv0Tto-pjnIFLPG6yX_XX5XS91hFxcyUU3Ak',
	  l2000: 'https://docs.google.com/spreadsheets/d/14lGCP6Fp3UBnJpTl87-S14neBaE3r3ppZddxN1uSQj8',
	  l4000: 'https://docs.google.com/spreadsheets/d/1GXWLCEPXQOIGYhzrdxpuYk9VfNLyFMQFxgHoGYJYqTQ',
	  l8000: 'https://docs.google.com/spreadsheets/d/1yWJPLliF0CDPpS5QqEQJgkjvoUDy784g3UuAfd-vNIo',
	  l16000: 'https://docs.google.com/spreadsheets/d/1_bjTKNKUP_AvAkxmi92peD2t9cdMrsRatprzVvUlIXg'
	};
	/**
	 * Nazwa arkusza w zewnętrznym pliku, w którym znajdują się dane
	 * @type {string} EXT_SHEET_NAME
	 */

	const EXT_SHEET_NAME = 'res';

	/**
	 * Obiekt z funkcjami generującymi losowe tablice z numerami od 0 do 1000
	 * o różnej liczbie wierszy i 15 kolumnach
	 * @type {Object<string, function>} generateRandomArrs
	 */

	const generateData = {
	  l100: () => randomIntegersArray2d(100, 15),
	  l200: () => randomIntegersArray2d(200, 15),
	  l500: () => randomIntegersArray2d(500, 15),
	  l1000: () => randomIntegersArray2d(1000, 15),
	  l2000: () => randomIntegersArray2d(2000, 15),
	  l4000: () => randomIntegersArray2d(4000, 15),
	  l8000: () => randomIntegersArray2d(8000, 15),
	  l16000: () => randomIntegersArray2d(16000, 15)
	};
	/**
	 * Helper
	 * Wpisuje w konsoli status działania
	 *
	 * @param {string} src Źródło np. external
	 * @param {string} taskCode Kod zadania (wypełnia się automatycznie)
	 * @returns {(val: array[]) => void}
	 */

	const printInfo = (src, taskCode) => val => console.log(`Got from ${src} '${taskCode}' | ${val.length} rows`);
	/**
	 * Pobiera dane z lokalnego arkusza
	 * @param {string} taskCode Zdefiniowany kod zadania np. l100
	 * @returns {function}
	 */


	const getLocal = taskCode => pipe(() => getSheet(LOCAL_SHEET[taskCode]), getValues, printInfo('local', taskCode));
	/**
	 * Wygeneruj losowe liczby i wklej je do zewnętrznego arkusza
	 * @param {string} taskCode Zdefiniowany kod zadania np. l100
	 * @returns {function}
	 */


	const getExternal = taskCode => pipe(() => getSheet(EXT_SHEET_NAME, getIdFromUrl(EXT_SHEET_URL[taskCode])), getValues, printInfo('external', taskCode));
	/**
	 * Pobierz dane z cacha
	 * @param {string} taskCode Zdefiniowany kod zadania np. l100
	 * @returns {function}
	 */


	const getCache = taskCode => pipe(() => crusherCache.get(taskCode), printInfo('cache', taskCode));
	/**
	 * Helper:
	 * Regeneruj cache - wygeneruj losowe liczby i wklej je do cacha
	 */


	const regenerateCache = () => {
	  Object.keys(generateData).forEach(key => {
	    const randomData = generateData[key]();
	    crusherCache.put(key, randomData, 120);
	    console.log(`Regenerated ${randomData.length} rows | First cell: ${randomData[0][0]}`);
	  });
	};

	/* eslint-disable max-params */

	/**
	 * Sprawsza czas wykonywania się przekazanej funkcji.
	 * Loguje czas. Zwraca efekt działania funkcji (czyli działa trochę
	 * jak tap). Przyjmuje obiekt logResult (Array) do którego po referencji
	 * dodaje nowy wpis z wynikiem - czasem działania funkcji oraz opisami
	 * (pozostałe argumenty)
	 *
	 * @param {Array} logResults Tablica do której doklejane są wyniki perf.
	 * @param {Function} callback Funkcja do wykonania
	 * @param {String} descA Krótki opis
	 * @param {String} descB Dłuższy opis
	 * @param {number|string} [descC=0] Opcjonalnie kod wiadomości 0-3.
	 * @returns {any} Rezultat działania funkcji przekaznej
	 */
	const performanceCheckerObj = (logResults, callback, descA, descB, descC = 0 // status (1-2-3)
	) => {
	  const startTime = new Date();
	  const res = callback();
	  const time = (new Date() - startTime) / 1000;
	  logResults.push([new Date(), descA, time, descB, descC]);
	  return res;
	};

	/**
	 * Zamienia nagłówek (np. A) ma numer kolumny (np. 1)
	 * Wzięte stąd: https://stackoverflow.com/questions/21229180/convert-column-index-into-corresponding-column-letter/21231012#21231012
	 * @memberof Lib_Gas
	 * @param {string} letter Identyfikator kolumny np. 'B'
	 * @returns {number} Numer kolumny np. 2
	 */
	const letterToColumn = letter => {
	  let column = 0;
	  const {
	    length
	  } = letter;

	  for (let i = 0; i < length; i++) {
	    column += (letter.charCodeAt(i) - 64) * 26 ** (length - i - 1);
	  }

	  return column;
	};

	const getColAndRowFromCellAsNum = str => {
	  const regExRes = /(([A-Z]+)([0-9]+?)):/.exec(str);

	  if (!regExRes) {
	    throw new TypeError(`Not valid string to "getColAndRowFromCellAsNum".
			Expected something like "A3:B4", got ${str}`);
	  }

	  return {
	    col: letterToColumn(regExRes[2]),
	    row: Number(regExRes[3])
	  };
	};

	/**
	 * Z przekazanego zakresu jako stringa w formacie 'A1:B3'
	 * zwraca tylko pierwszą komórkę jako string. W tym przypadku 'A1'
	 *
	 * @param {String} str Zakres typu A1:B2, A1:2, A1:B
	 * @returns {String}
	 */
	const getFirstCellFromString = str => {
	  const regExRes = /([A-Z]+[0-9]+?):/.exec(str);

	  if (!regExRes) {
	    throw new TypeError(`Not valid string to "getFirstCellFromString".
			Expected something like "A3:B4", got ${str}`);
	  }

	  return regExRes[1];
	};
	/**
	 * BUG? Patern przepuszca sting A0:.... można by to poprawić kiedyś
	 */

	/* eslint-disable no-param-reassign */

	/**
	 * Zmienia numer kolumny na odpowiednią literę nagłowka (np. 1 na A).
	 * Wzięte stąd: https://stackoverflow.com/questions/21229180/convert-column-index-into-corresponding-column-letter
	 *
	 * @param {Number} column Numer kolumny
	 * @returns {String} Nagłówek kolumny
	 */
	const columnToLetter = column => {
	  let temp;
	  let letter = '';

	  while (column > 0) {
	    temp = (column - 1) % 26;
	    letter = String.fromCharCode(temp + 65) + letter;
	    column = (column - temp - 1) / 26;
	  }

	  return letter;
	};

	const isDate = val => val instanceof Date;

	/* eslint-disable complexity */

	const checkArr = arr => {
	  const booleanMap = arr.map(el => Array.isArray(el) ? checkArr(el) : el === 0 ? false : !el);
	  return !booleanMap.flat(10).some(el => el === false);
	};
	/**
	 * Sprawdza czy otrzymana wartość jest pusta.
	 * Zatem:
	 * [] = true, [[]] = true, [[[]]] = true, {} = true, [''] = true,
	 * { a: '' } = true, { a: [] } = true, { a: [[]] } = true,
	 *
	 * [[[1]]] = false, { a: [[1]] } = false, [0] = false,
	 * { a: 0 } = false, 0 = false
	 *
	 * Nie działa tylko poprawnie dla zagnieżdzonych obiektów
	 * [{}] - false / a powinno być true
	 *
	 * Nie działa poprawnie dla pusych komórek zawierających ukryte znaki
	 *
	 * @param {Any} input Dowolna wartość
	 * @returns {Boolean}
	 */


	const isEmpty = val => {
	  if (isDate(val)) {
	    return false;
	  }

	  if (Array.isArray(val)) {
	    return checkArr(val);
	  }

	  if (typeof val === 'object' && val !== null) {
	    return checkArr(Object.values(val));
	  }

	  return val === 0 ? false : !val;
	};

	const normalize = el => typeof el === 'string' ? el.replace(/[\t\r\n\s]+/g, '') : el;
	/**
	 * Zwraca numer ostatniej kolumny z treścią we wskazanym wierszu.
	 * Pomiędzy kolumnami z treścią mogą być kolumny puste. Nie wpływa
	 * to na ostateczny wynik. Dla pustego wiersza zwraca 0.
	 *
	 * QUnit zrobiony. Arkusz z przypadkami:
	 * https://docs.google.com/spreadsheets/d/1zxVvTtQAfOKT1jbExBEvh0ZetN5TfPv-TEgy6vHpGs0/edit#gid=349586621
	 *
	 * @param {Object} sheetObj Obiekt arkusza
	 * @param {String} colStr
	 * @returns {Number} Numer ostatniego wiersza z treścią
	 */


	const getLastNotEmptyColInRow = (sheetObj, rowNum) => {
	  const indexes = sheetObj.getRange(`${rowNum}:${rowNum}`).getValues().slice(0, 1).flat(1).map(normalize).map((el, i) => !isEmpty(el) ? i + 1 : 0); // const max = Math.max(...indexes);
	  // return max === 0 ? 0 : max + 1;

	  return Math.max(...indexes);
	};
	/**
	 * Todo:
	 * - obsługa błędów dla nieprawidłowych argumentów
	 */

	const normalize$1 = ([el]) => typeof el === 'string' ? el.replace(/[\t\r\n\s]+/g, '') : el;
	/**
	 * Zwraca numer ostatniego wiersza z treścią we wskazanej kolumnie.
	 * Pomiędzy wierszami z treścią mogą być wiersze puste. Nie wpływa
	 * to na ostateczny wynik. Dla pustej kolumny zwraca 0.
	 *
	 * QUnit zrobiony. Arkusz z przypadkami:
	 * https://docs.google.com/spreadsheets/d/1e7G8Yo8Np30bnyXzQm8NNyTZtBIZfK2eMjtd06f1GxM/edit#gid=0
	 *
	 * @param {Object} sheetObj Obiekt arkusza
	 * @param {String} colStr
	 * @returns {Number} Numer ostatniego wiersza z treścią
	 */


	const getLastNotEmptyRowInCol = (sheetObj, colStr) => {
	  const indexes = sheetObj.getRange(`${colStr}:${colStr}`).getValues().map(normalize$1).map((el, i) => !isEmpty(el) ? i + 1 : 0);
	  return Math.max(...indexes);
	};
	/**
	 * Todo:
	 * - możliwość przekazania równieć numeru kolumny
	 * - obsługa błędów dla nieprawidłowych argumentów
	 */

	/* eslint-disable max-params */

	const extendedColLetter = (startLetter, extendToRight) => {
	  const endNum = letterToColumn(startLetter) + extendToRight;
	  return columnToLetter(endNum);
	};
	/**
	 * Bierze zakres w formacie 'A1:E20'. Zwraca zakres ograniczony do liczby
	 * komórek w poziomie i pionie. Zwraca nowy zakres np. 'A1:B5'
	 *
	 * @param {String} range Zakres w formacie 'A1:B2'
	 * @param {Number} restHor Liczba komórek w poziomie
	 * która ma zostać w zakresie
	 * @param {Number} restVer Liczba komórek w pionie
	 * która ma zostać w zakresie
	 * @returns {String} Zakres po modyfikacjach
	 */


	const getRangeRestricted = (range, restHor = null, restVer = null) => pipe(() => /(([A-Z]+)([0-9]+?)):(([A-Z]+)?([0-9]+)?)/.exec(range), ([,, sChar, sNum,, eChar, eNum]) => ({
	  startLet: sChar,
	  startNum: Number(sNum),
	  endLet: eChar,
	  endNum: Number(eNum)
	}), ({
	  startLet,
	  startNum,
	  endLet,
	  endNum
	}) => ({
	  startLet,
	  startNum,
	  endLet,
	  endNum,
	  finalEndLet: restHor ? extendedColLetter(startLet, restHor - 1) : endLet,
	  finalEndNum: restVer ? startNum + restVer - 1 : endNum
	}), ({
	  startLet,
	  startNum,
	  finalEndLet,
	  finalEndNum
	}) =>
	/* Jeśli range występuje w formacie A1:9 lub A1:C
	dostajemy undefine jak eChar lub eNum - dltego
	zamieniamy na pusty, ignorowany string '' */
`${startLet}${startNum}:${finalEndLet || ''}${finalEndNum || ''}`	)();

	/* eslint-disable complexity */

	/**
	 * Zwraca informację o przekazanym rodzaju zakresu komórek.
	 * Zwraca kod typu:
	 * Dla A2:E4 -> regular;
	 * Dla A2 -> letNum;
	 * Dla A -> let;
	 * Dla 1 -> num;
	 * Dla '1' -> num;
	 * Dla innych wartości, lub "nie stringów" wyrzuca błąd
	 *
	 * @param {String} rangeStr Zakres
	 * @returns {String} kod
	 */
	const getRangeType = rangeStr => {
	  if (typeof rangeStr !== 'string' && typeof rangeStr !== 'number') throw new Error('Only string or numbers to getRangeType');
	  if (/:/.test(rangeStr)) return 'regular';
	  if (/[A-Z]+[1-9]+/.test(rangeStr)) return 'letNum';
	  if (/[A-Z]+/.test(rangeStr)) return 'let';
	  if (/[1-9]+/.test(rangeStr)) return 'num';
	  throw new Error('Not valid range');
	};

	/* eslint-disable max-params */
	/**
	 * Przyjmując 4 możliwe zapisy zakresu, zwraca m.in relatywny zakres
	 * uwzględniający znajdujące się w arkuszu dane. I tak dla przykładowego
	 * arkusza o wymiarach A1:J10 (10 x 10) po przekazaniu zakresu:
	 * 'A' - zakres zaczyna się od ostatniego pustego wiersza kolumny A,
	 * kończy się na ostatniej kolumnie. Np. A3:J
	 * '1' (lub 1) - zakres zaczyna się od ostatniej pustej kolumny wiersza 1,
	 * kończy się na ostatnim wierszu. Np. C1:J
	 * 'A1' - zakres zaczyna się w A1, kończy na ostatnim wierszu
	 * i kolumnie Np. A1:J10 (bez względu na znajdujące się już w arkuszu dane)
	 * 'A3:B5' zwraca nie zmieniony zakres.
	 *
	 * Jeśli dodatkowo zostaną przkazane argumenty restHor i/lub restVer
	 * wynikowy zakres będzie pomniejszony do przkazanej
	 * liczny wierszy (restVer) i/lub kolumn (restHor)
	 *
	 * Chcą podać tylko restVer należy przekazać restHor z wartością null
	 *
	 * @param {Object} sheetObj Obiekt arkusza
	 * @param {String|Number} strRange Zakres
	 * @param {Number|null} restHor Ograniczają zakres w poziomie traktując
	 * pierwszą komórkę (np. A1) jako początek zakresu. Zatem dla wynikowego
	 * zakresu np. A1:C3 dla restHor = 2 dostaniemy A1:B3
	 * @param {Number|null} restVer Ograniczają zakres w pionie traktując
	 * pierwszą komórkę (np. A1) jako początek zakresu. Zatem dla wynikowego
	 * zakresu np. A1:C3 dla restVer = 2 dostaniemy A1:C2
	 * @returns {Object} Obiekt o kluczach { range, rangeObj, sheetObj } gdzie
	 * range {String}, rangeObj {Object}, sheetObj {Object}
	 */

	const getRangeRelative = (sheetObj, strRange, restHor = null, restVer = null) => {
	  const opt = getRangeType(strRange);
	  let rangeTmp;

	  if (opt === 'letNum') {
	    const maxCols = sheetObj.getMaxColumns();
	    rangeTmp = `${strRange}:${columnToLetter(maxCols)}`;
	  }

	  if (opt === 'let') {
	    const maxColsLet = columnToLetter(sheetObj.getMaxColumns());
	    const starRow = getLastNotEmptyRowInCol(sheetObj, strRange) + 1;
	    rangeTmp = `${strRange}${starRow}:${maxColsLet}`;
	  }

	  if (opt === 'num') {
	    const maxRows = sheetObj.getMaxRows();
	    const startCol = getLastNotEmptyColInRow(sheetObj, strRange) + 1;
	    const startColLet = columnToLetter(startCol);
	    rangeTmp = `${startColLet}${strRange}:${maxRows}`;
	  }

	  if (opt === 'regular') {
	    rangeTmp = strRange;
	  } // Jeśli potrzeba zmiejszenia zakresu


	  const range = restHor || restVer ? getRangeRestricted(rangeTmp, restHor, restVer) : rangeTmp;
	  const rangeObj = sheetObj.getRange(range);
	  return {
	    range,
	    rangeObj,
	    sheetObj
	  };
	};
	/**
	 * Todo:
	 * - dla przekazanego normalnego zakresu (np. A1:B11) oraz zapisu A11
	 * mógłby sprawdzać czy pokrywa się z istniejącym zakresem całego
	 * arkusza (np. może nie być 11 wiersza)
	 */

	/**
	 * Weryfikuje czy przekazana wartośc jest tablicą 2d
	 *
	 * @param {Any} val Sprawdzana wartość
	 * @returns {Boolean} true / false
	 */
	const isArray2d = val => {
	  if (!Array.isArray(val)) return false;
	  if (!Array.isArray(val[0])) return false;
	  return true;
	};

	/**
	 * Sprawdza czy przekazana wartośc jest obiektem
	 * arkusza (Sheet). Weryfikuje czy dostępna jest
	 * na nim metoda .activate()
	 *
	 * @param {Any} val Sprawdzana wartość
	 */
	const isSheet = val => !!val.activate;

	/* eslint-disable complexity */

	/**
	 * Usuwa zbędne kolumny i wiersze ze wskazanego arkusza
	 *
	 * @memberof Lib_Gas
	 *
	 * @param {object} sheetObj Obiekt arkusza
	 * @returns {void}
	 */
	const removeEmptyRowCol = sheetObj => {
	  const frozenRows = sheetObj.getFrozenRows();
	  const maxDataRow = sheetObj.getLastRow();
	  const maxTotalRow = sheetObj.getMaxRows();
	  const rowDif = maxTotalRow - maxDataRow;
	  const frozenCols = sheetObj.getFrozenColumns();
	  const maxDataColumn = sheetObj.getLastColumn();
	  const maxTotalColumn = sheetObj.getMaxColumns();
	  const colDif = maxTotalColumn - maxDataColumn;

	  try {
	    if (rowDif + frozenRows !== maxTotalRow && maxDataRow !== 0 && rowDif > 0) sheetObj.deleteRows(maxDataRow + 1, rowDif);
	    if (colDif + frozenCols !== maxTotalColumn && maxDataColumn !== 0 && colDif > 0) sheetObj.deleteColumns(maxDataColumn + 1, colDif);
	  } catch (error) {
	    throw new Error(error);
	  }
	};

	/**
	 * Usuwa wszelkie filtry we wskazanym arkuszu
	 * Jako arkusz przyjmuje obiekt arkusza.
	 *
	 * @param {Object} sheetObj Nazwa arkusza
	 * @param {string} [fileId] Id pliku
	 * @returns {Object} Obiekt arkusza
	 */

	const removeFilter = sheetObj => {
	  if (!isSheet(sheetObj)) throw new TypeError('Not Sheet Object was pased into "removeFilter"');
	  const filter = sheetObj.getDataRange().getFilter();
	  if (filter) filter.remove();
	  return sheetObj;
	};

	/**
	 * Sprawdza czy przekazana wartość jest poprawnym identyfikatorem kolumny.
	 * Jako taki przyjmuje tylko integer lub string w formacie 'AA'
	 *
	 * @param {Number|String} col
	 * @returns {Boolean}
	 */
	const isColumn = col => typeof col === 'number' && col > 0 || typeof col === 'string' && /^[A-Z]+((?![1-9]|).)*$/.test(col);

	/* eslint-disable max-params */
	const dirs = {
	  az: true,
	  asc: true,
	  za: false,
	  des: false
	};

	const errorHandling = (sheetObj, col, dir) => {
	  if (typeof sheetObj !== 'object') throw new TypeError('Sheet object was not passed into "sortColumn"');
	  if (!isColumn(col)) throw new TypeError('Wrong type as "col" to "sortColumn" provided');
	  if (dirs[dir] === undefined) throw new TypeError('Only "az", "asc", "za", "des" may be passed as dir to "sortColumn"');
	};
	/**
	 * Sortuje wkazaną kolumnę w przekazanym obiekcie arkusza.
	 * Jako kolumnę przyjmuje zarówno numer jak i identyfikator (np. A).
	 * Jako kolejność sortowania przyjmuje jeden ze stringów:
	 * az, asc (rosnąco), za, des (malejąco).
	 * Jeśli w arkuszu znajdują się headery (frozen) pozostawia je nietknięte
	 * Jeśli kolumna poza zakresem, nic nie robi - zwraca obiekt arkusza
	 *
	 * PRZETESTOWANA (test zbudowany)
	 *
	 * @param {Object} sheetObj
	 * @param {Number|String} col 1, 2, itd. lub 'A', 'AB' itd.
	 * @param {String} dir Opcjonalny kierunek sortowania (domyślnie az)
	 * az, asc (rosnąco), za, des (malejąco).
	 * @returns {Object} Zwraca obiekt arkusza
	 */


	const sortColumn = (sheetObj, col, dir = 'az') => {
	  errorHandling(sheetObj, col, dir);
	  const colNum = typeof col === 'number' ? col : letterToColumn(col);

	  if (colNum > sheetObj.getMaxColumns()) {
	    console.log('Col number is grater than max columns');
	    return sheetObj;
	  }

	  return sheetObj.sort(colNum, dirs[dir]);
	};

	/* eslint-disable max-params */

	const typeGuard = (sheetObj, range, arr, opt) => {
	  if (!isSheet(sheetObj)) throw new TypeError('Only Sheet objecta are alowed in "paste"');
	  if (typeof range !== 'string' && typeof range !== 'number') throw new TypeError('Range should be string or number in "paste"');
	  if (!isArray2d(arr)) throw new TypeError('Only 2D arrays are alowed to "paste"');

	  if (opt.restrictCleanup) {
	    if (!['down', 'right', 'preserve'].includes(opt.restrictCleanup)) throw new TypeError('Wrong keyword passed as "restrictCleanup" to "paste"');
	  }
	};

	const getRange = (status, sheetObj, userRange, restHor, restVer) => {
	  /* Usuwa tylko dane w doł od komórki startowej
	  w kolumach w których znajdują się wklejane dane.
	  Przydatna do wklejania danych ciągnących się w dół
	  w arkuszach w których znajują się inne dane po prawej */
	  if (status === 'down') {
	    return getRangeRelative(sheetObj, userRange, restHor);
	  }
	  /* Usuwa tylko dane znajdujące się prawej stronie
	  komórki startowej i tylko w wierszach zajmowanych przez nowe
	  dane. Przydatne do wklejania "szerokich, ale nie wysokich"
	  danych ciągnących się w poziomie (rzadko stosowane) */


	  if (status === 'right') {
	    return getRangeRelative(sheetObj, userRange, null, restVer);
	  }
	  /* Domyślna wartość - od górnej lewej komórki do końca
	  w prawo i w dół  */


	  return getRangeRelative(sheetObj, userRange);
	};

	const defaults = {
	  /* Usuwanie filtrów */
	  notRemoveFilers: false,

	  /* Sortowanie kolumn numer (1) lub string ('A') */
	  sort: false,

	  /* Kolejność sortowania. Możliwe: 'az', 'za', 'asc', 'des' */
	  sortOrder: false,

	  /** Usuwanie istniejących przed wklejeniem treści:
	   * false - usuwa wszystko na prawo i w doł od lewej komórki
	   * down - usuwa wszystko w dół. Po prawej tylko na szerokość danych
	   * right - usuwa wszystko po prawej. W dół tylko do wysokości danych
	   * preserve - nic nie usuwa
	   */
	  restrictCleanup: false,

	  /* Usuwanie pustych kolumn i wierszy z arkusza (po wklejeniu) */
	  notRemoveEmptys: false
	};
	/**
	 * Wkleja przekazaną tablicę danych w określone miejsce przekazanego
	 * arkusza.
	 * Przyjmując 4 możliwe zapisy zakresu (określające lewy górny róg
	 * gdzie mają być wklejone dane):
	 * 1) Identyfikator kolumny np.'A' - zakres zaczyna się od ostatniego
	 * pustego wiersza kolumny A,
	 * 2) Numer wiersza - np. '1' (lub 1) - zakres zaczyna się od ostatniej
	 * pustej kolumny wiersza 1,
	 * 3) Pełny adres komórki - np. A1 - zakres zaczyna się w A1 bez względu
	 * na znajdujące się już w arkuszu dane).
	 * 4) Przekazanie całego zakresu (np. A1:B2) działa tak samo jak wyżej.
	 * Tylko pierwsza komórka brana jest pod uwagę (BUG - nie czyści wtedy
	 * istniejących danych)
	 *
	 * Domyślnie przed wklejeniem danych usuwa treści już istniejące
	 * poniżej oraz po prawej lewego górnego rogu obszaru do wklejenia
	 * nowych danych. Można to zachowanie zmienić w ustawieniach (obiekt opt)
	 *
	 * Domyśline przed wklejeniem usuwa istniejące filtry.
	 *
	 * Domyśline po wklejeniu usuwa puste kolumny (po prawej)
	 * i wiersze (poniżej)
	 *
	 * Funkcja przyjmuje opcjonalny obiekt z dalszymi ustawieniami
	 *
	 * @param {Object} sheetObj Obiekt arkusza
	 * @param {String|Number} userRange Np. 'A', 1, '1', 'A1', 'A1:B2'
	 * @param {Array[]} data Dane do wklejenia
	 * @param {Object} [opt=defaults] Dalsze parametry
	 * @returns {Object} Obiekt arkusza do dalszych manipulacji
	 */

	const paste = (sheetObj, userRange, data, opt = defaults) => {
	  // Sprawdzenie typów
	  typeGuard(sheetObj, userRange, data, opt); // Jeśli nie ma co wklejać zwraca nie tknięty arkusz

	  if (data.length === 0) return sheetObj;
	  /* ---- Właściwa funkcja ----------------------------- */
	  // Upraszczamy składnię

	  const dataWidth = data[0].length;
	  const dataHeight = data.length; // Pobierz zakres do pracy (obiekt)

	  const {
	    range,
	    rangeObj
	  } = getRange(opt.restrictCleanup, sheetObj, // Na wypadek przekazania pełnego zakresu
	  typeof userRange === 'string' && userRange.includes(':') ? getFirstCellFromString(userRange) : userRange, dataWidth, dataHeight); // Usuwamy filtry

	  if (!opt.notRemoveFilers) {
	    removeFilter(sheetObj);
	  } // Sortujemy


	  if (opt.sort) {
	    sortColumn(sheetObj, opt.sort, opt.sortOrder || 'az');
	  } // Usuwamy kontent


	  if (opt.restrictCleanup !== 'preserve') {
	    /* Sprawdzamy czy lewa komórka zakresu zawiera się w istniejącycm
	    arkuszu - dla komórki wychodzącej poza nie ma potrzeby
	    czyścić danych */
	    const {
	      col,
	      row
	    } = getColAndRowFromCellAsNum(range);

	    if (sheetObj.getMaxColumns() >= col && sheetObj.getMaxRows() >= row) {
	      rangeObj.clearContent();
	    }
	  } // Wklejka


	  sheetObj.getRange(Number(/[0-9]+/.exec(range)[0]), letterToColumn(/[A-Z]+/.exec(range)[0]), dataHeight, dataWidth).setValues(data); // Usuwa puste kolumny i wiersze

	  if (!opt.notRemoveEmptys) {
	    removeEmptyRowCol(sheetObj);
	  } // Zwrotka arkusza


	  return sheetObj;
	};

	/* eslint-disable max-params */
	/* ***************** Helpers ******************* */

	/**
	 * @type {array[]} Docelowa tablica na dane z czasami wykonywania funkcji
	 */

	const loggerRes = [];
	/**
	 * Template rodzaju testu
	 * @param {string} jobType
	 * @returns {(callback: function, identifier: string, task: string) => any}
	 */

	const run = jobType => (callback, identifier, task) => () => performanceCheckerObj(loggerRes, callback, identifier, task, jobType);

	const runJbJ = run('Job By Job');
	const runTbT = run('Task By Task');
	/**
	 * Wkleja tablicę z czasami do wskazanego arkusza
	 * @param {string} sheet
	 */

	const printTimes = sheet => () => paste(getSheet(sheet), 'A', loggerRes, {
	  notRemoveFilers: true,
	  restrictCleanup: 'preserve'
	});
	/**
	 * Odpala wskazaną liczbę razy przekazaną funkcję (callback) wklejając
	 * wyniki (czasy wykonania) do wskazanego arkusza
	 *
	 * @param {number} quant Liczba wykonań testu
	 * @param {function} callback Funkcja do wykonania
	 * @param {function} testTypeCallback Funkcja z konkretnym rodzajem eksperymentu (jbj|tbt)
	 * @param {string} desc Opis co robi funkcja (np. 'Wklejenie danych (cache)') pojawi się w tabeli jako opis zadania
	 * @param {string} resSheet Nazwa arkusza do którego mają być wklejone wyniki (czasy)
	 * @returns {function} Zwraca funkcję gotową do odpalenia
	 */


	const fire = (quant, callback, testTypeCallback, desc, resSheet) => pipe(testTypeCallback(quant, callback, desc), printTimes(resSheet));

	/* eslint-disable max-params */
	/* ***************** Strukrura testów ******************* */

	/**
	 * Odpalenie 'times' razy każdego zadania i przejście do następnego
	 * @param {number} times
	 * @param {function} callback Którą funkcję mam zastosowac
	 * @param {string} desc Opis np. Wklejenie danych (external)
	 */

	const jbj = (times, callback, desc) => () => {
	  looper(times, runJbJ(callback('l100'), 'Arr 1: 100', desc));
	  looper(times, runJbJ(callback('l200'), 'Arr 2: 200', desc));
	  looper(times, runJbJ(callback('l500'), 'Arr 3: 500', desc));
	  looper(times, runJbJ(callback('l1000'), 'Arr 4: 1000', desc));
	  looper(times, runJbJ(callback('l2000'), 'Arr 5: 2000', desc));
	  looper(times, runJbJ(callback('l4000'), 'Arr 6: 4000', desc));
	  looper(times, runJbJ(callback('l8000'), 'Arr 7: 8000', desc));
	  looper(times, runJbJ(callback('l16000'), 'Arr 8: 16000', desc));
	};
	/**
	 * Odpalenie 'times' razy sekwencji składającej się ze wszystkich zadań
	 * @param {number} times
	 * @param {function} callback
	 * @param {string} desc Opis np. Wklejenie danych (external)
	 */


	const tbt = (times, callback, desc) => () => {
	  looper(times, () => {
	    runTbT(callback('l100'), 'Arr 1: 100', desc)();
	    runTbT(callback('l200'), 'Arr 2: 200', desc)();
	    runTbT(callback('l500'), 'Arr 3: 500', desc)();
	    runTbT(callback('l1000'), 'Arr 4: 1000', desc)();
	    runTbT(callback('l2000'), 'Arr 5: 2000', desc)();
	    runTbT(callback('l4000'), 'Arr 6: 4000', desc)();
	    runTbT(callback('l8000'), 'Arr 7: 8000', desc)();
	    runTbT(callback('l16000'), 'Arr 8: 16000', desc)();
	  });
	};

	const DESC = 'Odczyt danych ';
	/**
	 * Obiekt ze wszystkimi callbackami do eksperymetów
	 */

	const exps = {
	  /* LOCAL */
	  localJbJ: fire(30, getLocal, jbj, `${DESC}(local)`, SHEETS.LOCAL),
	  localTbT: fire(30, getLocal, tbt, `${DESC}(local)`, SHEETS.LOCAL),

	  /* EXTERNAL */
	  extJbJ: fire(30, getExternal, jbj, `${DESC}(external)`, SHEETS.EXTER),
	  extTbT: fire(30, getExternal, tbt, `${DESC}(external)`, SHEETS.EXTER),

	  /* CACHE */
	  cacheJbJ: fire(50, getCache, jbj, `${DESC}(cache)`, SHEETS.CACHE),
	  cacheTbT: fire(50, getCache, tbt, `${DESC}(cache)`, SHEETS.CACHE)
	};

	// @ts-nocheck
	global.menu = {
	  test: () => console.log('hello'),
	  exps,
	  regenerateCache
	};

	const menu = () => {
	  const ui = SpreadsheetApp.getUi();
	  ui.createMenu('ICON').addSubMenu(ui.createMenu('Exp: Odczyt lokalnie').addItem('Job by Job', 'menu.exps.localJbJ').addItem('Task by Task', 'menu.exps.localTbT')).addSeparator().addSubMenu(ui.createMenu('Exp: Odczyt external').addItem('Job by Job', 'menu.exps.extJbJ').addItem('Task by Task', 'menu.exps.extTbT')).addSeparator().addSubMenu(ui.createMenu('Exp: Odczyt cache').addItem('Job by Job', 'menu.exps.cacheJbJ').addItem('Task by Task', 'menu.exps.cacheTbT').addSeparator().addItem('Regenerate cache', 'menu.regenerateCache')).addSeparator().addItem('Test', 'menu.test').addSeparator().addItem('Update menu', 'onOpen').addToUi();
	};

	// @ts-nocheck

	global.onOpen = () => {
	  menu();
	};

})));
