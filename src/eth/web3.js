import Web3 from 'web3'

var web3singleton = null

export const getWeb3 = () => {
  return new Promise((resolve, reject) => {

    if(web3singleton) return resolve(web3singleton)

    var { ethereum, web3 } = window;
    
    if (ethereum) {
      web3singleton = amendWeb3(new Web3(ethereum))
      resolve(web3singleton);
    } else if (web3) {
      web3singleton = amendWeb3(new Web3(web3.currentProvider))
      resolve(web3singleton);
    } else {
      resolve(null)
    }
  })
}

export const getNetID = () => {
  return new Promise(async (resolve, reject) => {
    const web3js = await getWeb3();
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
}

export const getNetwork = () => {
  return new Promise((resolve, reject) => {
    getNetID().then(netId => {
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
}

const amendWeb3 = (web3) => {
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

const service = {
  getWeb3,
  getNetID,
  getNetwork
}

export default service
