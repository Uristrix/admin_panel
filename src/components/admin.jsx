import React, {useEffect, useState} from "react";
import '../style/admin_panel.css'
import {useForm} from "react-hook-form";
import {Dropdown} from "./dropdown";
import axios from 'axios'

import { ChromePicker, PhotoshopPicker  } from 'react-color';

const API = process.env.REACT_APP_API
const operation = [{name: 'Update'}, {name: 'Add'}, {name: 'Delete'}]
const colors = [{name: 'one color', id:0}, {name: 'gradient', id:1}, {name: 'different color', id:2}]


export const Admin = () =>
{
    const { register, handleSubmit } = useForm();
    const[rooms, setRooms] = useState([]);
    const[messages, setMessages] = useState([]);
    const[clr, setColor] = useState('ffffff');
    //dropdowns
    const[dd1, setDD1] = useState(operation[0]['name']) ;   //type
    const[dd2, setDD2] = useState('');             //room
    const[dd3, setDD3] = useState(operation[0]['name']);    //type2
    const[dd4, setDD4] = useState('');             //message
    const[dd5, setDD5] = useState(colors[0]['name']);        //color
    //checkbox
    const[cb, setCb] = useState(false);
    //range
    const[range, setRange] = useState(11);
    useEffect(() =>
    {
        axios.get(API + 'rStrings')
            .then((res) => {
                setRooms(res.data)
                if(Object.keys(res.data).length !== 0)
                    setDD2(res.data[0]['name'])
            })
            .catch((err) => console.log(err))
    },[dd1])

    useEffect(() =>
    {
        if(rooms !== [])
        {
            console.log(rooms)
            console.log(rooms !== [])
            const id = rooms.find((el) => {return el['name'] === dd2} )['id']
            axios.get(API + `geet/string/${id}/massage`)
                .then((res) => {
                    console.log(res)
                    setMessages(res.data)
                    setDD4(messages[0]['string_text'] || '')
                } )
                .catch((err) => console.log(err))
        }

    },[dd2])

    const onSubmit = (data) =>
    {
        // console.log(data)
        if(dd1 === 'Update')
        {
            if(dd3 === 'Update'){}
            if(dd3 === 'Add'){

                console.log(data)
            }
            if(dd3 === 'Delete'){}
        }
        if(dd1 === 'Add')
        {
            axios.post(API + 'rStrings', data)
                .then((res) => console.log(res))
                .catch((err) => console.log(err))
        }
        if(dd1 === 'Delete')
        {
            if(Object.keys(rooms).length !== 0)
            {
                const id = rooms.find((el) => {return el['name'] === dd2} )['id']
                axios.delete(API + 'rStrings/' + id)
                    .then((res) => console.log(res))
                    .catch((err) => console.log(err))
            }
        }
    }

    return(
        <form className='admin' onSubmit={handleSubmit(onSubmit)}>
           <h3>Admin panel</h3>

            <div className='flex center'>
                <p>Тип запроса</p>
                <Dropdown elems = {operation} func = {setDD1} selected = {dd1}/>
            </div>

            {dd1 === 'Update' &&
                <div>
                    <div>
                        <p>Выбор аудитории</p>
                        <Dropdown elems = {rooms} func = {setDD2} selected = {dd2}/>
                    </div>
                    <div>
                        <p>Тип запроса</p>
                        <Dropdown elems = {operation} func = {setDD3} selected = {dd3}/>
                    </div>


                    {dd3 === 'Update' &&
                        <div>

                        </div>
                    }
                    {dd3 === 'Add' &&
                        <div style={{position: 'relative'}}>
                            <p>Текст сообщения</p>
                            <div className='form_elem _2'>
                                <input {...register('string_text')} placeholder="text"/>
                            </div>

                            <label className='checkbox'>
                                <input type="checkbox" className="filled-in blue" checked={cb}
                                       onChange={ () => { setCb(!cb)}}/>
                                <span>message display</span>
                            </label>

                                <div className="range-field range">
                                    <p>speed:</p>
                                    <input {...register('string_speed')}
                                        type="range" id="rg" min="0" max="100" defaultValue="11"
                                    onChange={() => {setRange(document.getElementById('rg').value)}}
                                    />
                                    <p>{range}</p>
                                </div>

                            <div>
                                <p>Выбор типа цвета</p>
                                <Dropdown elems = {colors} func = {setDD5} selected = {dd5}/>
                            </div>
                            {dd5 === 'one color' && <ChromePicker  color = {clr}
                                               onChangeComplete ={ (color) => {setColor(color['hex'])}}
                                               />}

                            <button className='button' type='submit'>Add</button>
                        </div>
                    }
                    {dd3 === 'Delete' &&
                        <div>
                            <div>
                                <p>Выбор аудитории</p>
                                <Dropdown elems = {messages} func = {setDD4} selected = {dd4}/>
                            </div>
                            <div className='flex_del send'>
                                <button className='button' type='submit'>Delete for one</button>
                                <button className='button' type='submit'>Delete for all</button>
                            </div>
                        </div>
                    }

                </div>
            }
{/*////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
            {dd1 === 'Add' &&
                <div>
                    <p>Code</p>
                    <div className='form_elem _2'>
                        <input {...register('code')} placeholder="code"/>
                    </div>
                    <p>Name</p>
                    <div className='form_elem _2'>
                        <input {...register('name')} placeholder="name"/>
                    </div>
                    <button className='button send' type='submit'>Add</button>
                </div>
            }

            { dd1 === 'Delete' &&
                <div>
                    <p>Выбор аудитории</p>
                    <Dropdown elems = {rooms} func = {setDD2} selected = {dd2}/>
                    <button className='button send' type='submit'>Delete</button>
                </div>
                 }
        </form>
    )
}