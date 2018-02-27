/*jshint esversion: 6 */
module.exports = function(settings) {
	var sqlite3 = require('sqlite3').verbose();
	var db = new sqlite3.cached.Database(settings.server_config.db_file);

	var module = {};
	module.getPlayer = (steamid,cb) => {
		db.serialize(() => {
			db.get("select  * from players where steamid = ?",steamid,function(e,r){
				if(e) {
					console.log(e);
				}
				cb(r);
			});
		});
	};
	
//	params must be an object {name:'',value:''}!
	module.listPlayers = (where,cb) => {
		if(cb === undefined) {
			cb = where;
			db.all("select * from players",function(e,r){
				if(e) {
					console.log(e);
				}
				cb(r);
			});
		} else {
			db.all("select * from players where "+where.name+" = ?",where.value,function(e,r){
				if(e) {
					console.log(e);
				}
				cb(r);
			});
		}
	};
	
	return module;
}