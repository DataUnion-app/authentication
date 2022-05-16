import 'web3';
import apiCalls from './api';
import injectWeb3 from './loadWeb3';
// User Functions

const apiCallsInstance = new apiCalls();

class DataUnionAuth {
    constructor() {}

    /// Gets nonce for a user account that doesn't already exist, and records this account in the Crab database.
    /// PARAMS:
        /// [logErrors] - boolean. Logs errors if true.
    async registerNewAddress( 
        ethAddress,
        logErrors=false
    ) {
        apiCallsInstance.register(ethAddress, logErrors)
    }

    /// Gets nonce for a user account that already exists.
    /// PARAMS:
        /// [logErrors] - boolean. Logs errors if true.
    async getNonceForExistingAddress(
        ethAddress,
        logErrors=false
    ) {
        apiCallsInstance.getNonce(ethAddress, logErrors)
    }

    /// Gets nonce regardless of whether user account exists or not. 
    /// Runs one API call, then if this call fails, runs the other.
    /// PARAMS:
        /// [ethAddress] - String. The nonce of the account that logged in.
        /// [registerFirst] - boolean. If true, try `/register` first. If false, try `/get-nonce` first. 
        /// [logErrors] - boolean. Logs errors if true.
    async registerOrGetNonceAuto(
        ethAddress,
        registerFirst=false,
        logErrors=false
    ) {
        if (registerFirst) {
            this.registerNewAddress(ethAddress, logErrors).then(res => {
                resolve(res['nonce'])
            }).catch(err => {
                if (logErrors) console.log(err)
                this.getNonceForExistingAddress(ethAddress, logErrors).then(res => {
                    resolve(res['nonce'])
                }).catch(err => {
                    if (logErrors) console.log(err)
                    reject(err)
                })
            })
        } else {
            this.getNonceForExistingAddress(ethAddress, logErrors).then(res => {
                resolve(res['nonce']);
            }).catch(err => {
                if (logErrors) console.log(err)
                reject(err)
                registerNewAddress(ethAddress, logErrors).then(
                    
                ).catch(err => {
                    if (logErrors) console.log(err)
                    reject(err)
                })
            })
        }
    }

    /// Gets signature  
    /// PARAMS:
        /// [ethAddress] - String
    async getSignature(ethAddress, nonce, logErrors) {
        apiCallsInstance.sign(ethAddress, nonce, logErrors);
    }

    async getJWTToken(signature, logErrors) {
        apiCallsInstance.login(signature, logErrors)
    }

    async fullLogin(
        ethAddress,
        logErrors=false
    ) {
        this.registerOrGetNonceAuto(ethAddress, logErrors).then(res => {
            var nonce = res['nonce'];
            this.getSignature(ethAddress, nonce, logErrors).then(res => {
                var signature = res['signature'];
                this.getJWTToken(signature, logErrors).then(res => {
                    resolve({
                        accessToken: res['access_token'],
                        refreshToken: res['refresh_token']
                    })
                }).catch(err => {
                    if (logErrors) console.log(`[@dataunion-authentication fullLogin()] ${err}`)
                    reject(err)
                })
            }).catch(err => {
                if (logErrors) console.log(`[@dataunion-authentication fullLogin()] ${err}`)
                reject(err)
            })
        }).catch(err => {
            if (logErrors) console.log(`[@dataunion-authentication fullLogin()] ${err}`)
            reject(err)
        })
    }

    async refresh(
        refreshToken,
        logErrors=false
    ) {
        apiCalls.refresh(refreshToken, logErrors)
    }
}

const duAuth = new DataUnionAuth()
export default duAuth;
export { DataUnionAuth }