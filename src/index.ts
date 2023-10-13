import * as admin from 'firebase-admin'
import { required } from './utils'

const serviceAccount = required("FIREBASE_SERVICE_ACCOUNT_KEY");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    //databaseURL: "https://<DATABASE_NAME>.firebaseio.com"
});

// Returns a promise that fulfills if this app id is valid.
function validateAppId(): Promise<void> {
//export function validateAppId(appIds, authData, options): Promise<void> {
    return Promise.resolve()
}

/**
 * Validates the auth data that is sent to parse.
 * 
 * @param authData The auth data received from Parse loginWith
 * @param options The options passed along with the call such as username, email, password 
 * @returns 
 */
async function validateAuthData(authData: {id: string, access_token: string}): Promise<void> {
    try {
        if (!(authData?.id?.trim() && authData?.access_token?.trim())){
            throw new Parse.Error(Parse.Error.VALIDATION_ERROR, 'Both user id and access token are required.')
        }
        const decodedToken = await admin.app('auth').auth().verifyIdToken(authData.access_token)
        if (decodedToken && decodedToken.uid === authData.id) {
            return;
        }
        throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'Firebase auth not found for this user.')
    }
    catch (error) {
        throw new Parse.Error(Parse.Error.SCRIPT_FAILED, `Firebase auth verification failed. The error was ${error}`)
    }
}


module.exports = {
    validateAppId,
    validateAuthData,
  };
