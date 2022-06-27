class DataUnionWeb3 {
    constructor() {
        this.account = null;
        this.provider = null;
    }

    authenticate(account) {
        this.account = account
    }

    async initWeb3() {
        if (window.ethereum) {
            this.provider = await new Web3(window.ethereum);
            console.log(`inited web3 in modern browser`);
            return Promise.resolve('initialized');
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            this.provider = await new Web3(window.web3.currentProvider);
            console.log(`inited web3 in legacy browser`);
            return Promise.resolve('initialized');
        }
    }
    
    async injectWeb3() {
        window.addEventListener('load', async () => {
            // Modern dapp browsers...
            if (window.ethereum) {
                window.web3 = new Web3(ethereum);
                try {
                    await ethereum.enable();
                    this.account = window.web3.eth.accounts();
                } catch (error) {
                    console.log(error)
                }
            }

            // Legacy dapp browsers...
            else if (window.web3) {
                window.web3 = new Web3(web3.currentProvider);
            }

            // Non-dapp browsers...
            else {
                console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
            }
        });
    }

    async checkForAddress() {
        if (window.ethereum) {
            return window.ethereum.enable().then(result => {
                if (result !== undefined) {
                    this.authenticate(result[0])
                    return Promise.resolve(result[0])
                }
                window.web3.eth.getAccounts((error, result) => {
                    if (error) {
                        return Promise.reject(null);
                    } else {
                        this.authenticate(result[0])
                        return Promise.resolve(result[0])
                    }
                });
            });
        } else {
            return Promise.reject('Your browser needs to have Web3')
        }
    }
}

const duWeb3Injecter = new DataUnionWeb3()
export default duWeb3Injecter;
export { DataUnionWeb3, duWeb3Injecter };