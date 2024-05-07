import Country from './Country';

interface CountryListProps {
    countries: string[];
    selectCountry: (country: string) => void;
    activeCountry: string;
}

const CountryList = ({countries, selectCountry, activeCountry}: CountryListProps) => {
    return (
        countries.sort().map((country, index) => <Country activeCountry={activeCountry} selectCountry={selectCountry} key={index} country={country} />)
    )
}

export default CountryList