import { createContext, useEffect, useState } from "react";
// ! Provider Setup
export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  // ! States for Coin and Currency
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });
  // ! Function to retrieve data from API
  const fetchAllCoin = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": import.meta.env.VITE_API_KEY,
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setAllCoin(response))
      .catch((err) => console.error(err));
    console.log(allCoin);
  };
  // ! The function that receives data from the API will only run when the page is loaded.
  useEffect(() => {
    fetchAllCoin();
  }, [currency]);
  const ContextValue = {
    allCoin,
    currency,
    setCurrency,
  };
  return (
    <CoinContext.Provider value={ContextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
