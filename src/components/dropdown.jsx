import React, {useEffect} from "react";
import '../style/dropdown.css';

export const Dropdown = (props) =>
{
    //console.log((props))
    const content = props.elems !== undefined?
        props.elems.map((elem) => {
            return <li key={elem['name']} className="item"
                       onClick= {() => props.func(elem['name'])}>
                <a>{elem['name']}</a>
            </li>
        }
    ):  <></>
    
    // useEffect(() =>
    // {
    //     if(Object.keys(props.elems).length !== 0)
    //     {
    //         props.func(props.elems[0]['name'])
    //         //console.log('effect2')
    //     }
    //
    // }, [])
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