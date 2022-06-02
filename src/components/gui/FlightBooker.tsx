import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

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
    const [flightTypesDP] = useState(new ArrayDataProvider([
        {value: 'one-way', label: 'One-Way Flight'},
        {value: 'return', label: 'Return Flight'},
    ], {keyAttributes: "value"}));
    const [departureDate, setDepartureDate] = useState(IntlConverterUtils.dateToLocalIso(new Date()));
    const [returnDate, setReturnDate] = useState(departureDate);
    const [disabledBooking, setDisabledBooking] = useState(false);
    const onFlightTypeChanged = (e) => setFlightType(e.detail.value);
    const onDepartureDateChanged = (e) => setDepartureDate(e.detail.value);
    const onReturnDateChanged = (e) => setReturnDate(e.detail.value);

    const [messagesDP] = useState(new MutableArrayDataProvider([], {keyAttributes: "id"}));

    useEffect(() => {
        const isDisabled = (flightType === 'return' &&
            IntlConverterUtils.isoToDate(returnDate) <= IntlConverterUtils.isoToDate(departureDate));
        setDisabledBooking(isDisabled);
    }, [flightType, returnDate, departureDate]);

    const book = () => {
        const formattedDepartureDate = dateConverter.format(departureDate);
        let details;
        if (flightType === 'return') {
            const formattedReturnDate = dateConverter.format(returnDate);
            details = `You have booked a return flight leaving on ${formattedDepartureDate} and returning on ${formattedReturnDate}.`;
        } else {
            details = `You have booked a one-way flight leaving on ${formattedDepartureDate}.`;
        }
        messagesDP.data = [{
            id: 1,
            severity: 'confirmation',
            summary: `Confirmation`,
            detail: details
        }];
    }

    const onMessageClose = () => {
        messagesDP.data = [];
    }

    return (
        <div class="oj-sm-width-1/3">
            <oj-message-banner data={messagesDP} onojClose={onMessageClose}></oj-message-banner>
            <div>
                <oj-select-single data={flightTypesDP} value={flightType} onvalueChanged={onFlightTypeChanged}>
                </oj-select-single>
            </div>
            <div>
                <oj-input-date value={departureDate} onvalueChanged={onDepartureDateChanged} converter={dateConverter}></oj-input-date>
            </div>
            <div>
                <oj-input-date value={returnDate} onvalueChanged={onReturnDateChanged} converter={dateConverter} disabled={flightType !== 'return'}></oj-input-date>
            </div>
            <div>
                <oj-button onojAction={book} disabled={disabledBooking}>Book</oj-button>
            </div>
        </div>
    );
}
