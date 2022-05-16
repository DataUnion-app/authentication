# @dataunion-authentication

- [Introduction](#introduction)
- [Get Started](#get-started)
- [All Functions](#all-functions)
- [Pull Requests](#pull-requests)

---
---

# Introduction

In just five minutes, you can configure your app to use DataUnion's API endpoints! @dataunion-authentication is a JavaScript plugin for simplifying the DataUnion authentication process.

Click here to [get started](#pull-requests) with our examples in React and Vanilla JS.

If you want to add more examples (i.e. Angular, Vue, React Native) please create a [pull request](#pull-requests).

---
---

# Get Started 

Note: You must inject web3 into your project manually.

- [React](#react)
- [Vanilla JS](#vanilla-js)

---

## React

We use this library in an [example React app](). Inject Web3 into your project and then inject @dataunion-authentication.

```javascript
```

---

## Vanilla JS

We have code repos to show you how you can [use this library with vanilla JavaScript and HTML](). 

Inject web3 into your project and then inject @dataunion-authentication. Ask your user to login with `authentication.fullLogin(ethAddress)`. Simple as!

```javascript
```

To test that authentication has succeeded, use a DataUnion endpoint that requires authentication. Here we use [`/upload-file`]().

---
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
---

# Pull Requests 

If you want to add new examples (i.e. injecting the library into other JavaScript frameworks), we would strongly appreciate that. Feel free to open a pull request and explain briefly what your example does. We will add you to the credits section if you wish.

---
---

# Credits

- [Robin Lehmann]()
- [Sarah Kay]()
- [Akshay Patel]()