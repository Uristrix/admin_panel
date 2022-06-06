import React, {useEffect, useState} from "react";
import '../style/admin_panel.css'
import {useForm} from "react-hook-form";
import {Dropdown} from "./dropdown";
import axios from 'axios'

import { ChromePicker } from 'react-color';
//import * as https from "https";

const API = process.env.REACT_APP_API
const operation = [{name: 'Update'}, {name: 'Add'}, {name: 'Delete'}]
const colors = [{name: 'one color', id:0}, {name: 'gradient', id:1}, {name: 'different color', id:2}]

// const httpAgent = new https.Agent({
//     rejectUnauthorized: false // (NOTE: this will disable client verification)
// } )

export const Admin = () =>
{
    const { register, handleSubmit } = useForm();
    const[rooms, setRooms] = useState([]);
    const[messages, setMessages] = useState([]);
    const[clr, setColor] = useState('#ffffff');
    const[delType, setDelType] = useState('')

    const[triggerEffect, setTrigger] = useState(true);

    //dropdowns
    const[dd1, setDD1] = useState(operation[0]) ;   //type
    const[dd2, setDD2] = useState({});     //room
    const[dd3, setDD3] = useState(operation[0]);    //type2
    const[dd4, setDD4] = useState({});     //message
    const[dd5, setDD5] = useState(colors[0]);       //color
    //checkbox
    const[cb, setCb] = useState(false);
    //range
    const[range, setRange] = useState(11);

    useEffect(() =>
    {
        axios.get(API + 'rStrings' )
            .then((res) => {
                setRooms(res.data)
                if(Object.keys(res.data).length !== 0)
                    setDD2(res.data[0])
            })
            .catch((err) => console.log(err))
    },[dd1, triggerEffect])

    useEffect(() =>
    {
        if(Object.keys(rooms).length !== 0)
        {
            const id = rooms.find((el) => {return el['name'] === dd2['name']} )['id']
            axios.get(API + `geet/string/${id}/massage` )
                .then((res) => {
                    console.log(res.data)
                    setMessages(res.data)
                    if(Object.keys(res.data).length !== 0)
                        setDD4(res.data[0])
                    else setDD4({})
                } )
                .catch((err) => console.log(err))
        }

    },[dd2, rooms])

    const onSubmit = (data) =>
    {
        if(dd1['name'] === 'Update')
        {
            if(dd3['name'] === 'Update'){
                data.string_color_type = dd5['id'];
                data.string_color = dd5['name'] !== 'one color'? 0: parseInt(clr.slice(1), 16);
                data.string_timing_type = "not now";
                data.string_timing = "not now";
                data.string_speed = +data.string_speed;
                data.showed = +data.showed;
                console.log(data)

                axios.put(API + `geet/massage/${dd4['id']}`, data)
                    .then((res) => {console.log(res); })
                    .catch((err) => console.log(err))

            }
            if(dd3['name'] === 'Add'){
                data.string_color_type = dd5['id'];
                data.string_color = dd5['name'] !== 'one color'? 0: parseInt(clr.slice(1), 16);
                data.string_timing_type = "not now";
                data.string_timing = "not now";
                data.string_speed = +data.string_speed;
                data.showed = +data.showed;

                axios.post(API + 'geet/massage', data)
                    .then((res) =>
                    {
                        console.log(res.data['id'])
                        axios.post(API + `geet/massage/${res.data['id']}/string`, {id:dd2['id']})
                            .then((res) => {console.log(res); })
                            .catch((err) => console.log(err))
                        console.log(res)
                    })
                    .catch((err) => console.log(err))

            }
            if(dd3['name'] === 'Delete'){
                if(delType === 'one')
                {
                    axios.delete(API + `geet/massage/${dd4['id']}/string/${dd2['id']}`)
                        .then((res) => {console.log(res); setTrigger(!triggerEffect);})
                        .catch((err) => console.log(err))
                }
                if(delType === 'all')
                {
                    axios.delete(API + `geet/massage/${dd4['id']}`)
                        .then((res) => {console.log(res); setTrigger(!triggerEffect);})
                        .catch((err) => console.log(err))
                }
            }
        }
        if(dd1['name'] === 'Add')
        {
            axios.post(API + 'rStrings', data)
                .then((res) => {console.log(res); })
                .catch((err) => console.log(err))
        }
        if(dd1['name'] === 'Delete')
        {
            if(Object.keys(rooms).length !== 0)
            {
                axios.delete(API + 'rStrings/' + dd2['id'])
                    .then((res) => {console.log(res); setTrigger(!triggerEffect);})
                    .catch((err) => console.log(err))
            }
        }
    }
    const ActualMessage = (elem) =>
    {
        setDD4(elem)
        document.getElementById('st').value = elem['string_text']
        setCb(Boolean(elem['showed']))
        setRange(elem['string_speed'])
        document.getElementById('rg2').value = elem['string_speed']
        setDD5(colors.find((el) => {return el["id"] === elem['string_color_type']}))
        setColor('#' + elem['string_color'].toString(16))
    }
    return(
        <form className='admin' onSubmit={handleSubmit(onSubmit)}>
           <h3>Admin panel</h3>

            <div className='flex center'>
                <p>Тип запроса</p>
                <Dropdown elems = {operation} func = {setDD1} selected = {dd1} keys={'name'}/>
            </div>

            {dd1['name'] === 'Update' &&
                <div>
                    <div>
                        <p>Выбор аудитории</p>
                        <Dropdown elems = {rooms} func = {setDD2} selected = {dd2} keys={'name'}/>
                    </div>
                    <div>
                        <p>Тип запроса</p>
                        <Dropdown elems = {operation} func = {setDD3} selected = {dd3} keys={'name'}/>
                    </div>


                    {dd3['name'] === 'Update' &&
                        <div>
                            <div>
                                <p>Выбор сообщения</p>
                                <Dropdown elems = {messages} func = {ActualMessage} selected = {dd4} keys={'string_text'}/>
                            </div>
                            <div style={{position: 'relative'}}>
                                <p>Текст сообщения</p>
                                <div className='form_elem _2'>
                                    <input id='st' {...register('string_text')} placeholder="text"
                                           defaultValue={dd4['string_text'] || ''}/>
                                </div>

                                <label className='checkbox'>
                                    <input {...register('showed')}
                                           type="checkbox" className="filled-in blue" checked={cb}
                                           onChange={ () => { setCb(!cb) }}/>
                                    <span>message display</span>
                                </label>
                                <div className="range-field range">
                                    <p>speed:</p>
                                    <input {...register('string_speed')}
                                           type="range" id="rg2" min="0" max="100"
                                           defaultValue={dd4['string_text']||11}
                                           onChange={() => {setRange(document.getElementById('rg2').value)}}
                                    />
                                    <p>{range}</p>
                                </div>

                                <div>
                                    <p>Выбор типа цвета</p>
                                    <Dropdown elems = {colors} func = {setDD5} selected = {dd5} keys={'name'}/>
                                </div>
                                {dd5['name'] === 'one color' && <ChromePicker  color = {clr}
                                                                       onChangeComplete ={ (color) => {setColor(color['hex'])}}
                                />}

                                <button className='button' type='submit'>Update</button>
                            </div>
                        </div>
                    }
                    {dd3['name'] === 'Add' &&
                        <div style={{position: 'relative'}}>
                            <p>Текст сообщения</p>
                            <div className='form_elem _2'>
                                <input {...register('string_text')} placeholder="text"/>
                            </div>

                            <label className='checkbox'>
                                <input type="checkbox"
                                       {...register('showed')}
                                       className="filled-in blue" checked={cb}
                                       onChange={ () => { setCb(!cb) } }/>
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
                                <Dropdown elems = {colors} func = {setDD5} selected = {dd5} keys={'name'}/>
                            </div>
                            {dd5['name'] === 'one color' && <ChromePicker  color = {clr}
                                               onChangeComplete ={ (color) => {setColor(color['hex'])}}
                                               />}

                            <button className='button' type='submit'>Add</button>
                        </div>
                    }
                    {dd3['name'] === 'Delete' &&
                        <div>
                            <div>
                                <p>Выбор сообщения</p>
                                <Dropdown elems = {messages} func = {setDD4} selected = {dd4} keys = {'string_text'}/>
                            </div>
                            <div className='flex_del send'>
                                <button className='button' onClick={() => setDelType('one')}
                                        type='submit'>Delete for one</button>
                                <button className='button' onClick={() => setDelType('all')}
                                        type='submit'>Delete for all</button>
                            </div>
                        </div>
                    }

                </div>
            }
{/*////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
            {dd1['name'] === 'Add' &&
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

            { dd1['name'] === 'Delete' &&
                <div>
                    <p>Выбор аудитории</p>
                    <Dropdown elems = {rooms} func = {setDD2} selected = {dd2} keys={'name'}/>
                    <button className='button send' type='submit'>Delete</button>
                </div>
                 }
        </form>
    )
}