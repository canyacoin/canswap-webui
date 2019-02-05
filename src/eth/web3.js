import Web3 from 'web3'

const funcs = {
  getWeb3: () => {
    return new Promise((resolve, reject) => {
      var { ethereum, web3 } = window;
      
      if (ethereum) {
        resolve(funcs.amendWeb3(new Web3(ethereum)));
      } else if (web3) {
        resolve(funcs.amendWeb3(new Web3(web3.currentProvider)));
      } else {
        resolve(null)
      }
    })
  },  
  getNetID: () => {
    return new Promise(async (resolve, reject) => {
      const web3js = await funcs.getWeb3();
      const isV1 = /^1/.test(web3js.version);
      const getNetwork = isV1 ? web3js.eth.net.getId : web3js.version.getNetwork;

      getNetwork((err, netId) => {
        if (err) {
          reject(err)
        } else {
          resolve(netId)
        }
      });
    })
  },
  getNetwork: () => {
    return new Promise((resolve, reject) => {
      funcs.getNetID().then(netId => {
        switch (netId) {
          case 1:
            resolve('MAINNET') 
            break
          case 2:
            resolve('MORDEN')
            break
          case 3:
            resolve('ROPSTEN')
            break
          case 4:
            resolve('RINKEBY')
            break
          case 42:
            resolve('KOVAN')
            break
          default:
            resolve('UNKNOWN')
            break
        }
      }).catch(err => {
        reject(err)
      });
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
