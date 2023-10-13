# Parse Server Auth Firebase

![npm](https://img.shields.io/npm/v/parse-server-firebase-auth) ![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/parse-server-firebase-auth) ![NPM](https://img.shields.io/npm/l/parse-server-firebase-auth)

## Note

This is a fork of [Parse Server Firebase Package](https://github.com/L3K0V/parse-server-firebase-auth) rewritten to adhere to custom authentication api exposed by Parse Server 4 and above.

## Getting started

Install the module by npm

```
$ npm i -S parse-server-auth-firebase
```

or using yarn

```
$ yarn add parse-server-auth-firebase
```

## Firebase Auth Adapter

> Based on: https://github.com/parse-server-modules/parse-server-firebase-auth-adapter

```bash
FIREBASE_SERVICE_ACCOUNT_KEY="$(< firebaseAccountKey.json)"
```

`FIREBASE_SERVICE_ACCOUNT_KEY` can be specified as the string content of the credentials JSON file or can be specified as a path to the JSON file by using:

```bash
FIREBASE_SERVICE_ACCOUNT="/relative/to/project/serviceAccountKeyFilename.json"
```

### Add adapter to your Parse Server Config

```ts
import { ParseServer } from 'parse-server'
...
const parserServer = new ParseServer({
  appId: "APP_ID",
  appName: "APP NAME",
  ...
  auth: {
    firebase: {
     module: "parse-server-auth-firebase"
   }
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

Based on previous adapters provided by the parse community this repository provides firebase auth adapter rewritten in TypesScript and newer features in JavaScript for Parse Server. It also uses the latest npm packages as of Oct 2023.

This package solves few issues. When setup firebase admin NodeJS SDK a credentials file is required. The previous adapters requires the credentials file to be specified by path. In some scenarios this is not applicable because track the credentials file into the version control system is not good. This package will combine and contains everything needed for all of the service integration supported with Parse Server. In addition provided by this package storage adapter adds support for streaming of files.
