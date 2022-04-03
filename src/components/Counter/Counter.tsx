import React from 'react';
import g from '../../App.module.css'
import Button from "../common/Button";
import {isDisabled} from "@testing-library/user-event/dist/utils";

type CounterPropsType = {
    counterValue: number
    setCounterValue: (number: number) => void
    startValue: number
    maxValue: number
    changedInput: boolean
    setChangedInput: (isChanged: boolean) => void
    isDisabled: boolean
    setIsDisabled: (isDisabled: boolean) => void
    errorInput:boolean
    setErrorInput:(isError:boolean) => void
}


const Counter = (props: CounterPropsType) => {
    const incValueHandler = () => {
        if (props.counterValue === props.maxValue) return
        props.setCounterValue(props.counterValue + 1)
    }

    const resetValueHandler = () => {
        props.setCounterValue(props.startValue)
    }

    const spanClassName = `
    ${!props.changedInput && g.dataForm__value}
    ${props.changedInput && g.dataForm__value_changed}
    ${props.errorInput && g.dataForm__value_changed}
    `
//первый класс спана просто счетчик, второй если поменяли значение в инпутах, третий если ошибка ввода инпута
    return (
        <div className={g.mainForm}>
            <div className={g.dataForm}>
                    <span className={spanClassName}>
                        {!props.errorInput && !props.changedInput && props.counterValue}
                        {!props.errorInput && props.changedInput && 'Set the value'}
                        {props.errorInput && 'Invalid input'}
                    </span>
            </div>
            <div className={g.funcForm}>
                <Button
                    style={`${g.button} ${props.isDisabled && g.button__disabled}`}
                    title={'inc'}
                    callback={incValueHandler}
                    isDisabled={props.isDisabled}
                />
                <Button
                    style={`${g.button} ${props.isDisabled && g.button__disabled}`}
                    title={'reset'}
                    callback={resetValueHandler}
                    isDisabled={props.isDisabled}
                />
            </div>
        </div>
    );
};

export default Counter;