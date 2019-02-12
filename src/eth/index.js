// import Web3Service from './web3'
// import { getDecimals, getTokenBalance, getTokenSymbol, getTokenDecimals, getEthBalance, getTokenContract, getCanSwapContract } from './utils'
// import Contracts from './contracts'

export { default as Web3Service } from './web3'
export * from './utils'


/**
 *  Gets the 
 *  @param tokenAddress {String} Public address of the token
 *  @return {Promise<Number>} Number of decimals of the token
 */
// export const fetch = async () => {
//   if (recipients.length !== amounts.length) throw new Error('Participants and amounts arrays should be equal length')
//   if (recipients.length > 255) throw new Error('Arrays cannot be larger than 255 in length, please send multiple transactions')
//   const multisendContract = await getMultisendContract()
//   return multisendContract.methods.multiSend(tokenAddress, recipients, amounts);
// }

