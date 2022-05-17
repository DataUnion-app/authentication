import 'web3';
import ApiCalls from './api';
import duWeb3Injecter, { DataUnionWeb3 } from './loadWeb3';

const apiCallsInstance = new ApiCalls();

class DataUnionAuth {
    constructor(logErrors) {
        this.logErrors = (logErrors == undefined) ? false : logErrors;
    }

    /// Gets nonce for a user account that doesn't already exist, and records this account in the Crab database.
    /// PARAMS:
        /// [logErrors] - boolean. Logs errors if true.
    async registerNewAddress( 
        ethAddress
    ) {
        apiCallsInstance.register(ethAddress, this.logErrors)
    }

    /// Gets nonce for a user account that already exists.
    /// PARAMS:
        /// [logErrors] - boolean. Logs errors if true.
    async getNonceForExistingAddress(
        ethAddress
    ) {
        apiCallsInstance.getNonce(ethAddress, this.logErrors)
    }

    /// Gets nonce regardless of whether user account exists or not. 
    /// Runs one API call, then if this call fails, runs the other.
    /// PARAMS:
        /// [ethAddress] - String. The nonce of the account that logged in.
        /// [registerFirst] - boolean. If true, try `/register` first. If false, try `/get-nonce` first. 
        /// [logErrors] - boolean. Logs errors if true.
    async registerOrGetNonceAuto(
        ethAddress,
        registerFirst=false
    ) {
        if (registerFirst) {
            this.registerNewAddress(ethAddress).then(res => {
                resolve(res['nonce'])
            }).catch(err => {
                if (logErrors) console.log(err)
                this.getNonceForExistingAddress(ethAddress).then(res => {
                    resolve(res['nonce'])
                }).catch(err => {
                    if (this.logErrors) console.log(err)
                    reject(err)
                })
            })
        } else {
            this.getNonceForExistingAddress(ethAddress).then(res => {
                resolve(res['nonce']);
            }).catch(err => {
                if (this.logErrors) console.log(err)
                reject(err)
                registerNewAddress(ethAddress).then(
                    
                ).catch(err => {
                    if (this.logErrors) console.log(err)
                    reject(err)
                })
            })
        }
    }

    /// Gets signature  
    /// PARAMS:
        /// [ethAddress] - String
    async getSignature(ethAddress, nonce) {
        apiCallsInstance.sign(ethAddress, nonce, this.logErrors);
    }

    async getJWTToken(signature) {
        apiCallsInstance.login(signature, this.logErrors)
    }

    async fullLogin(
        ethAddress
    ) {
        this.registerOrGetNonceAuto(ethAddress).then(res => {
            var nonce = res['nonce'];
            this.getSignature(ethAddress, nonce).then(res => {
                var signature = res['signature'];
                this.getJWTToken(signature).then(res => {
                    resolve({
                        accessToken: res['access_token'],
                        refreshToken: res['refresh_token']
                    })
                }).catch(err => {
                    if (this.logErrors) console.log(`[@dataunion-authentication fullLogin()] ${err}`);
                    reject(err)
                })
            }).catch(err => {
                if (this.logErrors) console.log(`[@dataunion-authentication fullLogin()] ${err}`);
                reject(err)
            })
        }).catch(err => {
            if (this.logErrors) console.log(`[@dataunion-authentication fullLogin()] ${err}`)
            reject(err)
        })
    }

    async refresh(
        refreshToken
    ) {
        apiCallsInstance.refresh(refreshToken, this.logErrors)
    }
}

const duAuth = new DataUnionAuth()
export default duAuth;
export { DataUnionAuth, DataUnionWeb3, ApiCalls, duWeb3Injecter }