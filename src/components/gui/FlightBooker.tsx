import { h } from "preact";
import { useState, useEffect, useMemo } from "preact/hooks";

import "ojs/ojbutton";
import "ojs/ojdatetimepicker";
import "ojs/ojselectsingle";
import "ojs/ojoption";
import "ojs/ojmessagebanner";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import {IntlDateTimeConverter} from "ojs/ojconverter-datetime";
import {IntlConverterUtils} from "ojs/ojconverterutils-i18n";

export function FlightBooker () {
    const dateConverter = new IntlDateTimeConverter({
        formatType: "date",
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });

    const [flightType, setFlightType] = useState('one-way');
    const [departureDate, departureDateSetter] = useState(IntlConverterUtils.dateToLocalIso(new Date()));
    const [returnDate, returnDateSetter] = useState(departureDate);
    const [disabledBooking, disabledBookingSetter] = useState(false);

    const flightTypesDP = useMemo(() =>
        new ArrayDataProvider([
            {value: 'one-way', label: 'One-Way Flight'},
            {value: 'return', label: 'Return Flight'},
        ], {keyAttributes: "value"}), []);
    const messagesDP = useMemo(() =>
        new MutableArrayDataProvider([], {keyAttributes: "id"})
        , []);

    const onFlightTypeChanged = (e) => setFlightType(e.detail.value);
    const onDepartureDateChanged = (e) => departureDateSetter(e.detail.value);
    const onReturnDateChanged = (e) => returnDateSetter(e.detail.value);

    useEffect(() => {
        const isDisabled = (flightType === 'return' &&
            IntlConverterUtils.isoToDate(returnDate) <= IntlConverterUtils.isoToDate(departureDate));
        disabledBookingSetter(isDisabled);
    }, [flightType, returnDate, departureDate]);

    const book = () => {
        const formattedDepartureDate = dateConverter.format(departureDate);
        let details;
        if (flightType === 'return') {
            const formattedReturnDate = dateConverter.format(returnDate);
            details = `The flight will leave on ${formattedDepartureDate} and return on ${formattedReturnDate}.`;
        } else {
            details = `The flight will leave on ${formattedDepartureDate}.`;
        }
        messagesDP.data = [{
            id: 1,
            severity: 'confirmation',
            summary: `Your Flight Has Been Booked!`,
            detail: details
        }];
    };

    const onMessageClose = () => {
        messagesDP.data = [];
    };

    return (
        <div>
            <oj-message-banner data={messagesDP} onojClose={onMessageClose}></oj-message-banner>
            <div class="oj-sm-width-2/5">
                <div>
                    <oj-select-single data={flightTypesDP} value={flightType} onvalueChanged={onFlightTypeChanged}>
                    </oj-select-single>
                </div>
                <div>
                    <oj-input-date value={departureDate} onvalueChanged={onDepartureDateChanged}
                                   converter={dateConverter}></oj-input-date>
                </div>
                <div>
                    <oj-input-date value={returnDate} onvalueChanged={onReturnDateChanged} converter={dateConverter}
                                   disabled={flightType !== 'return'}></oj-input-date>
                </div>
                <div>
                    <oj-button onojAction={book} disabled={disabledBooking}>Book</oj-button>
                </div>
                {flightType === 'return' && disabledBooking ?
                    <p>NOTE: A return flight requires a return date later than leave date to book.</p> : ''}
            </div>
        </div>
    );
}
