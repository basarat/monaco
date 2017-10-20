# Why
A build of monaco:
* that we have more control over.
* exposing private stuff that we want to use
* not having it change under us as often 🌹

# How?
See `prepare.sh` for comments.

# Release

## Quickly

Quick workflow (runs `prepare` and `release` and releases):

```sh
quick.sh
```

If something goes wrong with our build we can use this to quickly do releases to see what's going on 🌹

## Manually

```sh
prepare.sh
```

Manual verification here ... then:

```sh
release.sh
npm publish
```

> If `quick` (or `prepare`) fails you might leave submodules dirty and prepare will not run again. Run `./reset.sh && ./quick.sh` (or `./reset.sh && ./prepare.sh`) to get around that.

> Note: once travis was setup to publish we don't need `npm publish` anymore.

# After jumping on a new machine
Run `resume.sh` to pull latest and disregard anything you have staged locally.

> We leave submodules dirty to ease debugging. But this can lead to difficulty in fetching latest `resume.sh` does the right thing :)

# Travis

This is just the documentation on how travis was setup to do automatic deploys (to help you with forks) 🌹

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
* Then setup the API key using https://github.com/npm/npm/issues/8970#issuecomment-122854271 (your `.npmrc` is usually at `c:\users\<name>\.npmrc`)
* NPM deploy setup by simply running `travis setup npm`. This should setup `deploy` (with `provider`,`email`,`api_key`,`on`) in your `.travis.yml`
* Since we want to deploy the `build` directory which is git ignored set `deploy.skip_cleanup: true`.

## Nighly
* Cron job setup using https://nightli.es/  (we also tried http://traviscron.pythonanywhere.com/ but it didn't work).
