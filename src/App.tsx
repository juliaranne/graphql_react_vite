import { useState, useMemo } from 'react'
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import CountryList from './components/CountryList';
import './App.css';

interface Country {
  name: string;
  code: string;
  __typename: "Country";
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

const GET_COUNTRIES = gql`query GetCountries {
  countries {
    name
    code
  }
}`

const GET_CAPITAL = gql`query GetCountry($code: ID!) {
  country(code: $code) {
    name
    capital
  }
}`

const DisplayLocations = () => {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [getAnswer, { loading: load, data: response }] = useLazyQuery(GET_CAPITAL);
  const [alphaCountries, setAlphaCountries] = useState<SortedData | null>(null)

  useMemo(() => {
    if (data) {
      setAlphaCountries(sortData(data.countries))
    }
  }, [data])

  const handleGuess = (country: string) => {
    const activeCountry: Country | undefined = Object.values<Country>(data.countries).find((item: Country) => item.name === country);
    if (activeCountry) {
      const answer = getAnswer({ variables: { code: activeCountry.code } });
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return alphaCountries ? Object.keys(alphaCountries).sort().map((key, index) => (
    <div key={index}>
      {key}
      <CountryList handleGuess={handleGuess} countries={alphaCountries[key]} />
    </div>
  )) : null
}

export default DisplayLocations
