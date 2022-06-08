import React from "react";
import '../style/dropdown.css';

export const Dropdown = (props) =>
{

    const content = props.elems !== undefined?
        props.elems.map((elem) => {
            return <li className="item"
                       onClick= {() => props.func(elem)}>
                <span>{elem[props.keys]}</span>
            </li>
        }
    ):  <></>

    const len = props.elems.length;
const style = len < 4 ? {height: (len*135).toString() + '%'}
        :{height:" 550%"}
    return(
            <div className="container">
                <input className="dropdown-trigger"
                       disabled={true}
                       id={props.id}
                       value={props.selected[props.keys] || ''}
                       placeholder={props.placeholder || ''}
                />
                <ul className="dropdown" style ={style}>
                    {content}</ul>
            </div>
        )
}