# update-secret-action
The Github action updates a secret (in a repository or organization)

## Inputs

### `who-to-greet`

**Required** The name of the person to greet. Default `"World"`.

## Outputs

### `time`

The time we greeted you.

## Example usage

```yaml
uses: actions/hello-world-javascript-action@e76147da8e5c81eaf017dede5645551d4b94427b
with:
  who-to-greet: 'Mona the Octocat'
```

# Local developing

## Install

```
npm i
```

## Release

https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action
