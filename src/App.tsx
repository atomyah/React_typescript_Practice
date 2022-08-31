import { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import countriesJson from "./countries.json";
import TopPage from './pages/TopPage';
import WorldPage from "./pages/WorldPage";
import './App.css';
import { CountryDataType, AllCountriesDataTypeArray } from "./type"

function App() {
  const [loading, setLoading] = useState<boolean>(false)
  const [country, setCountry] = useState<string>("japan")
  const [countryData, setCountryData] = useState<CountryDataType>(
    {
      date: "",
      newConfirmed: 0,
      totalConfirmed: 0,
      newRecovered: 0,
      totalRecovered: 0,
    }
  )     
  const [allCountriesData, setAllCountriesData] = useState<AllCountriesDataTypeArray>([{
    Country: "",
    NewConfirmed: 0,
    TotalConfirmed: 0,
  }]) //配列のステート変数

  useEffect(() => {
    const getCountryData = () => {
      setLoading(true)
      fetch(`https://monotein-books.vercel.app/api/corona-tracker/country/${country}`, 
      // {mode: "cors"}  'http://localhost:3000' was blocked by CORS policy:エラーの対処.
      // ブラウザをリロードしてセレクターを選びなおせば動いた.要らないみたい.
      )
      .then(res => res.json())
      .then(data => {
        setCountryData({
          date: data[data.length -1].Date,
          newConfirmed: data[data.length -1].Confirmed - data[data.length -2].Confirmed,
          totalConfirmed: data[data.length -1].Confirmed,
          newRecovered: data[data.length -1].Recovered - data[data.length -2].Recovered,
          totalRecovered: data[data.length -1].Recovered
        });
        setLoading(false)
      }).catch(err => alert("エラーが発生しました。ページをリロードしてもう一度お試しください"))
    }
    getCountryData();
  },[country]);


  useEffect(()=> {
      // ↓元々はgetAllCountryData関数だったもの.
      fetch("https://monotein-books.vercel.app/api/corona-tracker/summary", 
      )
      .then(res => res.json())
      .then(data => setAllCountriesData(data.Countries) 
                          //data.Countriesは配列だし、ステート変数allCountriesDataも配列で
                          //初期かしているので、setAllCountriesData(data.Countries)と。
                          //そのままぶち込んでいる。
      ).catch(err => alert("エラーが発生しました。ページをリロードしてもう一度お試しください"))
  },[]); // useEffect()の中に`,[]`を追加してあげないと、中身の処理をエンドレスに行ってしまう.

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" 
               element={<TopPage countriesJson={countriesJson} setCountry={setCountry} 
               countryData={countryData} loading={loading} />} />
        <Route path="/world"
               element={<WorldPage allCountriesData={allCountriesData} />} /> 
          
      </Routes>
    </BrowserRouter>
  );
}

export default App;
