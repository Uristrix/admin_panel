import React, {useEffect, useState} from "react";
import '../style/admin_panel.css'
import {useForm} from "react-hook-form";
import {Dropdown} from "./dropdown";
import axios from 'axios'

import { ChromePicker } from 'react-color';
//import * as https from "https";

const API = process.env.REACT_APP_API
const operation = [{name: 'Обновить'}, {name: 'Добавить'}, {name: 'Удалить'}]
const colors = [{name: 'one color', id:0}, {name: 'gradient', id:1}, {name: 'different color', id:2}]

// const httpAgent = new https.Agent({
//     rejectUnauthorized: false // (NOTE: this will disable client verification)
// } )

export const Admin = () =>
{
    const { register, handleSubmit, setValue, getValues} = useForm();
    const[rooms, setRooms] = useState([]);
    const[messages, setMessages] = useState([]);
    const[clr, setColor] = useState('#ffffff');
    const[delType, setDelType] = useState('')

    const[triggerEffect, setTrigger] = useState(true);

    //dropdowns
    const[dd1, setDD1] = useState(operation[0]);    //type
    const[dd2, setDD2] = useState({});     //room
    const[dd3, setDD3] = useState(operation[0]);    //type2
    const[dd4, setDD4] = useState({});     //message
    const[dd5, setDD5] = useState(colors[0]);       //color
    //checkbox
    //const[cb, setCb] = useState(false);
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
    useEffect(() =>
        {
            if(Object.keys(messages).length !== 0 && dd3['name'] === 'Добавить')
                ActualMessage(dd4)
        }
    ,[dd4])


    const onSubmit = (data) =>
    {
        if(dd1['name'] === 'Обновить')
        {
            if(dd3['name'] === 'Обновить'){
                data.string_color_type = dd5['id'];
                data.string_color = dd5['name'] !== 'one color'? 0: parseInt(clr.slice(1), 16);
                data.string_timing_type = "not now";
                data.string_timing = "not now";
                data.string_speed = +data.string_speed;
                data.showed = +data.showed;
                console.log(data)

                axios.put(API + `geet/massage/${dd4['id']}`, data)
                    .then((res) => {
                        console.log(res.data)
                        let temp = messages.findIndex( (elem) => elem === dd4 )
                        messages[temp] = res.data
                        setMessages(messages)
                    })
                    .catch((err) => console.log(err))

            }
            if(dd3['name'] === 'Добавить'){
                data.string_color_type = dd5['id'];
                data.string_color = dd5['name'] !== 'one color'? 0: parseInt(clr.slice(1), 16);
                data.string_timing_type = "not now";
                data.string_timing = "not now";
                data.string_speed = +data.string_speed;
                data.showed = +data.showed;

                axios.post(API + 'geet/massage', data)
                    .then((res) =>
                    {
                        axios.post(API + `geet/massage/${res.data['id']}/string`, {id:dd2['id']})
                            .then((res) => {console.log(res); setTrigger(!triggerEffect);})
                            .catch((err) => console.log(err))
                    })
                    .catch((err) => console.log(err))

            }
            if(dd3['name'] === 'Удалить'){
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
        if(dd1['name'] === 'Добавить')
        {
            axios.post(API + 'rStrings', data)
                .then((res) => {console.log(res); })
                .catch((err) => console.log(err))
        }
        if(dd1['name'] === 'Удалить')
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
        setValue('stext', elem['stext'])
        setValue('showed', Boolean(elem['showed']))
        //setCb(Boolean(elem['showed']))
        setRange(elem['string_speed'])
        setValue("string_speed", elem['string_speed'])
        setDD5(colors.find((el) => {return el["id"] === elem['string_color_type']}))
        setColor('#' + elem['string_color'].toString(16))
    }

    return(
        <form className='admin' onSubmit={handleSubmit(onSubmit)}>
           <h3>Admin panel</h3>

            <div className='flex center'>
                <p>Действие с устройством</p>
                <Dropdown elems = {operation} func = {setDD1} selected = {dd1} keys={'name'}/>
            </div>

            {dd1['name'] === 'Обновить' &&
                <div>
                    <div>
                        <p>Выбор аудитории</p>
                        <Dropdown elems = {rooms} func = {setDD2} selected = {dd2} keys={'name'}/>
                    </div>
                    <div>
                        <p>Действие с сообщением</p>
                        <Dropdown elems = {operation} func = {setDD3} selected = {dd3} keys={'name'}/>
                    </div>


                    {dd3['name'] === 'Обновить' &&
                        <div>
                            <div>
                                <p>Выбор сообщения</p>
                                <Dropdown elems = {messages} func = {ActualMessage} selected = {dd4} keys={'stext'}/>
                            </div>
                            <div style={{position: 'relative'}}>
                                <p>Текст сообщения</p>
                                <div className='form_elem _second'>
                                    <input id='st' {...register('stext')} placeholder="text"
                                           defaultValue={dd4['stext'] || ''}/>
                                </div>

                                <label className='checkbox'>
                                    <input {...register('showed')}
                                           type="checkbox" className="filled-in blue"
                                           />
                                    <span>Отображение сообщения</span>
                                </label>
                                <div className="range-field range">
                                    <p className='left'>Скорость:</p>
                                    <input {...register('string_speed')}
                                           type="range" id="rg2" min="0" max="100"
                                           defaultValue={dd4['stext']||11}
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
                    {dd3['name'] === 'Добавить' &&
                        <div style={{position: 'relative'}}>
                            <p>Текст сообщения</p>
                            <div className='form_elem _2'>
                                <input {...register('stext')} placeholder="text"/>
                            </div>

                            <label className='checkbox'>
                                <input type="checkbox"
                                       {...register('showed')}
                                       className="filled-in blue"
                                      />
                                <span>Отображение сообщения</span>
                            </label>

                                <div className="range-field range">
                                    <p>Скорость:</p>
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
                    {dd3['name'] === 'Удалить' &&
                        <div>
                            <div>
                                <p>Выбор сообщения</p>
                                <Dropdown elems = {messages} func = {setDD4} selected = {dd4} keys = {'stext'}/>
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
            { dd1['name'] === 'Добавить' &&
                <div>
                    <p>Текстовый идентификатор</p>
                    <div className='form_elem _second'>
                        <input {...register('code')} placeholder="code"/>
                    </div>
                    <p>Название аудитории</p>
                    <div className='form_elem _second'>
                        <input {...register('name')} placeholder="name"/>
                    </div>
                    <button className='button send' type='submit'>Add</button>
                </div>
            }

            { dd1['name'] === 'Удалить' &&
                <div>
                    <p>Выбор аудитории</p>
                    <Dropdown elems = {rooms} func = {setDD2} selected = {dd2} keys={'name'}/>
                    <button className='button send' type='submit'>Delete</button>
                </div>
            }
        </form>
    )
}