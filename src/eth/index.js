import Web3Service from './web3'
import Contracts from './contracts'

export { default as Web3Service } from './web3'


// /**
//  *  Instantiates a Web3 contract object with the ERC20 standard ABI at the given contract address
//  *  @param tokenAddress {String} Public address of the token
//  *  @return {Object} Web3 contract object
//  */
// const getTokenContract = async (tokenAddress) => {
//   const web3 = await Web3Service.getWeb3()
//   return new web3.eth.Contract(Contracts.Token.abi, tokenAddress)
//   //return new web3.eth.Contract(Contracts.Token.abi).at(tokenAddress)
// }

/**
 *  Instantiates a Web3 contract object with the CanSwap ABI at the CanSwap address
 *  @return {Object} Web3 contract object
 */
export const getCanSwapContract = async () => {
  const web3 = await Web3Service.getWeb3()
  const netId = await Web3Service.getNetwork()
  const contract = Contracts.CanSwap(netId)
  return new web3.eth.Contract(contract.abi, contract.address)
}

// function getContract() {
  // const canSwap = new web3js.eth.Contract(CanSwap.abi, );
  // store.dispatch(addContract('CanSwap', canSwap))
// }







/**

amountInSmallestUnit = amountOfTokens * (10 ^ numberOfDecimals)

10000000 = 10 * (10 ^ 6)

TokenContract
  - approve(address spenderAddress, uint256 approvedAmount)
      Tells the TokenContract, that the account denoted by spenderAddress has
      permission to move approvedAmount of tokens out of the caller's account

Multisender
  - multisend(address tokenAddress, address[] recipients, uint256[] amounts)
      Tells the multisender contract to transfer an amount of tokens from
      sender's address to each participant, using seqeuntial array indices to
      specify the amount

address[1] -> amounts[1]
address[528] -> amounts[528]

*/