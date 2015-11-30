'use strict';

const Warden = require('warden.js');
const toArray = Warden.Utils.toArray;
const glob = this;

/// {Mixed} -> {Boolean}
function isTrueObject(o) {
  return typeof o === 'object' && !Array.isArray(o);
}

/// {Mixed} -> {Boolean}
function isExist(o) {
  return typeof o !== 'undefined' && o !== null;
}

function resolve(r, data){
	console.log('RRRRRRRRRRRR');
	return typeof r === 'function' ? r(data) : r;
}

/// {String, Object} -> {String}
/// {String, {...}} -> {String}
function interpolate(str) {
  var data = {},
      argc = arguments.length,
      argv = toArray(arguments),
      reg = /{{\s*[\w\.\/\[\]]+\s*}}/g;

  if (argc === 2 && isTrueObject(argv[1])){
    data = argv[1];
  }else {
    argv.slice(1, argc).forEach(function (e, i) {
      data[i] = e;
    });
  }

  return str.replace(reg, function (i) {
    var res = result(data, i.slice(2, -2)),
        arg = isExist(res) ? resolve(res, i.slice(2, -2)) : '';
    if (isTrueObject(arg)){
      arg = JSON.stringify(arg);
    }
    return arg;
  });
}

/// {Object, String} -> {Mixed}
function result(o, str) {
  return str.split('.').reduce(function (sum, prop) {
    if (~prop.indexOf('[')){
      var nth = Number(prop.match(/\[(.+?)\]/).pop());
      var nprop = prop.match(/(.+?)\[*/).pop();
      sum = sum[nprop][nth];
    }else {
      sum = sum[prop];
    }
    return sum;
  }, o);
}

module.exports = {
	fs:  (fn, ctx) => {
		return function(){
			let args = toArray(arguments);
			return Warden.Stream((fire) => {
				args.push((err, data) => {
					if (err) {
						throw err;
					}

					fire(data);
				});

				fn.apply(ctx || glob, args);
			});
		}
	},

	filterBy: (prop, value) => {
		return function(x){
			return x[prop] === value;
		}
	},

	toObject: (arr) => {
		return arr.reduce((sum, cur) => {
			let name = cur.name;
			delete cur.name;
			sum[name] = cur;
			return sum;
		}, {})
	},

	interpolate : interpolate
};

