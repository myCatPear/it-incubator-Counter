import React, {useEffect, useState} from 'react';
import g from './App.module.css';
import Counter from "./components/Counter/Counter";
import Setter from "./components/Setter/Setter";

function App() {
    const [startValue, setStartValue] = useState<number>(0) // начальное значение
    const [maxValue, setMaxValue] = useState<number>(10) // максимальное значение
    const [counterValue, setCounterValue] = useState<number>(0) // число счетчика
    const [changedInput, setChangedInput] = useState(false) //если ввели новые значения в инпут
    const [isDisabled, setIsDisabled] = useState(false) // делать кнопку недоступной
    const [errorInput, setErrorInput] = useState(false) //если ввели некорректные числа

    useEffect(() => {
        const localStorageStartValue = localStorage.getItem('startValue')
        const localStorageMaxValue = localStorage.getItem('maxValue')
        if (localStorageStartValue) setStartValue(JSON.parse(localStorageStartValue))
        if (localStorageMaxValue) setMaxValue(JSON.parse(localStorageMaxValue))
    },[])

    useEffect(() => {
        localStorage.setItem('maxValue', JSON.stringify(maxValue))
        localStorage.setItem('startValue', JSON.stringify(startValue))
    },[maxValue,startValue])


    return (
        <div className={g.App}>
            <div className={g.container}>
                <Setter
                    startValue={startValue}
                    setStartValue={setStartValue}
                    maxValue={maxValue}
                    setMaxValue={setMaxValue}
                    setCounterValue={setCounterValue}
                    changedInput={changedInput}
                    setChangedInput={setChangedInput}
                    isDisabled={isDisabled}
                    setIsDisabled={setIsDisabled}
                    errorInput={errorInput}
                    setErrorInput={setErrorInput}
                />
                <Counter
                    counterValue={counterValue}
                    setCounterValue={setCounterValue}
                    startValue={startValue}
                    maxValue={maxValue}
                    changedInput={changedInput}
                    setChangedInput={setChangedInput}
                    isDisabled={isDisabled}
                    setIsDisabled={setIsDisabled}
                    errorInput={errorInput}
                    setErrorInput={setErrorInput}
                />
            </div>

        </div>
    );
}

export default App;
