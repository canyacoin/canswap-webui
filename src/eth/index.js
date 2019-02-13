import Web3Service from './web3'
import BigNumber from 'bignumber.js'
import { getTokenContract, getCanSwapAddress } from './utils'

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


/**
 *  Sends the approve transaction to the token contract, allowing the CanSwap contract to move
 *  tokens.
 *  @param tokenAddress {String} Public address of the token to be approved
 *  @param approvedAmount {Number} Number of tokens to approve
 *  @return {Promise<String>} Transaction hash of the approval transaction
 */
export const approveCanSwap = async (tokenAddress, tokensToApprove) => {
  const web3 = await Web3Service.getWeb3()
  const accounts = await web3.eth.getAccounts()
  
  const tokenContract = await getTokenContract(tokenAddress)
  const canSwapAddress = await getCanSwapAddress()

  return new Promise(async (resolve, reject) => {
    try {
      const allowance = await tokenContract.methods.allowance(accounts[0], canSwapAddress).call();
      const bn = new BigNumber(allowance, 10)
      if(bn.gte(tokensToApprove)){
        resolve(true)
      } else {
        tokenContract.methods.approve(canSwapAddress, tokensToApprove).send({ from: accounts[0] }, (e, txHash) => {
          if (e) reject(e)
          resolve(txHash)
        })
      }
    } catch (e) {
      console.log(e)
      reject(e)
    }    
  })
}
