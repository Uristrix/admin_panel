import React from "react";
import '../style/dropdown.css';

export const Dropdown = (props) =>
{

    const content = props.elems !== undefined?
        props.elems.map((elem) => {
            return <li key={elem[props.keys]} className="item"
                       onClick= {() => props.func(elem[props.keys])}>
                <a>{elem[props.keys]}</a>
            </li>
        }
    ):  <></>

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