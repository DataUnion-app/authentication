import Web3 from 'web3/dist/web3.min';

class DataUnionWeb3 {
  constructor() {
    this.account = null,
    this.provider = null,
    this.backendUrl = 'https://crab.dataunion.app'
  }

  authenticate(account) {
    this.account = account;
  }

  setProvider(provider) {
    this.provider = provider;
  }

  // This must always be called before ApiCalls.sign().
  async initWeb3Provider(backendUrl="") {
    if (window.web3) {
      const web3 = new Web3(Web3.givenProvider || `ws://${this.backendUrl}`);
    }
    if (window.ethereum) {
      var web3Provider = new Web3(window.ethereum);
      this.setProvider(web3Provider);
    }
  }

  // This will always be called before ApiCalls.sign().
  async enableEthereumAndGetAddress() {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      return window.ethereum.enable().then(result => {
        if (result !== undefined) {
          const checksum = web3.utils.toChecksumAddress(result[0]);
          this.authenticate(checksum);
          return Promise.resolve(checksum);
        }

        window.web3.eth.getAccounts((error, result) => {
          if (result === undefined && error !== undefined) {
            return Promise.reject(null);
          } else {
            const checksum = web3.utils.toChecksumAddress(result[0]);
            this.authenticate(checksum);
            return Promise.resolve(checksum);
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