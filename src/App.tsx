import { useState, useMemo } from 'react'
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import CountryList from './components/CountryList';
import Inputs from './components/Inputs';
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
  const [alphaCountries, setAlphaCountries] = useState<SortedData | null>(null);
  const [activeCountry, setActiveCountry] = useState<string>('');
  const [correct, setCorrect] = useState<boolean>(false);

  useMemo(() => {
    if (data) {
      setAlphaCountries(sortData(data.countries))
    }
  }, [data])

  const handleGuess = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userGuess = event.currentTarget.value;
    const country: Country | undefined = Object.values<Country>(data.countries).find((item: Country) => item.name === activeCountry);
    if (country) {
      getAnswer({ variables: { code: country.code } });
      if (response?.country) {
        console.log(response.country.capital, userGuess.trim())
        setCorrect(response.country.capital === userGuess.trim());
      }
    }
  }

  const selectCountry = (country: string) => {
    setActiveCountry(country);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <> 
      {alphaCountries ? Object.keys(alphaCountries).sort().map((key, index) => (
        <ul key={index}>
          {key}
          <CountryList selectCountry={selectCountry} countries={alphaCountries[key]} activeCountry={activeCountry} />
        </ul>
      )) : null}
      <Inputs handleGuess={handleGuess} correct={correct} />
    </>
  )
}

export default DisplayLocations
