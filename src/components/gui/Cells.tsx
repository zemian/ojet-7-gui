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
                data[i][j] = {id: i * 5 + (j + 1), value: ''};
            }
        }
        dataDP.data = data;
        //updateCountSetter(updateCount + 1);
    }, []);

    const rowsTemplateRender = (cell) => {
        return (
            <div>
                <span style="font-weight: bold;">{cell.index + 1}</span>
            </div>
        );
    }
    const valueTemplateRender = (cell) => {
        const value = dataDP.data[cell.index][cell.columnIndex - 1].value;
        return (
            <div>
                { (cell.mode === 'edit') ?
                    <oj-input-text value={value} class="editable"></oj-input-text>
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
