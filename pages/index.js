import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";
import styles from '../styles/Home.module.css'

export default function Home() {

  const [symbol, setSymbol] = useState("")


  const getTokenDetails = async () => {
    try {
      const result = await axios.post("https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3", {
        query:
          `{tokens(where:{symbol: "${symbol}"}) 
        {
          id  
          name
          symbol
          decimals
          totalSupply
        }
    }`
      })
      const data = result.data.data.tokens[0]
      // console.log(data);

      setTokenId(data.id)
      setTokenName(data.name)
      setTokenSymbol(data.symbol)
      setTokenDecimal(data.decimals)
      setTokenTotalSupply(data.totalSupply)

    }
    catch (error) {
      console.error(error);
      setTokenId("Not Available")
      setTokenName("Not Available")
      setTokenSymbol("Not Available")
      setTokenDecimal("Not Available")
      setTokenTotalSupply("Not Available")
    }
  }

  const getSymbol = (event) => {
    setSymbol(event.target.value.toString());
    // console.log(symbol);
  }

  const [tokenId, setTokenId] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("")
  const [tokenDecimal, setTokenDecimal] = useState("")
  const [tokenTotalSupply, setTokenTotalSupply] = useState("")

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Token detail finder</title>
        <meta name="description" content="Token detail finder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h3>Fetch Token Details Using Uniswap Subgraph <Image src="/key.png" width={50} height={50} /></h3><br />
        <div className="card" style={{ width: "27rem" }}>
          <div className="card-body">
            <form className="row g-3">
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  id="symbol"
                  placeholder="Symbol"
                  onChange={getSymbol}
                />
              </div>
              <div className="col-auto">
                <button type="button" 
                className="btn btn-outline-dark mb-3" 
                onClick={getTokenDetails}   
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                  Fetch Token Details
                </button>
              </div>
            </form>

          </div>

          <>
            {/* Modal */}
            <div
              className="modal fade"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex={-1}
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-body">
                    <div>
                      Token ID: <h5 className={styles.text}>{tokenId}</h5>
                    </div>
                    <div>
                      Token Name: <h5 className={styles.text}>{tokenName}</h5>
                    </div>
                    <div>
                      Token Symbol: <h5 className={styles.text}>{tokenSymbol}</h5>
                    </div>
                    <div>
                      Token Decimals: <h5 className={styles.text}>{tokenDecimal}</h5>
                    </div>
                    <div>
                      Token TotalSupply: <h5 className={styles.text}>{tokenTotalSupply}</h5>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>

        </div>

      </main>
    </div>
  )
}
