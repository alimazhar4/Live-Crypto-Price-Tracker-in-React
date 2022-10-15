import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Coin from "./Coin";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.log(error));
  });

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase()) || coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <h1 className="page-title">Live Crypto Price Tracker</h1>
      <p className="credentials">
        By{" "}
        <a
          href="https://www.github.com/alimazhar4"
          target="_blank"
          rel="noreferrer"
        >
          Ali Mazhar
        </a>
      </p>
      <div className="search-bar">
        <form>
          <input
            type="text"
            placeholder="Search Crypto"
            className="coin-input"
            onChange={handleChange}
          ></input>
        </form>
      </div>

      <div className="center table-headings">
        <div className="coin">
          <p className="coin-symbol">Name</p>
          <p className="coin-symbol symbol-header">Symbol</p>
        </div>
        <div className="coin-data">
          <p className="coin-price">Price</p>
          <p className="coin-percent">24h Change</p>
          <p className="coin-volume">24h Volume</p>
          <p className="coin-marketcap">Market Cap</p>
        </div>
      </div>

      <div className="coin-data-display">
      { filteredCoins.length < 1 ? ( 
        <div className="no-search-result"> 
        <h3>No Search Results Found!</h3> 
        <p>Please check you search spellings and remember this tracker only keeps record of the top 200 cryptocurrencies</p>
        </div>
      ): ( 
        filteredCoins.map((coin) => {
          return (
            <Coin
              key={coin.id}
              name={coin.name}
              image={coin.image}
              price={coin.current_price}
              symbol={coin.symbol}
              volume={coin.total_volume}
              priceChange={coin.price_change_percentage_24h}
              marketCap={coin.market_cap}
            />
          );
        })
      )}
      </div>
      <div className="empty-div"></div>
      <footer>
        For more amazing projects, you can visit my Github Profile at <a href="https://www.github.com/alimazhar4/" target="_blank" rel="noreferrer">github.com/alimazhar4</a>
      </footer>
    </div>
  );
}

export default App;
