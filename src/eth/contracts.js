import { abi as CanSwapABI } from '../assets/contracts/CanSwap'
import { canswap_addresses } from '../app.config'

const CanSwapDetails = {
	addresses : canswap_addresses,
	abi: CanSwapABI
}


export const CanSwapContract = (network = 'MAINNET') => {
  return {
    address : CanSwapDetails.addresses[network] ? CanSwapDetails.addresses[network] : CanSwapDetails.addresses[1],
    abi : CanSwapDetails.abi
  }
}

const Contracts = {
	CanSwap : CanSwapContract
};

export default Contracts;