class DataUnionWeb3 {
    constructor() {}
    
    injectWeb3() {
        window.addEventListener('load', async () => {
            // Modern dapp browsers...
            if (window.ethereum) {
                window.web3 = new Web3(ethereum);
                try {
                    await ethereum.enable();
                    console.log(`[accounts] = ${window.web3.eth.accounts[0]}`);
                    console.log(`[sign] = ${window.web3.eth.sign()}`);
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
}

var duWeb3Injecter = new DataUnionWeb3()
export default duWeb3Injecter;
export { DataUnionWeb3 };