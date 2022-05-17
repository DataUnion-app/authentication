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
- [Pull Requests 🤸](#pull-requests)

---

# Get Started 🌱

Step 1 to using any DataUnion API is injecting web3. You can inject web3 into your project manually, or you can use our function `injectWeb3()`, found on the `DataUnionWeb3` class. 

Injecting web3 with our library is extremely simple:

```javascript
import { duWeb3Injecter } from '@dataunion/authenticate'    

// duWeb3Injecter is an instance of the class, 'DataUnionWeb3'
duWeb3Injecter.injectWeb3();
```

There you go!

You can also create your own instance of the class 'DataUnionWeb3', local to your project, and then call `injectWeb3` from the local instance. Like so:

```javascript
import { DataUnionWeb3 } from '@dataunion/authenticate'

const localDuWeb3Class = new DataUnionWeb3();
localDuWeb3Class.injectWeb3();
```

See examples of using this library below.

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

- `duWeb3.injectWeb3()` - Injects web3.

[See source code](https://github.com/DataUnion-app/authentication/pulls/src/loadWeb3.js)

---

# Pull Requests - [Click here](https://github.com/DataUnion-app/authentication/pulls)

If you want to add new examples (i.e. for injecting the library into other JavaScript frameworks), we will add you to the credits section. Feel free to open a pull request and explain briefly what your example does. 

---

# Credits

- [Sarah Kay]()
- [Robin Lehmann]()
- [Akshay Patel]()