import React, {useEffect, useState} from "react";
import {Dropdown} from "./dropdown";
import {ChromePicker} from "react-color";
import {useForm} from "react-hook-form";
import axios from "axios";
import {NotificationManager} from "react-notifications";
import '../style/message.css'

const colors = [{name: 'one color', id:0}, {name: 'gradient', id:1}, {name: 'different color', id:2}]
const API = process.env.REACT_APP_API


export const Massage = () =>
{
    const{ register, handleSubmit } = useForm();
    const[rooms, setRooms] = useState([]);
    const[dd1, setDD1] = useState({});             //room1
    const[dd, setDD] = useState(colors[0]);                 //color
    const[action, setAction] = useState('')        //one/all
    const[range, setRange] = useState(11);
    const[clr, setColor] = useState('#ffffff');

    const[triggerEffect, setTrigger] = useState(true);

    useEffect(() =>
    {
        axios.get(API + 'rStrings' )
            .then((res) => {
                setRooms(res.data)
                if(Object.keys(res.data).length !== 0)
                    setDD1(res.data[0])
            })
            .catch((err) => console.log(err))
    },[triggerEffect])

    const onSubmit = (data) =>
    {
        data.string_color_type = dd['id'];
        data.string_color = dd['name'] !== 'one color'? 0: parseInt(clr.slice(1), 16);
        data.string_timing_type = "not now";
        data.string_timing = "not now";
        data.string_speed = +data.string_speed;
        data.showed = 0;

        axios.post(API + 'geet/massage', data)
            .then((res) => {
                if(action === 'one') {
                    axios.post(API + `geet/massage/${res.data['id']}/string`, {id:dd1['id']})
                        .then((res) => {
                            console.log(res);
                            setTrigger(!triggerEffect);
                            NotificationManager.success('Сообщение добавлено', '', 3000);
                        })
                        .catch((err) => {
                            console.log(err);
                            NotificationManager.error('Ошибка привязки сообщения', '', 3000);
                        })
                }
                else
                {
                    for(const el of rooms)
                    {
                        console.log(el)
                        axios.post(API + `geet/massage/${res.data['id']}/string`, {id:el['id']})
                            .then((res) => {
                                console.log(res);
                                setTrigger(!triggerEffect);
                                NotificationManager.success('Сообщение добавлено', '', 3000);
                            })
                            .catch((err) => {
                                console.log(err);
                                NotificationManager.error('Ошибка привязки сообщения', '', 3000);
                            })
                        }
                    }

            })
            .catch((err) => {console.log(err); NotificationManager.error('Ошибка добавления сообщения', '', 3000)})

    }


    return <form className='admin message' onSubmit={handleSubmit(onSubmit)}>

        <div>
            <p>Выбор аудитории</p>
            <Dropdown elems = {rooms} func = {setDD1} selected = {dd1} keys={'name'}/>
        </div>

        <div>
            <p>Текст сообщения</p>
            <div className='form_elem _2'>
                <input {...register('stext')} placeholder="text"/>
            </div>

            <p>Скорость строки</p>
            <div className="range-field range">
                <p> </p>
                <input {...register('string_speed')}
                       type="range" id="rg" min="0" max="100" defaultValue="11"
                       onChange={() => {setRange(document.getElementById('rg').value)}}
                />
                <p>{range}</p>
            </div>

            <div>
                <p>Выбор типа цвета</p>
                <Dropdown elems = {colors} func = {setDD} selected = {dd} keys={'name'}/>
            </div>
            {dd['name'] === 'one color' && <ChromePicker  color = {clr}
                                                           onChangeComplete ={ (color) => {setColor(color['hex'])}}
            />}
            <div className='flex_del send'>
                <button className='button' type='submit'
                        onClick={ () => setAction('one') }>Добавить для одной</button>
                <button className='button' type='submit'
                        onClick={ () => setAction('all') }>Добавить для всех</button>
            </div>

        </div>
    </form>

}