import { abi as CanSwapABI } from '../assets/contracts/CanSwap'
import { abi as ERC20ABI } from '../assets/contracts/IERC20'
import { canswap_addresses as CanSwapAddresses, canyacoin_addresses as CanYaCoinAddresses } from '../app.config'

export const ERC20 = {
  abi: ERC20ABI
}


const CanSwapContract = (network = 'MAINNET') => {
  return {
    address : CanSwapAddresses[network] ? CanSwapAddresses[network] : CanSwapAddresses[1],
    abi : CanSwapABI
  }
}

const CanYaCoinContract = (network = 'MAINNET') => {
  return {
    address : CanYaCoinAddresses[network] ? CanYaCoinAddresses[network] : CanYaCoinAddresses[1],
    abi : ERC20ABI
  }
}

const Contracts = {
  CanSwap : CanSwapContract,
  CanYaCoin: CanYaCoinContract
};

export default Contracts;