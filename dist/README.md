# @dataunion/authentication

---

# Introduction

In just five minutes, you can configure your app to use DataUnion's API endpoints! @dataunion-authentication is a JavaScript plugin for simplifying the DataUnion authentication process.

Click here to [get started](#get-started) with our examples in React and Vanilla JS.

If you want to add more examples (i.e. Angular, Vue, React Native) please create a [pull request](#pull-requests).

---

- [Get Started 🌱](#get-started)
- [Examples 🧜‍♀️](#examples)
- [Documentation 🌸](#all-functions)
- [Pull Requests 📝](#pull-requests)
- [Publishing New Version 🤸](#publishing-new-version)
- [Credits 🐻](#credits)

---

# Get Started 🌱

Step 1 to using any DataUnion API is injecting web3. You can inject web3 into your project manually, or you can use our function `injectWeb3()`, found on the `DataUnionWeb3` class. 

Step 2 to using any DataUnion API is logging your user in by getting them access tokens, which is done with the `fullLogin()` function on the `duAuth` import (`duAuth` is an instance of the class `DataUnionAuth`).

Step 3 is setting a refresh cycle so that the user's token never expires, which is done with the `refresh()` function on the `duAuth` class. 

The following code is all that's needed to log a user in:

```javascript
import duAuth, { duWeb3Injecter } from '@dataunion/authentication';    

var accessToken;
var refreshToken;

// duWeb3Injecter is an instance of the class, 'DataUnionWeb3'
// this function makes window.web3 defined.
var ethAddress = await duWeb3Injecter.enableEthereumAndGetAddress();

// Log the user in
if (window.web3 != undefined) {
    var loginTokens = await duAuth.fullLogin(ethAddress);
    accessToken = loginTokens.accessToken;
    refreshToken = loginTokens.refreshToken;
}

// refresh their token every 15 minutes
setTimeout(() => {
    var newTokens = await duAuth.refresh(refreshToken);
    accessToken = newTokens.accessToken;
}, 900000)  

```

There you have it! Your logged in user with an automatically refreshing login. You can now use `accessToken` to access the entire [DataUnion SDK](https://github.com/DataUnion-app/examples).

You will need to handle the security of the user's tokens on your app.

See examples of this library in simple apps below.

---

# Examples 🧜‍♀️

- [React](https://github.com/DataUnion-app/authentication-examples/tree/main/react)
- [Vanilla JS](https://github.com/DataUnion-app/authentication-examples/tree/main/vanilla)

---

# Documentation 🌸 

For the expanded docs, [click here](https://github.com/DataUnion-app/authentication/docs). If you have further questions do not hesitate to join our [Discord](https://discord.gg/4c8puCNqrR) and [Telegram](https://t.me/dataunionapp) and reach out to the technical team. We are happy to help!

@dataunion/authentication contains the following classes:

```javascript 
import { DataUnionAuth, DataUnionWeb3, ApiCalls } from '@dataunion/authentication'

var customBackendUrl = 'https://crab.dataunion.app/'; 
var logErrors = true; 

const duAuth = new DataUnionAuth(logErrors); 
const apiCalls = new ApiCalls(customBackendUrl);   
const duWeb3 = new DataUnionWeb3(); 
```

@dataunion/authentication contains the following functions under `DataUnionAuth()`, for controlling user log in:

- `duAuth.registerNewAddress(ethAddress)` - Calls `/register` API, returns `nonce`.
- `duAuth.getNonceForExistingAddress(ethAddress)` - Calls `/get-nonce` API, returns `nonce`.
- `duAuth.registerOrGetNonceAuto(ethAddress, registerFirst)` - Calls `/register`, if that fails, calls `/get-nonce`. You can choose to try `/register` or `/get-nonce` first, using the `registerFirst` boolean parameter. Returns `nonce`.
- `duAuth.getSignature(ethAddress, nonce)` - calls the web3 sign method. Requires web3 to be initialized in the browser; `window.web3` must be defined. Returns `signature`.
- `duAuth.getJWTToken(signature)` - Calls `/login` API with the given signature. Returns `tokens`.
- `duAuth.fullLogin(ethAddress)` - Calls all the necessary above APIs; automates the login process, for the given `ethAddress`. Returns `tokens`.
- `duAuth.refresh(refreshToken)` - Calls `/refresh` API with the given `refreshToken`. Returns `tokens`, provided the `refreshToken` is valid. 

[See source code](https://github.com/DataUnion-app/authentication/pulls/src/main.js)

---

@dataunion/authentication contains the following functions under `ApiCalls()`, for calling authentication APIs directly:

- `apiCalls.register(ethAddress, logErrors=false)` - Calls `/register` API. Returns a `nonce`.
- `apiCalls.getNonce(ethAddress, logErrors=false)` - Calls `/get-nonce` API. Returns a `nonce`.
- `apiCalls.sign(ethAddress, nonce, logErrors=false)` - Calls `window.web3.eth.personal` API. Requires that `window.web3` is initialized. Returns a `signature`.
- `apiCalls.login(ethAddress, signature, logErrors=false)` - Calls `/login` API. Returns `tokens`.
- `apiCalls.refresh(refreshToken, logErrors=false)` - Calls `/refresh` API. Returns `tokens`.

[See source code](https://github.com/DataUnion-app/authentication/pulls/src/api.js)

---

@dataunion/authentication contains the following functions under `DataUnionWeb3()`, for initializing Web3: 

- `duWeb3.enableEthereumAndGetAddress()` - Injects web3 through the `window.ethereum` provider, returns checksum address if the user is logged in with Metamask.

[See source code](https://github.com/DataUnion-app/authentication/pulls/src/loadWeb3.js)

---

# Pull Requests - [Click here](https://github.com/DataUnion-app/authentication/pulls) 📝

If you want to add new examples (i.e. for injecting the library into other JavaScript frameworks), we will add you to the credits section. Feel free to open a pull request and explain briefly what your example does. 

---

# Publishing New Version 🤸

If you have permission and are logged in to the [npmjs registry](), publish a new version with the following commands:

1. `npm run-script build` or `npm run-script build-windows`
2. `cd dist`
3. Remove the `"files"` option from `dist/package.json` and change the version to the next number.
4. `npm publish`

---

# Credits 🐻

- [Sarah Kay]()
- [Robin Lehmann]()
- [Akshay Patel]()