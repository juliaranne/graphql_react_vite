import { PropsWithChildren, useState } from 'react'

interface CountryListProps {
    countries: string[]
}

const CountryList = ({countries, children}: PropsWithChildren<CountryListProps>) => {
    const [showQuiz, setShowQuiz] = useState<boolean>(false);
    return (
        countries.sort().map(country => <li key={country}><button onClick={() => setShowQuiz(!showQuiz)} type="button">{country}</button>{children}</li>)
    )
}

export default CountryList