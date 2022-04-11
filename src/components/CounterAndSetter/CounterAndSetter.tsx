import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './CounterAndSetter.module.css'
import Button from "../common/Button";

const CounterAndSetter = () => {
    const [settings, setSettings] = useState(false) // переход в режим настроек и отображения
    const [startValue, setStartValue] = useState<number>(0)
    const [maxValue, setMaxValue] = useState<number>(0)
    const [counter, setCounter] = useState<number>(0)
    const [disabledInc, setDisabledInc] = useState(false)
    const [disabledReset, setDisabledReset] = useState(false)
    const [disabledSet, setDisabledSet] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const localStorageStartValue = localStorage.getItem('cAS_start')
        const localStorageMaxValue = localStorage.getItem('cAS_max')
        if (localStorageStartValue) setStartValue(+localStorageStartValue)
        if (localStorageMaxValue) setMaxValue(+localStorageMaxValue)
    }, [])

    useEffect(() => {
        localStorage.setItem('cAS_start', startValue.toString())
        localStorage.setItem('cAS_max', maxValue.toString())
    }, [startValue, maxValue])

    const changeSetHandler = () => {
        setSettings(!settings);
        setDisabledReset(!disabledReset);
        (settings) ? setDisabledInc(false) : setDisabledInc(true)
        if (settings) setCounter(startValue)
    }

    const startInputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (+e.currentTarget.value < 0 || +e.currentTarget.value >= maxValue) {
            setError(true)
            setDisabledSet(true)
        } else {
            setError(false)
            setDisabledSet(false)
        }
        setStartValue(+e.currentTarget.value)
    }

    const maxInputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (+e.currentTarget.value <= startValue) {
            setError(true)
            setDisabledSet(true)
        }
        else {
            setError(false)
            setDisabledSet(false)
        }
        setMaxValue(+e.currentTarget.value)
    }

    const incOnChangeHandler = () => {
        setCounter(counter + 1)
        if (counter + 1 === maxValue) {
            setDisabledInc(true)
        } else {
            setDisabledInc(false)
        }

    }

    const resetCounterHandler = () => {
        setCounter(startValue)
        setDisabledInc(false)
    }


    return (
        <div className={s.counter}>
            <div className={s.counter__main}>
                {settings ?
                    <div className={s.counter__set}>
                        <label>maxValue:
                            <input
                                type="number"
                                value={maxValue}
                                onChange={maxInputOnChangeHandler}
                                className={`${error && s.error}`}
                            />
                        </label>
                        <label>
                            startValue:
                            <input
                                type="number"
                                value={startValue}
                                onChange={startInputOnChangeHandler}
                                className={`${error && s.error}`}
                            />
                        </label>
                    </div>
                    :
                    <>
                        <span className={`${s.counter__counter} ${counter === maxValue && s.red}`}>{counter}</span>
                    </>

                }
            </div>
            <div className={s.counter__func}>
                <Button
                    style={`${s.button} ${disabledInc && s.button__disabled}`}
                    isDisabled={disabledInc}
                    title={'inc'}
                    callback={incOnChangeHandler}
                />
                <Button
                    style={`${s.button} 
                    ${disabledReset && s.button__disabled}`}
                    isDisabled={disabledReset}
                    title={'reset'}
                    callback={resetCounterHandler}
                />
                <Button
                    isDisabled={disabledSet}
                    style={`${s.button} ${disabledSet && s.button__disabled}`}
                    title={'set'}
                    callback={changeSetHandler}
                />
            </div>
        </div>
    );
};

export default CounterAndSetter;