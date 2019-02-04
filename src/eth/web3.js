import Web3 from 'web3'

const funcs = {
  getWeb3: () => {
    return new Promise((resolve, reject) => {
      var { ethereum, web3 } = window;
      
      if (ethereum) {
        console.log('++ web3\twindow.ethereum detected');
        resolve(funcs.amendWeb3(new Web3(ethereum)));
      } else if (web3) {
        console.log('++ web3\twindow.web3 detected');
        resolve(funcs.amendWeb3(new Web3(web3.currentProvider)));
      } else {
        console.log('++ web3\tfallback web3');
        resolve(null)
      }
    })
  },  
  amendWeb3: (web3) => {
    web3.eth.getTransactionReceiptMined = (txnHash, interval) => {
      var transactionReceiptAsync
      interval = interval ? interval : 500
      transactionReceiptAsync = (txnHash, resolve, reject) => {
        web3.eth.getTransactionReceipt(txnHash, (e, receipt) => {
          if (receipt == null) {
            setTimeout(() => {
              transactionReceiptAsync(txnHash, resolve, reject)
            }, interval)
          } else {
            resolve(receipt)
          }
        })
      }

      if (Array.isArray(txnHash)) {
        var promises = []
        txnHash.forEach((oneTxHash) => {
          promises.push(web3.eth.getTransactionReceiptMined(oneTxHash, interval))
        })
        return Promise.all(promises);
      } else {
        return new Promise((resolve, reject) => {
          transactionReceiptAsync(txnHash, resolve, reject)
        })
      }
    }

    return web3
  }
}

export default funcs
