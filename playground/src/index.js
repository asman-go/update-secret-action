import { Octokit } from "@octokit/rest";
import sodium from 'sodium-native';


const TOKEN = process.env.GITHUB_TOKEN
const VARIABLE_NAME = 'BUCKET_NAME'
const OWNER = 'asman-go'
const REPO = 'terraform-init'

const octokit = new Octokit({
    auth: TOKEN
})

const getRepoVariable = octokit.rest.actions[`getRepoPublicKey`]

let resp = await getRepoVariable({
    owner: OWNER,
    repo: REPO,
    name: VARIABLE_NAME
})

if ('name' in resp.data) {
    console.log('REPO', resp.data.name, resp.data.value)
}

resp = await octokit.rest.actions.getOrgVariable({
    org: OWNER,
    name: VARIABLE_NAME
})

if ('name' in resp.data) {
    console.log('ORG', resp.data.name, resp.data.value)
}

