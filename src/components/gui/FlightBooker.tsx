import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

import "ojs/ojbutton";
import "ojs/ojdatetimepicker";
import "ojs/ojselectsingle";
import "ojs/ojoption";
import ArrayDataProvider = require("ojs/ojarraydataprovider");

export function FlightBooker () {
    function pad(n, s = String(n)) {
        return s.length < 2 ? `0${s}` : s;
    }
    const stringToDate = (str) => {
        const [y, m, d] = str.split('-');
        return new Date(parseInt(y), m - 1, d);
    }
    const dateToString = (date) => {
        return date.getFullYear() + '-' +
            pad(date.getMonth() + 1) + '-' +
            pad(date.getDate());
    }

    const [flightType, setFlightType] = useState('one-way');
    const flightTypes = [
        {value: 'one-way', label: 'One-Way Flight'},
        {value: 'return', label: 'Return Flight'},
    ];
    const flightTypesDP = new ArrayDataProvider(flightTypes, {keyAttributes: "value"});
    const [departureDate, setDepartureDate] = useState(dateToString(new Date()));
    const [returnDate, setReturnDate] = useState(departureDate);
    const [disabledBooking, setDisabledBooking] = useState(false);
    const onFlightTypeChanged = (e) => setFlightType(e.detail.value);
    const onDepartureDateChanged = (e) => setDepartureDate(e.detail.value);
    const onReturnDateChanged = (e) => setReturnDate(e.detail.value);

    useEffect(() => {
        const isDisabled = (flightType === 'return' &&
            stringToDate(returnDate) <= stringToDate(departureDate));
        setDisabledBooking(isDisabled);
    }, [flightType, returnDate, departureDate]);

    const book = () => {
        alert(
            flightType === 'return'
                ? `You have booked a return flight leaving on ${departureDate} and returning on ${returnDate}.`
                : `You have booked a one-way flight leaving on ${departureDate}.`
        );
    }
    return (
        <div class="oj-sm-width-1/3">
            <div>
                <oj-select-single data={flightTypesDP} value={flightType} onvalueChanged={onFlightTypeChanged}>
                </oj-select-single>
            </div>
            <div>
                <oj-input-text value={departureDate} onvalueChanged={onDepartureDateChanged}></oj-input-text>
            </div>
            <div>
                <oj-input-text value={returnDate} onvalueChanged={onReturnDateChanged} disabled={flightType !== 'return'}></oj-input-text>
            </div>
            <div>
                <oj-button onojAction={book} disabled={disabledBooking}>Book</oj-button>
            </div>
        </div>
    );
}
