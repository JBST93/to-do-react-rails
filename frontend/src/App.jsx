import { useState, useEffect } from 'react'
import './App.css'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);
import BarChart from "./components/BarChart";


function App() {


  const [volume, setVolume] = useState([{exchange:"coinbase", volume24hTo: 2323},{exchange: "bitflyer", volume24hTo: 2323}])

    const [totVolume, setTotVolume] = useState(0)
    const [base, setBase] = useState('BTC')
    const [quote, setQuote] = useState('USD')



  const fetchData = async () => {
    const apiUrl = `/api/top/exchanges?fsym=${base}&tsym=${quote}`
    fetch(apiUrl)
      .then(resp => resp.json())
      .then(data => {
        setVolume(data.Data)
      })
      .catch(error => {
        console.error('Error:', error);
    });

  };

  useEffect(() => {fetchData(),[]})


  const [formData, setFormData] = useState({base: "", quote: ""})

  const handleChange = (e) => {
    e.preventDefault()
    const {name, value} = e.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setBase(formData.base.toUpperCase())
    setQuote(formData.quote.toUpperCase())
    fetchData()
    setFormData({base: "", quote: ""})
  }

  useEffect(() => {
    const total = volume.reduce((accumulator, currentItem) => accumulator + currentItem.volume24hTo, 0);
    setTotVolume(total);
  }, [volume]);

  function filterPair(event) {
    event.preventDefault()
    setBase(event.target.dataset.base)
    setQuote(event.target.dataset.quote)
    fetchData()
  }


  const [chartData, setChartData] = useState({
    labels: volume.map((data) => data.exchange),
    datasets: [
      {
        label: "Users Gained ",
        data: volume.map((data) => data.volume24hTo),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
          "#913831",
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });

  useEffect(() => {
    setChartData({
      labels: volume.map((data) => data.exchange),
      datasets: [
        {
          label: "Volume 24h",
          data: volume.map((data) => data.volume24hTo),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
            "#913831",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
  }, [volume]);


  return (
    <>

    <h1>Exchange Volumes</h1>
    <h2>Last Updated: {new Date().toDateString()}</h2>

      <form>
        <button onClick={filterPair} data-base='BTC' data-quote="EUR">BTC/EUR</button>
        <button onClick={filterPair} data-base='ETH' data-quote="EUR">ETH/EUR</button>
        <button onClick={filterPair} data-base='BTC' data-quote="USD">BTC/USD</button>
        <button onClick={filterPair} data-base='ETH' data-quote="USD">ETH/USD</button>


      </form>
      <div className="app">
        <form onSubmit={handleSubmit}>
          <label>Base</label>
          <input placeholder="BTC" value={formData.base} name='base' onChange={handleChange}></input>
          <label>Quote</label>
          <input placeholder="EUR" value={formData.quote} name="quote" onChange={handleChange}></input>
          <button>Change</button>
        </form>
      <h3>Total Volume for {base}/{quote}: {Math.round(totVolume).toLocaleString()}</h3>

        <table>
          <thead>
            <tr>
              <th></th>
              <th>Exchange</th>
              <th>Pair</th>
              <th>Volume in {base}</th>
              <th>Volume in {quote}</th>
              <th>Market Share</th>
              <th>USD equivalent</th>

            </tr>
          </thead>
          <tbody>
            {volume.map((item, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{item.exchange}</td>
                <td>{`${base}/${quote}`}</td>
                <td>{Math.round(item.volume24h).toLocaleString()}</td>
                <td>{Math.round(item.volume24hTo).toLocaleString()}</td>
                <td>{Math.round(item.volume24hTo/totVolume*100)}%</td>
                <td>{Math.round(item.volume24hTo*1.08).toLocaleString()}</td>

              </tr>
            ))}
          </tbody>
        </table>
        <br />
      </div>
      <BarChart chartData={chartData} />

    </>
  );



}



export default App
