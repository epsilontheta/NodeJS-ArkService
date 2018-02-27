/*jshint esversion: 6 */

module.exports = function(settings) {
	var sqlite3 = require('sqlite3').verbose();
	var db = new sqlite3.cached.Database(settings.server_config.db_file);

	var module = {};
	module.getTribe = (id, cb) => {
		db.serialize(() => {
			db.get("select * from tribes where tribeid = ?", id, function(e, d) {
				cb(d);
			});
		});
	};

	module.listTribes = (options, cb) => {
		if (cb === undefined) {
			cb = options;
		}
		if (options.where === undefined) {
			db.all("select * from tribes", function(e, r) {
				if (e) {
					console.log(e);
				}
				if (options.array !== undefined && options.array === true) {
					cb(r);
				} else {
					var ret = {};
					r.forEach(elem => {
						ret[elem.Id] = elem;
					});

					cb(ret);
				}

			});
		} else {
			db.all("select * from tribes where " + options.where.name + " = ?", options.where.value, function(e, r) {
				if (e) {
					console.log(e);
				}
				if (options.array === true) {
					cb(r);
				} else {
					var ret = {};
					r.forEach(elem => {
						ret[elem.Id] = elem;
					});

					cb(ret);
				}
			});
		}
	};

	module.getTribeMembers = (id, cb) => {
		db.serialize(() => {
			db.all("select * from players where tribeid = ?", id, (e, r) => {
				cb(r);
			});
		});
	};

	module.getTribeLog = (id, cb) => {
		db.serialize(() => {
			db.all("select * from tribelogs where tribeid = ?", id, function(e, d) {
				cb(d);
			});
		});
	};
	
	return module;
}
