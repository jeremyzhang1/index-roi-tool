import React, { useState } from "react";
import "./App.css";
import backgroundVideo from "./RocketBackground.mp4";

const nameToId = new Map()
nameToId.set('DeFi Pulse Index', 'defipulse-index')
nameToId.set('Metaverse Index', 'metaverse-index')
nameToId.set('Bankless BED Index', 'bankless-bed-index')
nameToId.set('ETH 2x Flexible Leverage Index', 'eth-2x-flexible-leverage-index')
nameToId.set('ETH 2x Flexible Leverage Index (Polygon)', 'index-coop-eth-2x-flexible-leverage-index')
nameToId.set('BTC 2x Flexible Leverage Index', 'btc-2x-flexible-leverage-index')
nameToId.set('Data Economy index', 'data-economy-index')

const nameToDate = new Map()
nameToDate.set('DeFi Pulse Index', '2020-09-14')
nameToDate.set('Metaverse Index', '2021-09-15')
nameToDate.set('Bankless BED Index', '2021-07-21')
nameToDate.set('ETH 2x Flexible Leverage Index', '2021-03-16')
nameToDate.set('ETH 2x Flexible Leverage Index (Polygon)', '2021-12-03')
nameToDate.set('BTC 2x Flexible Leverage Index', '2021-05-11')
nameToDate.set('Data Economy index', '2021-09-24')

const nameTolink = new Map()
nameTolink.set('DeFi Pulse Index', 'https://www.indexcoop.com/dpi.html')
nameTolink.set('Metaverse Index', 'https://www.indexcoop.com/mvi.html')
nameTolink.set('Bankless BED Index', 'https://www.indexcoop.com/bed.html')
nameTolink.set('ETH 2x Flexible Leverage Index', 'https://www.indexcoop.com/ethfli.html')
nameTolink.set('ETH 2x Flexible Leverage Index (Polygon)', 'https://www.indexcoop.com/index-coop-eth2xfli-polygon.html')
nameTolink.set('BTC 2x Flexible Leverage Index', 'https://www.indexcoop.com/btcfli.html')
nameTolink.set('Data Economy index', 'https://www.indexcoop.com/data.html')

export default function App() {

    const formatDate = (date) => {
        let dateArray = date.split('-')
        return dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0]
    }

    const calculateReturn = (product) => {
        // make an API call here for historical data
        let formerPrice = 0;
        let currentPrice = 0;
        let url = 'https://api.coingecko.com/api/v3/coins/' + nameToId.get(product) + '/history?date=' + formatDate(date) + '&localization=false'
        fetch(url).then(response => response.json()).then(response => {
            console.log(response)
            formerPrice = response.market_data.current_price.usd
        }).then(() => {
            //make an api call for current data
            url = 'https://api.coingecko.com/api/v3/coins/' + nameToId.get(product) + '/history?date=' + formatDate(today) + '&localization=false'
            fetch(url).then(response => response.json()).then(response => {
                currentPrice = response.market_data.current_price.usd
            }).then(() => {
                //calculate the proportional return
                console.log(currentPrice + " current")
                console.log(formerPrice + " former")
                setProdRet((currentPrice - formerPrice) / formerPrice * 100)
            }).catch(console.log)
        }).catch(console.log)
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        calculateReturn(productName)
    }
    const today = new Date().toISOString().split('T')[0]
    const [startAmount, setStartAmount] = useState(100)
    const [productName, setProductName] = useState("DeFi Pulse Index")
    const [date, setDate] = useState(today)
    const [prodRet, setProdRet] = useState(0.0)

    return (
        <div className="App" style={{ margin: 30 }}>
            <div className="container">
                <div className="Title">
                    <h1 style={{ marginBottom: 5 }}>ROI Calculator</h1>
                </div>
                <video src={backgroundVideo} loop autoPlay muted id="Video" />
                <div className="Sentence">
                    <form
                        onSubmit={handleSubmit}
                    >
                        <p>I have <input type="number" value={startAmount} onChange={e => setStartAmount(e.target.value)} /> dollars right now.</p>
                        <p>If I invested it in <select defaultValue={productName} onChange={e => {
                            setProductName(e.target.value)
                            setProdRet(0.0)
                            }}>
                            <option value="DeFi Pulse Index">DeFi Pulse Index</option>
                            <option value="Metaverse Index">Metaverse Index</option>
                            <option value="Bankless BED Index">Bankless BED Index</option>
                            <option value="ETH 2x Flexible Leverage Index">ETH 2x Flexible Leverage Index</option>
                            <option value="ETH 2x Flexible Leverage Index (Polygon)">ETH 2x Flexible Leverage Index (Polygon)</option>
                            <option value="BTC 2x Flexible Leverage Index">BTC 2x Flexible Leverage Index</option>
                            <option value="Data Economy index">Data Economy index</option>
                        </select> on <input type="date" min={nameToDate.get(productName)} max={today} onChange={e => setDate(e.target.value)} />,</p>
                        <p>how much will I have now?</p>
                        <input type="submit" value={"Calculate"} id="submitButton" />
                    </form>
                    <div className="Result">
                        <p>From {date} to today, {productName} had {prodRet.toFixed(2)}% return.</p>
                        <p>Based on this, you will now have ${(startAmount + (prodRet/100 * startAmount)).toFixed(2)}</p>
                    </div>
                    <div className="Action">
                        <p>Let's go to the moon with {productName}</p>
                        <button><a href={nameTolink.get(productName)}>Get Started Today</a></button>
                    </div>
                </div>
            </div>
        </div>
    );
}
