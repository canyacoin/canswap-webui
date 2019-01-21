import CanSwap from '../contracts/CanSwap.json'

const drizzleOptions = {
  web3: {
    block: false
  },
  contracts: [
    CanSwap
  ],
  events: {
  },
  polls: {
    accounts: 1500
  }
}

export default drizzleOptions