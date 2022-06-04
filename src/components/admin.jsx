import React, {useEffect, useState} from "react";
import '../style/admin_panel.css'
import {useForm} from "react-hook-form";
import {Dropdown} from "./dropdown";
import axios from 'axios'
import {observer} from "mobx-react-lite";

const API = process.env.REACT_APP_API
const operation = [{name: 'Update'}, {name: 'Add'}, {name: 'Delete'}]
const color = [{name: 'one color'}, {name: 'gradient'}]


export const Admin = () =>
{
    const { register, handleSubmit } = useForm();
    const[data, setData] = useState()

    const[dd1, setDD1] = useState(operation[0]['name'])    //type
    //const[dd2, setDD2] = useState('' || data[0]['name'])         //room
     const[dd3, setDD3] = useState(operation[0]['name'])    //type2
     const[dd4, setDD4] = useState(color[0]['name'])        //color


    useEffect(() =>
    {
        axios.get(API + 'rStrings')
            .then((res) => {
                console.log(res)
                setData(res)
            } )
            .catch((err) => console.log(err))
    })

    const onSubmit = (data) =>
    {

        if(dd1 === 'Update')
        {
        }
        if(dd1 === 'Add')
        {
            console.log(data)
        }
        if(dd1 === 'Delete')
        {
            // const id = data.find((el) => {return el['name'] === dd2} )
            // axios.delete(API + 'rStrings' + id)
            //     .then((res) => console.log(res))
            //     .catch((err) => console.log(err))
        }
    }
    const dropData = (id) => {return document.getElementById(id).value}

    return(
        <form className='admin' onSubmit={handleSubmit(onSubmit)}>
           <h3>Admin panel</h3>

            <div>
                <p>Тип запроса</p>
                <Dropdown elems = {operation} func = {setDD1} selected = {dd1}/>
            </div>

            {/*{dd1 === 'Update' &&*/}
            {/*    <div>*/}
            {/*        /!*<Dropdown elems = {data} func = {setDD2} selected = {dd2}/>*!/*/}

            {/*        <div className='form_elem'>*/}
            {/*            <input {...register('id')} placeholder="id"/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*}*/}

            {/*{dd1 === 'Add' &&*/}
            {/*    <div>*/}
            {/*        <div className='form_elem'>*/}
            {/*            <input {...register('code')} placeholder="code"/>*/}
            {/*        </div>*/}

            {/*        <div className='form_elem'>*/}
            {/*            <input {...register('name')} placeholder="name"/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*}*/}

            {/*{ dd1 === 'Delete' && <Dropdown elems = {data} func = {setDD2} selected = {dd2}/> }*/}

            <button className='button' type='submit'>make request</button>
        </form>
    )
}