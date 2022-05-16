# @dataunion/authentication

---

# Introduction

In just five minutes, you can configure your app to use DataUnion's API endpoints! @dataunion-authentication is a JavaScript plugin for simplifying the DataUnion authentication process.

Click here to [get started](#get-started) with our examples in React and Vanilla JS.

If you want to add more examples (i.e. Angular, Vue, React Native) please create a [pull request](#pull-requests).

---

- [Get Started](#get-started)
- [All Functions](#all-functions)
- [Pull Requests](#pull-requests)

---

# Get Started 

Step 1 is injecting web3. We give you the option to inject web3 into your project manually, or to use our function `injectWeb3()`, found on the `DataUnionWeb3` class. 

Injecting web3 with our library is extremely simple:

```javascript
import { duWeb3Injecter } from '@dataunion/authenticate'    

// duWeb3Injecter is an instance of the class, 'DataUnionWeb3'
duWeb3Injecter.injectWeb3();
```

You can also create your own instance of the class 'DataUnionWeb3', local to your project, and then call `injectWeb3` from the local instance. Like so:

```javascript
import { DataUnionWeb3 } from '@dataunion/authenticate'

const localDuWeb3Class = new DataUnionWeb3();
localDuWeb3Class.injectWeb3();
```

---

- [React](#react)
- [Vanilla JS](#vanilla-js)

---

## React

We use this library in an [example React app](). Inject Web3 into your project and then inject @dataunion-authentication.

```javascript
```

---

## Vanilla JS

We have code to show you how you can [use this library with vanilla JavaScript and HTML](). 

Inject web3 into your project and then inject @dataunion-authentication. Ask your user to login with `authentication.fullLogin(ethAddress)`. Simple as!

```javascript
```

To test that authentication has succeeded, use a DataUnion endpoint that requires authentication. Here we use [`/upload-file`]().

---

# All Functions

@dataunion-authentication contains the following functions for controlling user log in:

- `registerNewAddress()`
- `getNonceForExistingAddress()`
- `getNonceAuto()`
- `getSignature()`
- `getJWTToken()`
- `fullLogin()`
- `refresh()`

---

# Pull Requests - [Click here](https://github.com/DataUnion-app/authentication/pulls)

If you want to add new examples (i.e. for injecting the library into other JavaScript frameworks), we will add you to the credits section. Feel free to open a pull request and explain briefly what your example does. 

---

# Credits

- [Sarah Kay]()
- [Robin Lehmann]()
- [Akshay Patel]()