import { ConnectWallet, Web3Button, useContract } from '@thirdweb-dev/react'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { useState } from 'react'

const Home: NextPage = () => {
  const contractAddress = '0x59Aa9Ab9f2aF48F27Ae888b01c1DE42894866667'
  const { contract } = useContract(contractAddress)
  const [counter, setCounter] = useState<string | undefined>(undefined)

  async function getCounter() {
    if (!contract) return

    const counter = await contract.call('getCounter')
    setCounter(counter.toString())
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <ConnectWallet />
        <h1> Sultans Counter Dapp </h1>
        <h2> Counter: {counter} </h2>

        <div className={styles.grid}>
          <div className={styles.card}>
            <Web3Button
              contractAddress={contractAddress}
              action={(contract) => contract.call('incrementCounter')}
            >
              + Increment
            </Web3Button>
          </div>

          <div className={styles.card}>
            <Web3Button
              contractAddress={contractAddress}
              action={() => getCounter()}
            >
              Refresh Counter
            </Web3Button>
          </div>

          <div className={styles.card}>
            <Web3Button
              contractAddress={contractAddress}
              action={(contract) => contract.call('decrementCounter')}
            >
              - Decrement
            </Web3Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
