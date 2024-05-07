import Country from './Country';
import Inputs from './Inputs';

interface CountryListProps {
    countries: string[];
    handleGuess: (country: string) => void;
}

const CountryList = ({countries, handleGuess}: CountryListProps) => {
    return (
        countries.sort().map((country, index) => <Country key={index} country={country}><Inputs handleGuess={() => handleGuess(country)} /></Country>)
    )
}

export default CountryList