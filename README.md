# Parse Server Firebase (Auth Only)

![npm](https://img.shields.io/npm/v/parse-server-firebase) ![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/parse-server-firebase) ![NPM](https://img.shields.io/npm/l/parse-server-firebase)

## Note

This is just a fork of the original [Parse Server Firebase package](https://github.com/L3K0V/parse-server-firebase) with only the auth portion included. It was forked so that those who do not need the storage adapter will not be required to install the somewhat large sharp package

## Getting started

Install the module by npm

```
$ npm i -S parse-server-firebase-auth
```

or using yarn

```
$ yarn add parse-server-firebase-auth
```

## Fireabse Auth Adapter

> Based on: https://github.com/parse-server-modules/parse-server-firebase-auth-adapter

```bash
FIREBASE_SERVICE_ACCOUNT="$(< firebaseAccountKey.json)"
```

`FIREBASE_SERVICE_ACCOUNT` can be specified as the string content of the credentials JSON file or can be specified as a path to the JSON file by using:

```bash
FIREBASE_SERVICE_ACCOUNT="/relative/to/project/firebaseAccountKey.json"
```

### Add adapter to your Parse Server

```ts
import { ParseServer } from 'parse-server'
import { FirebaseAuthAdapter } from 'parse-server-firebase-auth'
...
const parserServer = new ParseServer({
  appId: "APP_ID",
  appName: "APP NAME",
  ...
  auth: {
    firebase: new FirebaseAuthAdapter()
  }
})
```

### Authenticate

```bash
curl -X POST \
  {{host}}/parse/users \
  -H 'content-type: application/json' \
  -H 'x-parse-application-id: {{ParseAppId}}' \
  -d '{
    "authData": {
    	"firebase": {
    		"access_token": "{{firebase_access_token}}",
    		"id": "{{firebase_user_uid}}"
    	}
    }
}'
```

## Why so?

Based on previous adapters provided by the parse community this repository provides firebase adapters and extensions rewritten in TypesScript and newer features in JavaScript for Parse Server.

This package solves few issues. When setup firebase admin NodeJS SDK a credentials file is required. The previous adapters requires the credentials file to be specified by path. In some scenarios this is not aplicable because track the credentials file into the version control system is not good. This package will combine and contains everything needed for all of the service integration supported with Parse Server. In addition provided by this package storage adapter adds support for streaming of files.
