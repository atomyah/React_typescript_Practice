import { SelectorType } from "../type"

const Selector = (props: SelectorType) => {
    return (
        <div className="selector-container">
            {/* (<select>タグでonChangeハンドラーを使う例↓) */}
            <select onChange={(e) => props.setCountry(e.target.value)}>
                {props.countriesJson.map((country, index) =>
                    <option key={index} value={country.Slug}>{country.Country}</option>
                )}
            </select>
        </div>
    );
};
export default Selector;