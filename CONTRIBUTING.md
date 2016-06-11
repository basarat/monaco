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

install travis `gem install travis`

## Github push
* Generate a valid token in the github project settings page
* run `travis encrypt -r <USER>/<REPOSITORY> GH_TOKEN=<GH-TOKEN> --add env.global`. This should setup `env.global.secure` in your `.travis.yml`

Thi `GH-TOKEN` is used in our `after_success` script 🌹

## NPM
* NPM deploy setup by simply running `travis setup npm` (you get `travis` from `gem install travis`). Then setup the API key using https://github.com/npm/npm/issues/8970#issuecomment-122854271. This should setup `deploy.api_key.secure` in your `.travis.yml`

## Nighly
* Cron job setup using https://nightli.es/  (we also tried http://traviscron.pythonanywhere.com/ but it didn't work).
