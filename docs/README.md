# @dataunion/authenticate Documentation 🌸

Expanded, detailed documentation of @dataunion/authenticate. 🌸 If you have further questions do not hesitate to join our [Discord](https://discord.gg/4c8puCNqrR) and [Telegram](https://t.me/dataunionapp) and reach out to the technical team, we are happy to help!

- [All Classes 💥](#all-classes)
- [DataUnionAuth() Functions 🦚](#dataunionauth-functions)
- [ApiCalls() Functions 🐝](#apicalls-functions)
- [DataUnionWeb3() Functions 🌻](#dataunionweb3-functions)
- [Advanced Authentication 💡](#advanced-authentication)

---

## All Classes 💥

```javascript 
import { DataUnionAuth, DataUnionWeb3, ApiCalls } from '@dataunion/authentication'

///
/// Parameters for initializing classes
///
var customBackendUrl = 'https://crab.dataunion.app/'; // give ApiCalls() a backend url value. This is the default value if no parameter is passed.
var logErrors = true; // tell DataUnionAuth() to log errors or not. Default value is false.

///
/// CLASS INSTANCES 
///
const duAuth = new DataUnionAuth(logErrors);   // Contains most authentication functions.
const apiCalls = new ApiCalls(customBackendUrl);      // Contains fetch API calls to authentication endpoints.
const duWeb3 = new DataUnionWeb3();   // Contains Web3 initializers 
```

---

## DataUnionAuth() Functions 🦚

@dataunion/authentication contains the following functions under `DataUnionAuth()`, for controlling user log in:

#### `nonce` returners: 
- `duAuth.registerNewAddress(String ethAddress)` - calls the `/register` API on the given `ethAddress`. Returns a `nonce`
- `duAuth.getNonceForExistingAddress(String ethAddress)` - calls the `/get-nonce` API on the given `ethAddress`. Returns a `nonce`.
- `duAuth.getNonceAuto(String ethAddress)` - calls the `/register` API, if that fails, calls the `/get-nonce` API, on the given `ethAddress`. You can choose to try `/register` or `/get-nonce` first, using the `registerFirst` boolean parameter. Returns a `nonce`.

#### `signature` returners:
- `duAuth.getSignature(String ethAddress, String nonce)` - calls the web3 sign method. Requires web3 to be initialized in the browser; `window.web3` must be defined. Returns `signature`.

#### `tokens` returners:
- `duAuth.getJWTToken(String signature)` - Calls `/login` API with the given signature. Returns `tokens`.
- `duAuth.fullLogin(String ethAddress)` - Calls all the necessary above APIs; automates the login process, for the given `ethAddress`. Returns `tokens`.

#### `tokens` refreshers:
- `duAuth.refresh(String refreshToken)` - Calls `/refresh` API with the given `refreshToken`. Returns `tokens`, provided the `refreshToken` is valid. 

[See source code](https://github.com/DataUnion-app/authentication/pulls/src/main.js)

---

## ApiCalls() Functions 🐝

@dataunion/authentication contains the following functions under `ApiCalls()`, for calling authentication APIs directly. All of these functions accept a parameter called `logErrors` which determines whether or not the errors are console logged.

#### `nonce` returners: 
- `apiCalls.register(ethAddress, logErrors=false)` - Calls `/register` API. Returns a `nonce`.
- `apiCalls.getNonce(ethAddress, logErrors=false)` - Calls `/get-nonce` API. Returns a `nonce`.

#### `signature` returners:
- `apiCalls.sign(ethAddress, nonce, logErrors=false)` - Calls `window.web3.eth.personal` API. Requires that `window.web3` is initialized; please make sure you've injected web3 into your browser either manually or through `duWeb3.injectWeb3()`. Returns a `signature`.

#### `tokens` returners:
- `apiCalls.login(ethAddress, signature, logErrors=false)` - Calls `/login` API. Returns `tokens`.

#### `tokens` refreshers: 
- `apiCalls.refresh(refreshToken, logErrors=false)` - Calls `/refresh` API. Returns `tokens`.

[See source code](https://github.com/DataUnion-app/authentication/pulls/src/api.js)

---

## DataUnionWeb3() Functions 🌻

- `duWeb3.injectWeb3()` - Injects web3.

[See source code](https://github.com/DataUnion-app/authentication/pulls/src/loadWeb3.js)

---

## Advanced Authentication 💡

As shown in the quick tutorial on the home page, you only need to use `duWeb3.injectWeb3()`, `duAuth.fullLogin()` and `duAuth.refresh()` for the simplest log in. 

However, if you want more advanced control over your user authentication -- for example, if you want to have loading bars showing your users what stage of the authentication they're at -- you can do the process in more steps.

This is the simplest code for advanced login, assuming you have already injected web3.

```javascript
import duAuth, { duWeb3Injecter } from '@dataunion/authentication'

duWeb3Injecter.injectWeb3();
const ethAddress = window.web3.eth.accounts[0];

var nonce = await duAuth.registerOrGetNonceAuto(ethAddress);
var signature = await duAuth.getSignature(ethAddress, nonce);
var tokens = await duAuth.getJWTToken(signature);

setTimeout(() => {
    tokens = duAuth.refresh(tokens.refreshToken);
}, 900000)  
```

There are four things we need to worry about: getting a `nonce`, getting a `signature`, getting `tokens`, and then `refreshing tokens` every 15 minutes so that the user doesn't get logged out. Note that if you are using a custom backend url, your refresh time may be different, but the default should be 15 minutes or 900000 milliseconds.

1. Getting a nonce: 

```javascript
import duAuth, { duWeb3Injecter } from '@dataunion/authentication';  // duAuth is instance of DataUnionAuth()

duWeb3Injecter.injectWeb3();
const ethAddress = window.web3.eth.accounts[0];

/// SHORT WAY
var nonceShort = await duAuth.registerOrGetNonceAuto(ethAddress);

/// LONG WAY
var nonceLong;

duAuth.registerNewAddress(ethAddress).then(res => {
    nonceLong = res['nonce'];
}).catch(err => {
    console.log(err)
    duAuth.getNonceForExistingAddress(ethAddress).then(res => {
        nonceLong = res['nonce'];
    }).catch(err => console.log(err))
})
```

2. Getting a signature

```javascript 
import duAuth, { duWeb3Injecter } from '@dataunion/authentication'  // duAuth is instance of DataUnionAuth()

duWeb3Injecter.injectWeb3();
const ethAddress = window.web3.eth.accounts[0];

var nonce = await duAuth.registerOrGetNonceAuto(ethAddress);
var signature = await duAuth.getSignature(ethAddress, nonce);
```

3. Getting tokens

```javascript
import duAuth, { duWeb3Injecter } from '@dataunion/authentication'  // duAuth is instance of DataUnionAuth()

const ethAddress = window.web3.eth.accounts[0];

var nonce = await duAuth.registerOrGetNonceAuto(ethAddress);
var signature = await duAuth.getSignature(ethAddress, nonce);
var tokens = await duAuth.getJWTToken(signature);
```

4. Setting a refresh cycle
```javascript
import duAuth, { duWeb3Injecter } from '@dataunion/authentication'  // duAuth is instance of DataUnionAuth()

duWeb3Injecter.injectWeb3();
const ethAddress = window.web3.eth.accounts[0];

///
// getting tokens the slow way...
///
var nonce = await duAuth.registerOrGetNonceAuto(ethAddress);
var signature = await duAuth.getSignature(ethAddress, nonce);
var tokens = await duAuth.getJWTToken(signature);

setTimeout(() => {
    tokens = duAuth.refresh(tokens.refreshToken);
}, 900000)  

///
// Note that the above code is equivalent to...
///
var tokensFastWay = await duAuth.fullLogin(ethAddress);
setTimeout(() => {
    tokensFastWay = duAuth.refresh(tokens.refreshToken);
}, 900000) 
```