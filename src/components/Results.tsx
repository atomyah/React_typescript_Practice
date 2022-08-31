import Loading from "./Loading";
import { ResultsType } from "../type"


                    //↓ `props`の代わりに直接その要素を書いてしまっている.
const Results = ({countryData, loading}: ResultsType) => {
    // 分割代入。props.countryDataの配列の要素をこの1行でまとめている（App.js参照）.
    const { date, newConfirmed, totalConfirmed, newRecovered, totalRecovered } = countryData

    return (
        <div className="results-container">
            {loading ? 
                <Loading /> 
                    :
            <div>
                <p>日付：{date.slice(0,10)}</p>
                <p>新規感染者：{newConfirmed.toLocaleString()}</p>
                <p>感染者総数：{totalConfirmed.toLocaleString()}</p>
                <p>新規回復者：{newRecovered.toLocaleString()}</p>
                <p>回復者総数：{totalRecovered.toLocaleString()}</p>
            </div>
            }
        </div>
    );
};
export default Results;

/* 分割代入前の書き方↓
const Results = (props) => {
    return (
        <div className="results-container">
            <p>日付：{props.countryData.date.slice(0,10)}</p>
            <p>新規感染者：{props.countryData.newConfirmed.toLocaleString()}</p>
            <p>感染者総数：{props.countryData.totalConfirmed.toLocaleString()}</p>
            <p>新規回復者：{props.countryData.newRecovered.toLocaleString()}</p>
            <p>回復者総数：{props.countryData.totalRecovered.toLocaleString()}</p>
        </div>
    );
};
export default Results;
*/