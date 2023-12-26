# update-secret-action

The Github action updates a secret (in a repository or organization).

## Inputs

### `key`

**Required** The key of a created or updated secret / variable in Github. 

### `value`

**Required** The new value for a secret or variable.

### `level`

Where save a secret — in a `repository` or `organization`. Default `"repository"`.

### `token`

**Required** A token with permission to create secrets in an organization or repository.

### `type`

It is a `variable` or `secret`. Default `"secret"`.

### `visibility`

Visibility level for organization's secrets. Options: `"all"`, `"private"` or `"selected"`. Default `"private"`.

## Outputs

No outputs.

## Example usage

```yaml
uses: asman-go/update-secret-action@v0.1
with:
  key: SECRET_KEY
  value: SECRET_VALUE
  token: ${{ secrets.PAT_GITHUB_TOKEN }}
```

# Local developing

## Install

```
npm i
```

## Release

- With workflows: https://github.com/github-developer/javascript-action
- https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action
