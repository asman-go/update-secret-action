import { getInput, setOutput, setFailed } from '@actions/core';
import { context } from '@actions/github';
import { GitHub } from '@actions/github/lib/utils';

import sodium from 'sodium-native';

const LEVELS = {
    repository,
    organization,
}

const TYPES = {
    secret,
    variable
}

const VISIBILITIES = {
    all,
    selected,
    privateVisibility: 'private'
}

const KEY = getInput('key');
const VALUE = getInput('value');

const LEVEL = getInput('level');  // Enum: LEVELS
const TYPE = getInput('type');  // Enum: TYPES
const VISIBILITY = getInput('visibility');  // Enum: VISIBILITIES

const TOKEN = getInput('token');

const github = new GitHub({
    auth: TOKEN
});

const getPublicKey = {
    repository: github.rest.actions[`getRepoPublicKey`],
    organization: github.rest.actions[`getOrgPublicKey`],
}

const createOrUpdateSecret = {
    repository: github.rest.actions[`createOrUpdateRepoSecret`],
    organization: github.rest.actions[`createOrUpdateOrgSecret`],
}

let publicKeyRequestParameters
let createOrUpdateRequestParameters

if (LEVEL === LEVELS.organization) {
    publicKeyRequestParameters = {org: context.repo.owner}
    createOrUpdateRequestParameters = {visibility: VISIBILITY}
}
if (LEVEL === LEVELS.repository) {
    publicKeyRequestParameters = {...context.repo}
    createOrUpdateRequestParameters = {}
}

const {
    data: {
        key: publicKey,
        key_id: keyId
    }
} = await getPublicKey[LEVEL](publicKeyRequestParameters);


if (publicKey) {
    const key = Buffer.from(publicKey, 'base64');
    const message = Buffer.from(VALUE);
    const ciphertext = Buffer.alloc(
        message.length + sodium.crypto_box_SEALBYTES
    );

    sodium.crypto_box_seal(ciphertext, message, key);
    const encryptedToken = ciphertext.toString('base64');

    await createOrUpdateSecret[LEVEL]({
        ...context.repo, 
        secret_name: KEY,
        encrypted_value: encryptedToken,
        key_id: keyId,
        ...createOrUpdateRequestParameters,
    });
}
else {
    core.error('Failed to fetch the public key. Unable to update secret');
}

// try {
//   // `who-to-greet` input defined in action metadata file
//   const nameToGreet = getInput('who-to-greet');
//   console.log(`Hello ${nameToGreet}!`);
//   const time = (new Date()).toTimeString();
//   setOutput("time", time);
//   // Get the JSON webhook payload for the event that triggered the workflow
//   const payload = JSON.stringify(context.payload, undefined, 2)
//   console.log(`The event payload: ${payload}`);
// } catch (error) {
//   setFailed(error.message);
// }
