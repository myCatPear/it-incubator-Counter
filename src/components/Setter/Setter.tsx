import React, {ChangeEvent, useEffect, useState} from 'react';
import g from '../../App.module.css'
import Button from "../common/Button";

type SetterPropsType = {
    startValue: number
    setStartValue: (number: number) => void
    maxValue: number
    setMaxValue: (number: number) => void
    setCounterValue: (number: number) => void
    changedInput: boolean
    setChangedInput: (isChanged: boolean) => void
    isDisabled: boolean
    setIsDisabled: (isDisabled: boolean) => void
    errorInput:boolean
    setErrorInput:(isError:boolean) => void
}

const Setter: React.FC<SetterPropsType> = (
    {
        startValue,
        setStartValue,
        maxValue,
        setMaxValue,
        setCounterValue,
        changedInput,
        setChangedInput,
        isDisabled,
        setIsDisabled,
        errorInput,
        setErrorInput
    }) => {

    const onChangeStartInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setChangedInput(true)
        setIsDisabled(false)
        setStartValue(JSON.parse(e.currentTarget.value))
    }

    const onChangeMaxInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
            if (maxValue <= startValue) {
                setErrorInput(true)
                setIsDisabled(true)
                setMaxValue(JSON.parse(e.currentTarget.value))
            } else {
                setErrorInput(false)
                setChangedInput(true)
                setIsDisabled(false)
                setMaxValue(JSON.parse(e.currentTarget.value))
            }
    }

    const sendStartInputToCounterHandler = () => {
        setCounterValue(startValue)
        setChangedInput(false)
    }

    return (
        <div className={g.mainForm}>
            <div className={g.dataForm}>
                <label className={g.dataForm__label}>
                    <span className={g.dataForm__text}>max value:</span>
                    <input
                        onChange={onChangeMaxInputHandler}
                        value={maxValue}
                        className={`${g.dataForm__input} ${errorInput && g.dataForm__input_error}`}
                        type="number"/>
                </label>
                <label className={g.dataForm__label}>
                    <span className={g.dataForm__text}>start value:</span>
                    <input
                        value={startValue}
                        onChange={onChangeStartInputHandler}
                        className={`${g.dataForm__input} ${errorInput && g.dataForm__input_error}`}
                        type="number"/>
                </label>

            </div>
            <div className={g.funcForm}>
                <Button
                    title={'set'}
                    callback={sendStartInputToCounterHandler}
                    style={`${g.button} ${isDisabled && g.button__disabled}`}
                    isDisabled={isDisabled}
                />
            </div>
        </div>
    );
};

export default Setter;