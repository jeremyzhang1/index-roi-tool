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
        <div className="App" style={{ margin: 15 }}>
            <div className="container">
                <div className="Title">
                    <svg width="10%" height="10%" viewBox="0 0 175 40" xmlns="http://www.w3.org/2000/svg">
                        <path fill="white" d="M51.6465 2.5434H58.9825V36.7651H51.6465V2.5434Z"></path>
                        <path fill="white" d="M78.7042 11.3214C81.6301 11.3214 84.0472 12.2543 85.9554 14.0778C87.8636 15.9013 88.7965 18.9121 88.7965 23.1103V36.7651H81.8845V23.5344C81.8845 19.2089 80.1883 17.0462 76.796 17.0462C75.015 17.0462 73.6156 17.6399 72.6403 18.8697C71.665 20.0571 71.1561 21.7533 71.1561 23.9584V36.8075H64.2441V11.6183H70.2656L70.9017 14.7563C71.7922 13.6962 72.8523 12.848 74.082 12.2543C75.3542 11.6607 76.8808 11.3214 78.7042 11.3214Z"></path>
                        <path fill="white" d="M118.351 2.5434V36.7651H112.33L111.651 33.2878C109.743 35.7898 107.114 37.062 103.806 37.062C101.601 37.062 99.6083 36.5531 97.8273 35.4929C96.0463 34.4328 94.6894 32.9062 93.6717 30.9555C92.6964 29.0048 92.1875 26.7149 92.1875 24.1705C92.1875 21.6261 92.6964 19.3786 93.6717 17.4703C94.6894 15.5197 96.0887 13.993 97.8273 12.9753C99.6083 11.9151 101.644 11.3639 103.849 11.3639C107.114 11.3639 109.658 12.5088 111.439 14.7988V2.5434H118.351ZM105.418 31.4219C107.284 31.4219 108.768 30.7859 109.87 29.4713C110.973 28.1143 111.524 26.3756 111.524 24.2553C111.524 22.0502 110.973 20.3115 109.87 18.9546C108.768 17.5976 107.284 16.9615 105.418 16.9615C103.552 16.9615 102.068 17.64 100.923 18.9546C99.8204 20.3115 99.2691 22.0502 99.2691 24.1705C99.2691 26.3332 99.8204 28.0719 100.923 29.3865C102.025 30.7859 103.552 31.4219 105.418 31.4219Z"></path>
                        <path fill="white" d="M122.168 24.2521C122.168 21.623 122.677 19.3754 123.737 17.4672C124.797 15.5165 126.281 13.9899 128.189 12.9721C130.098 11.912 132.345 11.3607 134.847 11.3607C137.391 11.3607 139.639 11.8696 141.547 12.8873C143.498 13.8626 145.024 15.262 146.084 17.0855C147.187 18.8666 147.781 20.9869 147.781 23.4464C147.781 24.337 147.696 25.1003 147.569 25.7788H129.292V25.9908C129.462 27.8143 130.055 29.2561 131.073 30.2738C132.091 31.334 133.49 31.8428 135.229 31.8428C136.628 31.8428 137.773 31.546 138.706 30.9523C139.639 30.3162 140.275 29.4257 140.572 28.2807H147.399C147.145 29.9346 146.508 31.4612 145.491 32.7758C144.473 34.0904 143.158 35.1929 141.462 35.9562C139.808 36.7195 137.9 37.1012 135.738 37.1012C132.939 37.1012 130.479 36.5923 128.444 35.5322C126.408 34.472 124.839 32.9878 123.737 31.0795C122.719 29.0864 122.168 26.8389 122.168 24.2521ZM140.953 21.2413C140.741 19.7147 140.105 18.5273 139.045 17.7216C138.027 16.8735 136.755 16.4494 135.186 16.4494C133.702 16.4494 132.43 16.8735 131.37 17.764C130.352 18.6121 129.758 19.7571 129.546 21.2413H140.953Z"></path>
                        <path fill="white" d="M157.571 23.9576L148.666 11.6174H156.554L161.769 19.0809L167.112 11.6598H174.491L165.628 24L175 36.8066H167.112L161.345 28.9191L155.621 36.7642H148.242L157.571 23.9576Z"></path>
                        <path fill="white" fill-rule="evenodd" clip-rule="evenodd" d="M19.8031 39.4377C30.7436 39.4377 39.6062 30.6172 39.6062 19.7188C39.6062 8.82047 30.7436 0 19.8031 0C8.86263 0 0 8.82047 0 19.7188C0 30.6172 8.86263 39.4377 19.8031 39.4377ZM19.8031 32.6527C27.8176 32.6527 34.2632 26.207 34.2632 18.277C34.2632 10.3471 27.7752 7.03941 19.8031 7.03941C11.7886 7.03941 5.34302 10.3047 5.34302 18.277C5.30061 26.2494 11.7886 32.6527 19.8031 32.6527Z"></path>
                        <path fill="white" fill-rule="evenodd" clip-rule="evenodd" d="M11.2378 20.614C12.0859 20.614 12.8492 20.2747 13.4429 19.7659C13.7397 20.3172 14.1214 20.9108 14.4606 21.5045C15.2239 22.7767 16.072 24.0913 16.8353 25.0666C17.2169 25.5755 17.641 26.042 18.0226 26.3812C18.3618 26.6781 18.9555 27.1021 19.634 27.1021C20.3125 27.1021 20.9061 26.6781 21.2454 26.3812C21.6694 26.042 22.0935 25.5755 22.4751 25.109C23.2808 24.1337 24.1713 22.8191 24.977 21.5469C25.3586 20.9108 25.7403 20.3172 26.0795 19.7235C26.6732 20.2747 27.4789 20.6564 28.327 20.6564C30.108 20.6564 31.5921 19.2146 31.5921 17.4335C31.5921 15.6525 30.1504 14.2107 28.327 14.2107C26.8852 14.2107 25.6131 15.186 25.2314 16.5006C25.1466 16.6278 25.0618 16.7974 24.977 16.9671C24.4681 17.9 23.7472 19.1298 22.984 20.3596C22.2207 21.5893 21.3726 22.8191 20.6517 23.6672C20.27 24.0913 19.9732 24.4305 19.7188 24.6426C19.6764 24.685 19.634 24.685 19.634 24.7274C19.5916 24.7274 19.5916 24.685 19.5492 24.6426C19.2947 24.4305 18.9979 24.1337 18.6587 23.6672C17.9802 22.7767 17.1745 21.5893 16.4536 20.3596C15.7327 19.1298 15.0543 17.9 14.5454 16.9671C14.4606 16.8399 14.4182 16.7126 14.3758 16.6278C13.9941 15.2284 12.722 14.2107 11.2378 14.2107C9.45682 14.2107 7.97266 15.6525 7.97266 17.4335C7.97266 19.1722 9.41442 20.614 11.2378 20.614Z"></path>
                    </svg>
                    <h1 style={{ marginTop: 0 }}>ROI Calculator</h1>
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
                        <button type="submit" id="submitButton">Calculate</button>
                    </form>
                    <section className="Result">
                        <p>From {date} to today, {productName} had {prodRet.toFixed(2)}% return. Based on this, you will now have ${(startAmount + (prodRet / 100 * startAmount)).toFixed(2)}</p>
                        <p>Let's go to the moon with {productName}.</p>
                        <button><a href={nameTolink.get(productName)} target="_blank" rel="noreferrer">Get Started Today</a></button>
                    </section>
                </div>
            </div>
        </div>
    );
}
