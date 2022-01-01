import React, { useState } from "react";
import "./App.css";
import { calculate } from "./utils";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const defaultValues = {
  startBalance: 10000,
  years: 10,
  monthlyContribution: 500,
  annualRate: 7
};

const productToReturn = new Map()
productToReturn.set('DPI', 144.76)
productToReturn.set('MVI', 127.95)
productToReturn.set('BED', -22.34)
productToReturn.set('ETH2X-FLI', -50.47)
productToReturn.set('ETH2X-FLI-P', -50.47)
productToReturn.set('BTC2X-FLI', -10.11)
productToReturn.set('DATA', -24.72)

const defaultChartOptions = calculateChartOptions(defaultValues);
export default function App() {

    const handleSubmit = (evt) => {
        evt.preventDefault()
        const newChartOptions = calculateChartOptions({
            startBalance: parseInt(startAmount),
            years: parseInt(years),
            monthlyContribution: parseInt(monthlyContribution),
            annualRate: productToReturn.get(productName)
        })
        setChartOptions(newChartOptions)
    }
    const [chartOptions, setChartOptions] = useState(defaultChartOptions);
    const [startAmount, setStartAmount] = useState(10000)
    const [productName, setProductName] = useState("DPI")
    const [monthlyContribution, setMonthlyContribution] = useState(500)
    const [years, setYears] = useState(10)

    return (
        <div className="App" style={{ margin: 30 }}>
        <h1 style={{ marginBottom: 5 }}>ROI Calculator</h1>
        <form
            onSubmit={handleSubmit}
        >
        <p>I have <input type="number" value={startAmount} onChange={e => setStartAmount(e.target.value)}/> dollars right now.
            If I invested it in 
            <select defaultValue={productName} onChange={e => setProductName(e.target.value)}>
                <option value="DPI">DeFi Pulse Index</option>
                <option value="MVI">Metaverse Index</option>
                <option value="BED">Bankless BED Index</option>
                <option value="ETH2X-FLI">ETH 2x Flexible Leverage Index</option>
                <option value="ETH2X-FLI-P">ETH 2x Flexible Leverage Index (Polygon)</option>
                <option value="BTC2X-FLI">BTC 2x Flxible Leverage Index</option>
                <option value="DATA">Data Economy index</option>
            </select>, putting in an additional <input type="number" value={monthlyContribution} onChange={e => setMonthlyContribution(e.target.value)}/> dollars per month, 
            how much will I have in <input type="number" value={years} onChange={e => setYears(e.target.value)}/> years?
        </p>
        <input type="submit" />
        </form>
        <p>Last year {productName} had {productToReturn.get(productName)}% return. Based on this, in {years} years, you will have $AMOUNT</p>
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        <p>Let's go to the moon with {productName}</p>
        <button>Get Started Today</button>
    </div>
  );
}

function calculateChartData(values) {
  return calculate(values).map((yearData) => {
    return [yearData.age, yearData.balance];
  });
}

function chartCurrencyFormatter({ value }) {
  return "$ " + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function calculateChartOptions(values) {
  return {
    chart: {
      type: "column",
      zoomType: "x",
      panning: { enabled: true },
      panKey: "shift"
    },
    title: { text: "Balance Over Years" },
    subtitle: {
      text: "Click and drag to zoom in. Hold down shift key to pan."
    },
    yAxis: {
      title: "",
      labels: { formatter: chartCurrencyFormatter }
    },
    series: [
      {
        name: "Balance",
        color: "lightgreen",
        label: { formatter: chartCurrencyFormatter },
        dataLabels: {
          enabled: true,
          formatter: function () {
            return chartCurrencyFormatter({ value: this.y });
          }
        },
        data: calculateChartData(values)
      }
    ]
  };
}
