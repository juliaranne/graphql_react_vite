// import { useState } from 'react'

interface InputProps {
    handleGuess: () => void
}

const Inputs = ({handleGuess}: InputProps) => {
    return (
       <form>
            <label>Capital
                <input type="text" onChange={handleGuess} ></input>
            </label>
       </form>
    )
}

export default Inputs