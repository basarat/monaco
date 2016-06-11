# Release

## Quickly

Quick workflow (runs `prepare` and `release`):

```sh
quick.sh
```

## Manually

```sh
prepare.sh
```

Manual verification here ... then:

```sh
release.sh
npm publish
```

# Travis

* install travis `gem install travis`
* now go to your repository directory

## Github push
* Generate a github token `settings -> personal access tokens -> generate new token` (give it `repo` access)
* run `travis encrypt -r <USER>/<REPOSITORY> GH_TOKEN=<GH-TOKEN> --add env.global`. This should setup `env.global.secure` in your `.travis.yml`

This `GH_TOKEN` is used in our `after_success` script (`release.sh` is doing the push) 🌹

```
after_success:
- git config credential.helper "store --file=.git/credentials"
- echo "https://${GH_TOKEN}:@github.com" > .git/credentials
- git config --global push.default matching
- bash release.sh
```

## NPM
* NPM deploy setup by simply running `travis setup npm` (you get `travis` from `gem install travis`). Then setup the API key using https://github.com/npm/npm/issues/8970#issuecomment-122854271. This should setup `deploy` (with `provider`,`email`,`api_key`,`on`) in your `.travis.yml`

## Nighly
* Cron job setup using https://nightli.es/  (we also tried http://traviscron.pythonanywhere.com/ but it didn't work).
