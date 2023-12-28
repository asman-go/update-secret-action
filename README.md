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

**NB**: the `"selected"` visibility level has not worked yet.

Visibility level for organization's secrets. Options: `"all"`, `"private"` or `"selected"`. Default `"private"`.

## Outputs

No outputs.

## Example usage

We should mask a secret before sending it to our action.

```yaml
steps:
- name: Hide creds
  id: credentials
  run: |
    some_secret=$(...)
    echo "::add-mask::$some_secret"
    echo "some-secret=$some_secret" >> $GITHUB_OUTPUT
- uses: asman-go/update-secret-action@v0.1
  with:
    key: SECRET_KEY
    value: ${{ steps.credentials.outputs.some-secret }}
    token: ${{ secrets.GITHUB_TOKEN_WITH_PERMISSIONS }}
    level: organization
    visibility: all
- uses: asman-go/update-secret-action@v0.1
  with:
    key: VARIABLE_KEY
    value: VARIABLE_VALUE
    token: ${{ secrets.GITHUB_TOKEN_WITH_PERMISSIONS }}
    level: repository
```

# Local developing

## Install

```
npm i
```

## Release

- With workflows: https://github.com/github-developer/javascript-action
- https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action
