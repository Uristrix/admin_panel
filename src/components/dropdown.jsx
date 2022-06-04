import React from "react";
import '../style/dropdown.css';
import {useState} from "react";
import {observer} from "mobx-react-lite";
import ddStore from "../store/dropdownStore"


export const Dropdown = (props) =>
{

    //const[selected, select] = useState(props.selected || '')
    console.log(props)
    //const updateSelect = (elem) => select(elem)
    const content = props.elems.map((elem) => {
            return <li key={elem['name']} className="item"
                       onClick= {() => props.func(elem['name'])}
            >
                <a>{elem['name']}</a>
            </li>
        }
    )

    return(
            <div className="container">
                <input className="dropdown-trigger"
                       disabled={true}
                       id={props.id}
                       value={props.selected || ''}
                       placeholder={props.placeholder || ''}
                />
                <ul className="dropdown">{content}</ul>
            </div>
        )
}