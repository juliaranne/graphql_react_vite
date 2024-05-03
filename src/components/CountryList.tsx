import Country from './Country';

interface CountryListProps {
    countries: string[]
}

const CountryList = ({countries}: CountryListProps) => {
    console.log('hello')
    return (
        countries.sort().map(country => <Country country={country}>hello</Country>)
    )
}

export default CountryList