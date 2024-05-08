interface InputProps {
    handleGuess: (event: React.ChangeEvent<HTMLInputElement>) => void;
    correct: boolean;
}

const Inputs = ({handleGuess, correct}: InputProps) => {
    return (
       <form>
            <label>Capital
                <input type="text" onChange={handleGuess} ></input>
                {correct ? 'yes' : 'no'}
            </label>
       </form>
    )
}

export default Inputs