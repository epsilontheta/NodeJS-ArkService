# NodeJS-ArkService

This repository houses a NodeJS Web Service that lets you load all the data from your ARK server Asynchronously. The nodejs server must be on the same server that houses your ARK server in order for this to function properly. You also will need to open up the port you specify in the settings.json to the outside world.


## Setup

First you need to copy settings.json-example to settings.json and edit everything inside. Make sure nothing says **CHANGEME** when you are done. Also make note of your secret as you'll need it to setup your api key.

### API Key

There's currently no way to add your api key using the service yet, you'll have to open the sqlite file up in a sqlite browser and add the key yourself.

To generate a key, in nodejs run the following,

```
var key = 'YOUR KEY';
var hash = crypto.createHmac('sha256', 'YOURSECRET')
	.update(key)
	.digest('hex');
console.log(hash);
```

Change **YOUR KEY** to anything you want, but don't forget what you put there. Change YOURSECRET to what you have in your settings.json file. Then take what it outputs and put it into your sqlite database.


## API Calls

All api calls (unless otherwise noted) must be encoded as **application/json** and be a valid JSON call.

**getServerData**

```
POST: {api_key: YOURKEY}
RETURNS: {d:{mods:[],map:'',maxplayers:0}}
```

**getChat**

```
POST: {api_key: YOURKEY}
RETURNS: {chat:[]}
```

**listOnline**

```
POST: {api_key: YOURKEY}
RETURNS: {players:[]}
```


**saveWorld**

```
POST: {api_key: YOURKEY}
RETURNS: {text:'World Saved'}
```

**destroyDinos**

```
POST: {api_key: YOURKEY}
RETURNS: {text:'Wild Dinos Destroyed'}
```

**command**

```
POST: {api_key: YOURKEY, cmd: RCONCOMMAND}
RETURNS: {result:''}
```

**broadcast**

```
POST: {api_key: YOURKEY, msg: YOURMESSAGE}
RETURNS: {chat:'[ALL] YOURMESSAGE'}
```

**listTribes**

```
POST: {api_key: YOURKEY}
RETURNS: {d:[
{"Id":1234567890,
"Name":"",
"OwnerId":123456789,
"FileCreated":"2016-07-04 17:15:34",
"FileUpdated":"2016-07-09 15:10:33"}
]}
```

**listPlayers**

```
POST: {api_key: YOURKEY}
RETURNS: {d:[
{"Id":132456789,
"TribeId":123456789,
"Level":50,
"Engrams":1000,
"SteamId":"1234156748974",
"Admin":null,
"CharacterName":"",
"SteamName":"",
"ProfileUrl":"http://steamcommunity.com/id/",
"AvatarUrl":"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/",
"CommunityBanned":0,
"VACBanned":0,
"NumberOfVACBans":0,
"NumberOfGameBans":0,
"DaysSinceLastBan":0,
"FileUpdated":"2016-07-09 15:10:33",
"FileCreated":"2016-07-04 17:15:34"}
]}
```

**getPlayer**

```
POST: {api_key: YOURKEY, id: STEAMID}
RETURNS: {d:
{"Id":132456789,
"TribeId":123456789,
"Level":50,
"Engrams":1000,
"SteamId":"1234156748974",
"Admin":null,
"CharacterName":"",
"SteamName":"",
"ProfileUrl":"http://steamcommunity.com/id/",
"AvatarUrl":"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/",
"CommunityBanned":0,
"VACBanned":0,
"NumberOfVACBans":0,
"NumberOfGameBans":0,
"DaysSinceLastBan":0,
"FileUpdated":"2016-07-09 15:10:33",
"FileCreated":"2016-07-04 17:15:34"}
}
```
