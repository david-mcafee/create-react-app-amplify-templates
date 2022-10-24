# cra-template-aws-amplify

This is a base template for [Create React App](https://github.com/facebook/create-react-app) and [AWS Amplify](https://aws.amazon.com/amplify/).

This base template installs Amplify and Amplify UI, and adds the configuration step to `index.js`.

## Usage

Since this template is not published to NPM, you'll need to clone this repo, and run the following (replacing the path with your local path):

```bash
npx create-react-app react-amplified --template file:/Volumes/workplace/create-react-app-amplify-templates/cra-template-amplify-base &&
cd react-amplified &&
yarn &&
amplify init &&
yarn start
```

## Reference

- [Getting Started](https://create-react-app.dev/docs/getting-started) – How to create a new app.
- [User Guide](https://create-react-app.dev) – How to develop apps bootstrapped with Create React App.
- [Amplify Docs](https://docs.amplify.aws/) -
