import ApiCalls from './api';
import duWeb3Injecter, { DataUnionWeb3 } from './loadWeb3';
const apiCallsInstance = new ApiCalls();

class DataUnionAuth {
  constructor(logErrors) {
    this.logErrors = logErrors == undefined ? false : logErrors;
  } 
  
  /// Gets nonce for a user account that doesn't already exist, and records this account in the Crab database.
  /// PARAMS:
  /// [ethAddress] - String
  async registerNewAddress(ethAddress) {
    var nonce = await apiCallsInstance.register(ethAddress, this.logErrors);
    return nonce;
  } 
  
  /// Gets nonce for a user account that already exists.
  /// PARAMS:
  /// [ethAddress] - String
  async getNonceForExistingAddress(ethAddress) {
    var nonce = await apiCallsInstance.getNonce(ethAddress, this.logErrors);
    return nonce;
  } 
  
  /// Gets nonce regardless of whether user account exists or not. 
  /// Runs one API call, then if this call fails, runs the other.
  /// PARAMS:
  /// [ethAddress] - String. The nonce of the account that logged in.
  /// [registerFirst] - boolean. If true, try `/register` first. If false, try `/get-nonce` first. 
  async registerOrGetNonceAuto(ethAddress, registerFirst = false) {
    return new Promise((resolve, reject) => {
      if (registerFirst) {
        this.registerNewAddress(ethAddress).then(res => {
          if (res['status'] != 'not found') return resolve(res['nonce']);
        }).catch(err => {
          if (logErrors) console.log(err);
          this.getNonceForExistingAddress(ethAddress).then(res => {
            if (res['status'] != 'not found') return resolve(res['nonce']);
          }).catch(err => {
            if (this.logErrors) console.log(err);
            return reject(err);
          });
        })
      }
      else {
        this.getNonceForExistingAddress(ethAddress).then(res => {
          if (res['status'] != 'not found') return resolve(res['nonce']);
          else this.registerNewAddress(ethAddress).then(res => {
            if (res['status'] != 'not found') return resolve(res['nonce']);
          }).catch(err => {
            if (this.logErrors) console.log(err);
            return reject(err);
          });
        })
      }
    }) 
  } 
  
  /// Gets signature  
  /// PARAMS:
  /// [ethAddress] - String
  /// [nonce] - Number
  async getSignature(ethAddress, nonce) {
    var signature = await apiCallsInstance.sign(ethAddress, nonce, this.logErrors);
    return signature;
  } 
  
  /// Gets JWT Token
  /// PARAMS:
  /// [signature] - String
  async getJWTToken(signature) {
    var tokens = await apiCallsInstance.login(signature, this.logErrors);
    return tokens;
  } /// Completes full login process
  /// PARAMS:
  /// [ethAddress] - String


  async fullLogin(ethAddress) {
    this.registerOrGetNonceAuto(ethAddress).then(nonce => {
      console.log(nonce);
      this.getSignature(ethAddress, nonce).then(res => {
        console.log(`signature`);
        console.log(res);
        var signature = res['signature'];
        this.getJWTToken(signature).then(res => {
          Promise.resolve({
            accessToken: res['access_token'],
            refreshToken: res['refresh_token']
          });
        }).catch(err => {
          if (this.logErrors) console.log(`[@dataunion-authentication fullLogin()] ${err}`);
          Promise.reject(err);
        });
      }).catch(err => {
        if (this.logErrors) console.log(`[@dataunion-authentication fullLogin()] ${err}`);
        Promise.reject(err);
      });
    }).catch(err => {
      if (this.logErrors) console.log(`[@dataunion-authentication fullLogin()] ${err}`);
      Promise.reject(err);
    });
  } 
  
  /// Refreshes JWT Tokens
  /// PARAMS:
  /// [refreshToken] - String
  async refresh(refreshToken) {
    var newTokens = await apiCallsInstance.refresh(refreshToken, this.logErrors);
    return newTokens;
  }

}

const duAuth = new DataUnionAuth();
export default duAuth;
export { DataUnionAuth, DataUnionWeb3, ApiCalls, duWeb3Injecter };