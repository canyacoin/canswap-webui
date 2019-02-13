import { abi as CanSwapABI } from '../assets/contracts/CanSwap'
import { abi as ERC20ABI } from '../assets/contracts/IERC20'
import { canswap_addresses as CanSwapAddresses, canyacoin_addresses as CanYaCoinAddresses } from '../app.config'
import { getNetwork } from './web3'

export const ERC20 = {
  abi: ERC20ABI
}

export const CanSwapContract = async () => {
  const net = await getNetwork()
  return {
    address : CanSwapAddresses[net] ? CanSwapAddresses[net] : CanSwapAddresses["MAINNET"],
    abi : CanSwapABI
  }
}

export const CanYaCoinContract = async () => {
  const net = await getNetwork()
  return  {
    address : CanYaCoinAddresses[net] ? CanYaCoinAddresses[net] : CanYaCoinAddresses["MAINNET"],
    abi : ERC20ABI
  }
}

const Contracts = {
  CanSwapContract,
  CanYaCoinContract
}

export default Contracts;