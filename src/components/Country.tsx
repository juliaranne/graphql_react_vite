import { useState, PropsWithChildren } from 'react'

interface CountryProps {
    country: string
    selectCountry: (country: string) => void;
    activeCountry: string;
}

const Country = ({country, selectCountry, activeCountry}: PropsWithChildren<CountryProps>) => {
    return (
        <li key={country}><button onClick={() => selectCountry(country)} type="button">{country}</button></li>
    )
}

export default Country