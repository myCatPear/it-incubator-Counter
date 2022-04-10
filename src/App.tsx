import React, {useEffect, useState} from 'react';
import g from './App.module.css';
import Counter from "./components/Counter/Counter";
import CounterAndSetter from './components/CounterAndSetter/CounterAndSetter';
import Setter from "./components/Setter/Setter";

function App() {
    //----------START USE STATE COUNTER 1 VERSION----------------
    const [startValue, setStartValue] = useState<number>(0) // начальное значение
    const [maxValue, setMaxValue] = useState<number>(10) // максимальное значение
    const [counterValue, setCounterValue] = useState<number>(0) // число счетчика
    const [changedInput, setChangedInput] = useState(false) //если ввели новые значения в инпут
    const [isDisabledSet, setIsDisabledSet] = useState(false) // делать кнопку Set недоступной
    const [isDisabledInc, setIsDisabledInc] = useState(false) // делать кнопку Inc недоступной
    const [isDisabledReset, setIsDisabledReset] = useState(false) // делать кнопку Inc недоступной
    const [errorInput, setErrorInput] = useState(false) //если ввели некорректные числа
//----------END USE STATE COUNTER 1 VERSION----------------

    useEffect(() => {
        const localStorageStartValue = localStorage.getItem('startValue')
        const localStorageMaxValue = localStorage.getItem('maxValue')
        if (localStorageStartValue) setStartValue(JSON.parse(localStorageStartValue))
        if (localStorageMaxValue) setMaxValue(JSON.parse(localStorageMaxValue))
    }, [])

    useEffect(() => {
        localStorage.setItem('maxValue', JSON.stringify(maxValue))
        localStorage.setItem('startValue', JSON.stringify(startValue))

        if (maxValue <= startValue) {
            setErrorInput(true)
            setIsDisabledSet(true)
        } else {
            setIsDisabledInc(false)
            setErrorInput(false)
            setChangedInput(true)
            setIsDisabledSet(false)
        }

        if (startValue < 0) {
            setErrorInput(true)
            setIsDisabledSet(true)
        }

    }, [maxValue, startValue])

    useEffect(() => {
        if (counterValue === maxValue) {
            setIsDisabledInc(true)
        }
    }, [counterValue, maxValue])


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
                    isDisabledSet={isDisabledSet}
                    setIsDisabledSet={setIsDisabledSet}
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
                    errorInput={errorInput}
                    setErrorInput={setErrorInput}
                    isDisabledInc={isDisabledInc}
                    setIsDisabledInc={setIsDisabledInc}
                    isDisabledReset={isDisabledReset}
                    setIsDisabledReset={setIsDisabledReset}
                />
            </div>
            <div className={g.container}>
                <CounterAndSetter/>
            </div>
        </div>
    );
}

export default App;
