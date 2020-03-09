import React from "react";
import Cell from "./Cell";
import "./Grid.css";

interface IProps {
    cells: Array<number | undefined>
}

function Grid(props: IProps) {
    const cellsKeys: Array<number> = Array.from(props.cells.keys());
    const onSetCellValue = (cellValue: number | string, index: number) => {
        props.cells[index] = typeof cellValue === "string" ? 0 : cellValue;
    }
    const onGetCellValue = (index: number) => {
        // console.log("onGetCellValue called", props.cells)
        return props.cells[index];
    }
    return (
        <div className="Grid">
            { cellsKeys.map((cellsKey) => <Cell key={cellsKey} setCellValue={onSetCellValue} index={cellsKey} getCellValue={onGetCellValue(cellsKey)}/>) }
            <div className="delimiter-h h1"/>
            <div className="delimiter-h h2"/>
            <div className="delimiter-v v1"/>
            <div className="delimiter-v v2"/>
        </div>
    )
};

export default Grid;
