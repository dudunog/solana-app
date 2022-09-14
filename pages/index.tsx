import { ReactNode, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import ReactLoading from 'react-loading'
import * as Web3 from '@solana/web3.js'
// components
import { AddressForm } from '../components/AddressForm'
// styles
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  const [address, setAddress] = useState<string>('')
  const [balance, setBalance] = useState<number>(0)
  const [isExecutable, setIsExecutable] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const addressSubmittedHandler = (address: string) => {
    try {
      setIsLoading(true)
      setAddress(address)

      const key = new Web3.PublicKey(address)
      const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))

      connection.getBalance(key).then(balance => {
        setBalance(balance / Web3.LAMPORTS_PER_SOL)
        setIsLoading(false)
      })
    } catch (error: any) {
      setAddress('')
      setBalance(0)
      setError(error?.message as string)
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Solana app</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" /> 
      </Head>

      <main className={styles.main}>
        <div>
          <h1>
            Start Your Solana Journey
          </h1>

          <AddressForm handler={addressSubmittedHandler} />

          {isLoading ? (
            <div className={styles.information}>
              <ReactLoading className={styles.loading} type={"spin"} color="#fff" />
            </div>
          ): (
            <>
              {address && (
                <div className={styles.information}>
                  <p>{`Address: ${address}`}</p>
                  <p>{`Balance: ${balance} SOL`}</p>
                  <div className={isExecutable ? styles.executable : styles.isNotExecutable}>
                    {`${isExecutable ? 'Is it executable' : 'Is it not executable'}`}
                  </div>
                </div>
              )}

              {error && (
                <div className={styles.information}>
                  <p className={styles.error}>Opps! {error}</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default Home
