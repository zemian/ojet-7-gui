import { h } from "preact";
import {useEffect, useMemo, useState} from "preact/hooks";

import "ojs/ojbutton";
import "ojs/ojinputtext";
import "ojs/ojtable";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import {ojTable, TableElement} from "ojs/ojtable";
import Column = ojTable.Column;
import ColumnDefault = TableElement.ColumnDefault;

export function Cells () {
    const [updateCount, updateCountSetter] = useState(0);
    const dataDP = useMemo(() =>
            new MutableArrayDataProvider([], {keyAttributes: "@index"})
        , []);

    const defaultColumns = useMemo<ColumnDefault<any, any>>(() => {
            return {sortable: 'disabled'}
        }, []);

    const columns = useMemo<Column<any, any>[]>(() =>
            [
                {id: 'rows', headerText: '', template: 'rowsTemplate',
                    className: 'oj-helper-text-align-end oj-read-only'},
                {id: 'A', headerText: 'A', template: 'valueTemplate'},
                {id: 'B', headerText: 'B', template: 'valueTemplate'},
                {id: 'C', headerText: 'C', template: 'valueTemplate'},
                {id: 'D', headerText: 'D', template: 'valueTemplate'},
                {id: 'E', headerText: 'E', template: 'valueTemplate'},
            ]
        , []);

    useEffect(() => {
        const data = new Array(20);
        for (let i = 0; i < 20; i++) {
            data[i] = new Array(5);
            for (let j = 0; j < 5; j++) {
                data[i][j] = '';
            }
        }
        dataDP.data = data;
    }, []);

    const onEdit = (rowIndex, colIndex, event) => {
        let newValue = event.detail.value;
        if (newValue) {
            newValue = ('' + newValue).trim();
        }
        dataDP.data[rowIndex][colIndex] = newValue.trim();
        updateCountSetter(updateCount + 1);
    }

    const getCellValue = (cellName: string) => {
        const [_, colLetter, rowNum] = cellName.match(/([A-Z])(\d{1,2})/);
        const colIndex = colLetter.charCodeAt(0) - 65;
        const rowIndex = parseInt(rowNum) - 1;
        return evalCell(dataDP.data[rowIndex][colIndex]);
    }

    const evalCell = (value) => {
        if (value.startsWith('=')) {
            const matcher = value.match(/=\s*([A-Z]\d{1,2})\s*([\+\-\*\/])\s*([A-Z]\d{1,2})\s*/);
            if (matcher) {
                const [_, a, op, b] = matcher;
                const expression = getCellValue(a) + op + getCellValue(b);
                return eval(expression);
            }
        }
        return value;
    };

    const rowsTemplateRender = (cell) => {
        return (
            <div>
                <span style="font-weight: bold;">{cell.index + 1}</span>
            </div>
        );
    }

    const valueTemplateRender = (cell) => {
        const rowIndex = cell.index;
        const colIndex = cell.columnIndex - 1;
        const value = dataDP.data[rowIndex][colIndex];
        return (
            <div>
                { (cell.mode === 'edit') ?
                    <oj-input-text value={evalCell(value)}
                                   onvalueChanged={(event) => onEdit(rowIndex, colIndex, event)}></oj-input-text>
                    : <span>{value}</span>
                }
            </div>
        );
    }

    return (
        <div>
            <oj-table data={dataDP} columnsDefault={defaultColumns} columns={columns}
                      verticalGridVisible="enabled"
                      layout="fixed" editMode="rowEdit" style="width: 100%;">
                <template slot="rowsTemplate" render={rowsTemplateRender}></template>
                <template slot="valueTemplate" render={valueTemplateRender}></template>
            </oj-table>
        </div>
    );
}
