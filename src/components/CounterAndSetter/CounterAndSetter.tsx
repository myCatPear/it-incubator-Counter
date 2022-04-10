import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './CounterAndSetter.module.css'
import Button from "../common/Button";

const CounterAndSetter = () => {
    const [settings, setSettings] = useState(false) // переход в режим настроек и отображения
    const [startValue, setStartValue] = useState<number>(0)
    const [maxValue,setMaxValue] = useState<number>(0)
    const [counter, setCounter] = useState<number>(0)

    useEffect(() => {
        const localStorageStartValue = localStorage.getItem('cAS_start')
        const localStorageMaxValue = localStorage.getItem('cAS_max')
        if (localStorageStartValue) setStartValue(+localStorageStartValue)
        if (localStorageMaxValue) setMaxValue(+localStorageMaxValue)
    },[])

    useEffect(() => {
        localStorage.setItem('cAS_start',startValue.toString())
        localStorage.setItem('cAS_max',maxValue.toString())
    },[startValue,maxValue])

    const changeSetHandler = () => {
        setSettings(!settings)
    }

    const startInputOnChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setStartValue(+e.currentTarget.value)
    }

    const maxInputOnChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setMaxValue(+e.currentTarget.value)
    }

    const incOnChangeHandler = () => {
        setCounter(counter + 1)
    }

    return (
        <div className={s.counter}>
            <div className={s.counter__main}>
                {settings ?
                    <>
                        <label>maxValue
                            <input
                                type="number"
                                value={startValue}
                                onChange={startInputOnChangeHandler}
                            />
                        </label>
                        <label>
                            startValue
                            <input
                                type="number"
                                value={maxValue}
                                onChange={maxInputOnChangeHandler}
                            />
                        </label>
                    </>
                    :
                    <>
                        <span>{counter}</span>
                    </>

                }
            </div>
            <div className={s.counter__func}>
                <Button title={'inc'} callback={incOnChangeHandler}/>
                <Button title={'reset'} callback={() => {}}/>
                <Button title={'set'} callback={changeSetHandler}/>
            </div>
        </div>
    );
};

export default CounterAndSetter;