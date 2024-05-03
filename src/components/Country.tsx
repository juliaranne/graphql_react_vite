import { useState, PropsWithChildren } from 'react'

interface CountryProps {
    country: string
}

const Country = ({country, children}: PropsWithChildren<CountryProps>) => {
    const [showQuiz, setShowQuiz] = useState<boolean>(false);
    
    return (
        <li key={country}><button onClick={() => setShowQuiz(!showQuiz)} type="button">{country}{showQuiz ? children : null}</button></li>
    )
}

export default Country