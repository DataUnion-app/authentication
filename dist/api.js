// TODO:
// Edit docs. Move the lengthy part to Advanced.
// Figure out how to test and deploy the library.
// Routes to the production database at https://crab.dataunion.app/ by default.
class ApiCalls {
  constructor(customBackendUrl = '') {
    this.backendUrl = customBackendUrl != undefined && customBackendUrl != '' ? backendUrl : 'https://crab.dataunion.app/';
  } 
  
  // [Registers user in the target backendUrl and gets nonce, using '/register' API from DataUnion SDK]
  // [Requires user to NOT already be registered in the target backendUrl]
  async register(ethAddress, logErrors = false) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const obj = {
      "public_address": ethAddress
    };
    const addressObject = JSON.stringify(obj);
    const nonceRequest = await fetch(`${this.backendUrl}/register`, {
      method: 'POST',
      headers: myHeaders,
      body: addressObject,
      redirect: 'follow'
    });

    try {
      const jsonResult = await nonceRequest.json();
      return jsonResult;
    } catch (err) {
      if (logErrors) console.log('[ERROR REGISTERING USER]', err);
      return err;
    }
  } // [Gets nonce using '/get-nonce' API from DataUnion SDK]
  // [Requires user to already be registered in the target backendUrl]


  async getNonce(ethAddress, logErrors = false) {
    const nonceRequest = await fetch(`${this.backendUrl}/get-nonce?public_address=${ethAddress}`);

    try {
      const nonce = await nonceRequest.json();
      return nonce;
    } catch (err) {
      if (logErrors) console.log('[ERROR GETTING NONCE]', err);
      return err;
    }
  } // [Signs user in using Metamask from web3 injected into the browser].
  // [Requires window.web3 to be defined].


  async sign(ethAddress, nonce, logErrors = false) {
    return new Promise((resolve, reject) => {
      if (window.web3) {
        const web3Provider = new Web3(window.ethereum);
        window.web3.eth.personal.sign(web3.utils.utf8ToHex(nonce), ethAddress, '', (err, signed) => {
          if (err) {
            return reject(err);
          } else {
            return resolve({
              ethAddress,
              signed
            });
          }
        });
      } else {
        if (logErrors) console.log('[ERROR SIGNING] Web3 is not found in this window. Please make sure window.web3 != undefined.');
        return reject('[ERROR SIGNING] Web3 is not found in this window. Please make sure window.web3 != undefined.');
      }
    });
  } /// [Logs user in using signature gained from the sign() function]


  async login(ethAddress, signature, logErrors = false) {
    const obj = {
      "public_address": ethAddress,
      "signature": signature
    };
    const loginObject = JSON.stringify(obj);
    const loginResult = await fetch(`${this.backendUrl}/login`, {
      method: 'POST',
      body: loginObject
    });

    try {
      const jsonResult = await loginResult.json();
      return jsonResult;
    } catch (err) {
      if (logErrors) console.log('[ERROR LOGGING IN]', err);
      return err;
    }
  }

  async refresh(refreshToken, logErrors = false) {
    const refreshHeaders = new Headers();
    refreshHeaders.append("Authorization", `Bearer ${refreshToken}`);
    const refreshResult = await fetch(`${this.backendUrl}/refresh`, {
      method: 'POST',
      headers: refreshHeaders
    });

    try {
      const jsonResult = await refreshResult.json();
      return jsonResult;
    } catch (err) {
      if (logErrors) console.log('[ERROR REFRESHING TOKENS]', err);
      return err;
    }
  }

}

const apiCallsDefault = new ApiCalls();
export { ApiCalls, apiCallsDefault };
export default ApiCalls;