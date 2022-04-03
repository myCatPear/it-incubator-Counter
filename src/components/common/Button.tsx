import React from 'react';
import {isDisabled} from "@testing-library/user-event/dist/utils";

type ButtonPropsType = {
    title:string
    callback:() => void
    style?:string
    isDisabled?:boolean
}

const Button:React.FC<ButtonPropsType> = ({title,callback,style,isDisabled}) => {
    const callbackHandler = () => {
        callback()
    }

    return (
     <button className={style} onClick={callbackHandler} disabled={isDisabled}>{title}</button>
    );
};

export default Button;