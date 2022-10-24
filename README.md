# create-react-app-amplify-templates

[Create React App](https://github.com/facebook/create-react-app) + [AWS Amplify](https://aws.amazon.com/amplify/) templates. Will use `latest` version of Amplify + Amplify UI.

## Usage

Since these templates are not published to NPM, you'll need to clone this repo, and run the following (replacing the path with your local path):

```bash
npx create-react-app react-amplified --template file:/Volumes/workplace/create-react-app-amplify-templates/js/cra-template-amplify-base &&
cd react-amplified &&
yarn &&
amplify init &&
yarn start
```

## cra-template-amplify-base

Basic template that installs Amplify + Amplify UI, and adds the configuration step to `index.js`.

## cra-template-amplify-ui

Same as `cra-template-amplify-base`, but with Amplify UI components + navigation using React Router.

## cra-template-amplify-ui

Same as `cra-template-amplify-base`, but with html UI components + navigation using React Router.

## `ts` templates

Same as the above, but with TypeScript.

## Reference

- [Getting Started](https://create-react-app.dev/docs/getting-started) – How to create a new app.
- [User Guide](https://create-react-app.dev) – How to develop apps bootstrapped with Create React App.
- [Amplify Docs](https://docs.amplify.aws/) -
