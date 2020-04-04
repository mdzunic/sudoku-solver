import React, { ChangeEvent, useState } from "react";
import "./Cell.css"
interface IProps {
    setCellValue: (a: number | string, b: number) => void
    index: number
    getCellValue: number | undefined
}

function Cell(props: IProps) {
    const [value, setValue] = useState<number | string>();
    const checkInput = (e: ChangeEvent<HTMLInputElement>) => {
        const changedValue = parseInt(e.target.value);
        // console.warn(props.getCellValue)
        setValue(changedValue);
        props.setCellValue(changedValue, props.index);
        if (changedValue < 1 || changedValue > 9) {
            setValue("");
            props.setCellValue("", props.index);
        }
    }
    return (
        <div className="Cell">
            <input onChange={checkInput} value={props.getCellValue || value || ""} type="number" min="1" max="9"></input>
        </div>
    );
}

export default Cell;