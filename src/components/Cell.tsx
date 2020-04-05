import React, { ChangeEvent, useState } from "react";
import "./Cell.css"
interface ICellProps {
    setCellValue: (a: number | string, b: number) => void
    index: number
    getCellValue: (a: number) => number | undefined
}

function Cell(props: ICellProps) {
    const [value, setValue] = useState<number | string>();

    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value);
        if (newValue < 1 || newValue > 9) {
            setValue("");
            props.setCellValue("", props.index);
        } else {
            setValue(newValue);
            props.setCellValue(newValue, props.index);
        }
    }

    const getInputValue = () => {
        return props.getCellValue(props.index) || "";
    }
    return (
        <div className="Cell">
            <input
                onChange={changeInputValue}
                onFocus={changeInputValue}
                value={getInputValue()}
                type="number"
                min="1"
                max="9"
            />
        </div>
    );
}

export default Cell;