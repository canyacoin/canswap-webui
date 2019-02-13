import { getWeb3 } from './web3'
import { ERC20, CanSwapContract } from './contracts'



/**
 *  Instantiates a Web3 contract object with the ERC20 standard ABI at the given contract address
 *  @param tokenAddress {String} Public address of the token
 *  @return {Object} Web3 contract object
 */
export const getTokenContract = async (tokenAddress) => {
  const web3 = await getWeb3()
  return new web3.eth.Contract(ERC20.abi, tokenAddress)
}

/**
 *  Instantiates a Web3 contract object with the CanSwap ABI at the CanSwap address
 *  @return {Object} Web3 contract object
 */
export const getCanSwapContract = async () => {
  const web3 = await getWeb3()
  const contract = await CanSwapContract()
  return new web3.eth.Contract(contract.abi, contract.address)
}

/**
 *  Gets the current address of CanSwap
 *  @return {Object} Web3 contract object
 */
export const getCanSwapAddress = async () => {
  const contract = await CanSwapContract()
  return contract.address
}

/**
 *  Checks if an address is empty (Ethereum)
 *  @param address {String} Public address of the token
 *  @return {bool} IsEthereum
 */
export const isEthereumHex = (address) => {
  return address === '0x0000000000000000000000000000000000000000'
}


/**
 *  Gets the balance of a given user for a given token
 *  @param tokenAddress {String} Public address of the token
 *  @param userAddress {String} Public address of the user
 *  @return {Promise<BigNumber>} Balance of the user
 */
export const getTokenBalance = async (tokenAddress, userAddress) => {
  const tokenContract = await getTokenContract(tokenAddress)
  return tokenContract.methods.balanceOf(userAddress).call()
}

/**
 *  Gets the ETH balance of a given user
 *  @param userAddress {String} Public address of the user
 *  @return {Promise<Number>} Balance of the user in ETH
 */
export const getEthBalance = async (userAddress) => {
  const web3 = await getWeb3()
  return new Promise((resolve, reject) => {
    web3.eth.getBalance(userAddress, (e, res) => {
      if (e) return reject(e)
      resolve(web3.fromWei(res, 'ether'))
    })
  })
}


/**
 *  Gets the name/symbol/decimals of a given token
 *  @param tokenAddress {String} Public address of the token
 *  @return {Promise<String>} Symbol of the token
 */
export const getTokenMeta = async (tokenAddress) => {
  if(isEthereumHex(tokenAddress)){
    return {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18
    }
  } else {
    return {
      name: await getTokenName(tokenAddress),
      symbol: await getTokenSymbol(tokenAddress),
      decimals: await getTokenDecimals(tokenAddress)
    }
  }
}

/**
 *  Gets the symbol of a given token
 *  @param tokenAddress {String} Public address of the token
 *  @return {Promise<String>} Symbol of the token
 */
export const getTokenName = async (tokenAddress) => {
  const tokenContract = await getTokenContract(tokenAddress)
  return tokenContract.methods.name().call()
}

/**
 *  Gets the symbol of a given token
 *  @param tokenAddress {String} Public address of the token
 *  @return {Promise<String>} Symbol of the token
 */
export const getTokenSymbol = async (tokenAddress) => {
  const tokenContract = await getTokenContract(tokenAddress)
  return tokenContract.methods.symbol().call()
}

/**
 *  Gets the decimals of a given token
 *  @param tokenAddress {String} Public address of the token
 *  @return {Promise<String>} Decimals of the token
 */
export const getTokenDecimals = async (tokenAddress) => {
  const tokenContract = await getTokenContract(tokenAddress)
  return tokenContract.methods.decimals().call()
}

