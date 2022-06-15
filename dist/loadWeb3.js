import Web3 from 'web3/dist/web3.min';

class DataUnionWeb3 {
  constructor() {
    this.account = null;
    this.provider = null;
  }

  authenticate(account) {
    this.account = account;
  }

  setProvider(provider) {
    this.provider = provider;
  }

  // This must always be called before ApiCalls.sign().
  async initWeb3Provider() {
    if (window.ethereum) {
      var web3Provider = new Web3(window.ethereum);
      this.setProvider(web3Provider);
    }
  }

  // This will always be called before ApiCalls.sign().
  async enableEthereumAndGetAddress() {
    if (window.ethereum) {
      return window.ethereum.enable().then(result => {
        console.log(result);
        if (result !== undefined) {
          this.authenticate(result[0]);
          return Promise.resolve(result[0]);
        }

        window.web3.eth.getAccounts((error, result) => {
          if (result === undefined && error !== undefined) {
            console.log(error)
            return Promise.reject(null);
          } else {
            this.authenticate(result[0]);
            return Promise.resolve(result[0]);
          }
        });
      });
    } else {
      return Promise.reject('Your browser needs to have Web3');
    }
  }

}

const duWeb3Injecter = new DataUnionWeb3();
export default duWeb3Injecter;
export { DataUnionWeb3, duWeb3Injecter };