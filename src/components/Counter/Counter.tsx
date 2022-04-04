import React from 'react';
import g from '../../App.module.css'
import Button from "../common/Button";

type CounterPropsType = {
    counterValue: number
    setCounterValue: (number: number) => void
    startValue: number
    maxValue: number
    changedInput: boolean
    setChangedInput: (isChanged: boolean) => void
    errorInput: boolean
    setErrorInput: (isError: boolean) => void
    isDisabledInc: boolean
    setIsDisabledInc: (isDisabled: boolean) => void
    isDisabledReset: boolean
    setIsDisabledReset: (isDisabled: boolean) => void
}


const Counter = (props: CounterPropsType) => {
    const incValueHandler = () => {
       /* if (props.counterValue === props.maxValue) {
            props.setIsDisabledInc(true)
        }*/
        props.setCounterValue(props.counterValue + 1)
    }

    const resetValueHandler = () => {
        props.setCounterValue(props.startValue)
        props.setIsDisabledInc(false)
    }

    const spanClassName = `
    ${!props.changedInput && g.dataForm__value}
    ${props.counterValue === props.maxValue ? g.dataForm__text_error : ""}
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
                    style={`${g.button} ${props.isDisabledInc && g.button__disabled}`}
                    title={'inc'}
                    callback={incValueHandler}
                    isDisabled={props.isDisabledInc}
                />
                <Button
                    style={`${g.button} ${props.isDisabledReset && g.button__disabled}`}
                    title={'reset'}
                    callback={resetValueHandler}
                    isDisabled={props.isDisabledReset}
                />
            </div>
        </div>
    );
};

export default Counter;