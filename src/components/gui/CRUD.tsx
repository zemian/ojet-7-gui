import { h } from "preact";
import {useEffect, useState} from "preact/hooks";

import "ojs/ojbutton";
import "ojs/ojlistview";
import "ojs/ojinputtext";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

type Person = {
    id: number,
    firstName: string,
    lastName: string
}

export function CRUD () {
    const [personList, personListSetter] = useState([
        {id: 1, firstName: "Hans", lastName: "Emil"},
        {id: 2, firstName: "Max", lastName: "Mustermann"},
        {id: 3, firstName: "Roman", lastName: "Tisch"}
    ]);
    const [idCounter, idCounterSetter] = useState(personList.length);
    const [personListDP] = useState(
        new MutableArrayDataProvider<string, Person>(personList, {keyAttributes: "id"}));
    const [selectedPerson, selectedPersonSetter] = useState<Person>(null);
    const [filter, filterSetter] = useState(null);

    useEffect(() => {
        personListDP.data = personList;
    }, [personList]);

    const onFilterChanged = (event) => {
        const newFilter = event.detail.value;
        filterSetter(newFilter);
        personListDP.data = personList.filter(e =>
            e.lastName.toLowerCase().startsWith(newFilter.toLowerCase())
        );
    };

    const onCreate = () => {
        if (selectedPerson) {
            // Do not add duplicated name
            if (selectedPerson.id) {
                const person = personList.find(e => e.id === selectedPerson.id);
                if (person.firstName === selectedPerson.firstName
                    && person.lastName === selectedPerson.lastName) {
                    return;
                }
            }

            // The person name has changed, or it's new, so add new entry
            const nextId = idCounter + 1;
            idCounterSetter(nextId);
            selectedPerson.id = nextId;
            personListSetter([...personList, selectedPerson]);
            selectedPersonSetter(null);
        }
    };

    const onUpdate = () => {
        const person = personList.find(e => e.id === selectedPerson.id);
        person.firstName = selectedPerson.firstName;
        person.lastName = selectedPerson.lastName;
        personListSetter([...personList]);
    };

    const onDelete = () => {
        const newPersonList = personList.filter(e => e.id !== selectedPerson.id);
        personListSetter(newPersonList);
        selectedPersonSetter(null);
    };

    const onNameSelection = (item) => {
        const id = item.detail.value[0];
        const personName = personListDP.data.find(e => e.id === id);
        if (personName) {
            selectedPersonSetter(personName);
        }
    };

    const onFirstNameChanged = (event) => {
        let name = null;
        if (selectedPerson) {
            name = {
                id: selectedPerson.id,
                firstName: event.detail.value,
                lastName: selectedPerson.lastName
            };
        } else {
            name = {
                id: null,
                firstName: event.detail.value,
                lastName: ''
            };
        }
        selectedPersonSetter(name);
    };

    const onLastNameChanged = (event) => {
        let name = null;
        if (selectedPerson) {
            name = {
                id: selectedPerson.id,
                firstName: selectedPerson.firstName,
                lastName: event.detail.value
            };
        } else {
            name = {
                id: null,
                firstName: '',
                lastName: event.detail.value
            };
        }
        selectedPersonSetter(name);
    };

    const namesItemTemplate = (item) =>
        <div>{item.data.lastName}, {item.data.firstName}</div>

    return (
        <div class="oj-flex oj-sm-flex-direction-column oj-sm-margin-2x">
            <div className="oj-flex-item">
                <oj-input-text label-hint="Filter by Last Name"
                               value={filter}
                               onrawValueChanged={onFilterChanged}></oj-input-text>
            </div>
            <div className="oj-flex-item">
                <div class="oj-flex oj-sm-margin-2x">
                    <div className="oj-flex-item oj-sm-width-3/5">
                        <oj-list-view style="height: 25rem;"
                                      selectionMode="single"
                                      data={personListDP}
                                      onselectionChanged={onNameSelection}>
                            <template slot="itemTemplate" render={namesItemTemplate}></template>
                        </oj-list-view>
                    </div>
                    <div className="oj-flex-item oj-sm-width-2/5">
                        <oj-input-text label-hint="First Name"
                                       onvalueChanged={onFirstNameChanged}
                                       value={selectedPerson ? selectedPerson.firstName : ''}></oj-input-text>
                        <oj-input-text label-hint="Last Name"
                                       onvalueChanged={onLastNameChanged}
                                       value={selectedPerson ? selectedPerson.lastName : ''}></oj-input-text>
                    </div>
                </div>
            </div>
            <div className="oj-flex-item">
                <oj-button onojAction={onCreate}>Create</oj-button>
                <oj-button onojAction={onUpdate}>Update</oj-button>
                <oj-button onojAction={onDelete}>Delete</oj-button>
            </div>
        </div>
    );
}
