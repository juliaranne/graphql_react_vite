import { useState, useMemo } from 'react'
import { useQuery, gql } from '@apollo/client';
import CountryList from './components/CountryList';
import './App.css';

interface Country {
  name: string;
  __typename: "Country"
}

interface SortedData {
  [key: string]: string[]
}

const sortData = (data: Country[]) => {
  return data.reduce((acc, curr) => {
    const letter = curr.name.charAt(0).toLowerCase();
    acc[letter] === undefined ? acc[letter] = [curr.name] : acc[letter].push(curr.name);
    return acc;
  }, {} as SortedData)
}

const GET_COUNTRIES = gql`query GetCountry {
  countries {
    name
  }
}`

const DisplayLocations = () => {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [alphaCountries, setAlphaCountries] = useState<SortedData | null>(null)

  useMemo(() => {
    if (data) {
      setAlphaCountries(sortData(data.countries))
    }
  }, [data])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return alphaCountries ? Object.keys(alphaCountries).sort().map((key, index) => (
    <div key={index}>
      {key}
      <CountryList countries={alphaCountries[key]}>hello</CountryList>
    </div>
  )) : null
}

export default DisplayLocations
