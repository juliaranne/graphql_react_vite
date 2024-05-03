import Country from './Country';
import Inputs from './Inputs';

interface CountryListProps {
    countries: string[]
}

const CountryList = ({countries}: CountryListProps) => {
    console.log('hello')
    return (
        countries.sort().map(country => <Country country={country}><Inputs /></Country>)
    )
}

export default CountryList