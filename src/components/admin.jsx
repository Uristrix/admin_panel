import React, {useEffect, useState} from "react";
import '../style/admin_panel.css'
import {useForm} from "react-hook-form";
import {Dropdown} from "./dropdown";
import axios from 'axios'

import {observer} from "mobx-react-lite";
import 'react-notifications/src/notifications.scss'
import {NotificationManager} from 'react-notifications';
import store from '../store/appStore'
const API = process.env.REACT_APP_API

export const Admin = observer(() =>
{
    const{ register, handleSubmit } = useForm();
    const[rooms, setRooms] = useState([]);
    const[col, setCol] = useState('')

    const[triggerEffect, setTrigger] = useState(true);
    const [action, setAction] = useState('')
    //dropdowns
    const[dd, setDD] = useState({});     //room1

    useEffect(() =>
    {
        axios.get(API + 'rStrings' )
            .then((res) => {
                setRooms(res.data)
                if(Object.keys(res.data).length !== 0)
                    setDD(res.data[0])
            })
            .catch((err) => console.log(err))
    },[triggerEffect])

    useEffect(() =>
    {
        if(Object.keys(rooms).length !== 0)
        {
            axios.get(API + `geet/string/${dd['id']}/massageS` )
                .then((res) => {store.massageS = res.data})
                .catch((err) => console.log(err))

            axios.get(API + `geet/string/${dd['id']}/massageNS` )
                .then((res) => {store.massageN = res.data})
                .catch((err) => console.log(err))
        }
    },[dd, rooms])

    useEffect( () =>
    {
        if(col === 'S')
        {
            for(let el in store.massageN)
                store.updateN(el, false)
        }

        if(col === 'N')
        {
            for(let el in store.massageS)
                store.updateS(el, false)
        }
    }, [col])

    const onSubmit = (data) =>
    {
        if(action === 'Обновить_1')
        {
            const temp = col !== 'S'? col === 'N'? store.massageN: []: store.massageS
            if(temp.length === 0) NotificationManager.error('Не выбраны элементы запроса', '', 3000)
            for(const el of temp)
            {
                if(el["selected"] === true)
                    axios.put(API + `geet/massage/${el['id']}/showed`, {showed: col === 'S'?0:1})
                        .then((res) => {
                            console.log(res.data)
                            setTrigger(!triggerEffect);
                            NotificationManager.success('Сообщения обновлены', '', 3000)
                        })
                        .catch((err) => {
                            console.log(err);
                            NotificationManager.error('Ошибка обновления сообщений', '', 3000)
                        })
            }
        }

        if(action === 'Обновить_2')
        {
            const temp = col !== 'S'? col === 'N'?  store.massageN: []: store.massageS
            if(temp.length === 0) NotificationManager.error('Не выбраны элементы запроса', '', 3000)
            for(const el of temp)
            {
                if(el['selected'] === true)
                {
                    axios.delete(API + `geet/massage/${el['id']}`)
                        .then((res) => {
                            console.log(res);
                            setTrigger(!triggerEffect);
                            NotificationManager.success('Сообщения удалены', '', 3000)
                        })
                        .catch((err) => {
                            console.log(err);
                            NotificationManager.error('Ошибка удаления сообщений', '', 3000)})
                    }
                }
        }
        if(action === 'Добавить')
        {
            axios.post(API + 'rStrings', data)
                .then((res) => {
                    console.log(res);
                    setTrigger(!triggerEffect);
                    NotificationManager.success('Аудитория добавлена', '', 3000)
                })
                .catch((err) => {
                    console.log(err);
                    NotificationManager.error('Ошибка добавление аудитории', '', 3000)
                })
       }
        if(action === 'Удалить')
        {
            for(const el of store.massageS)
                axios.delete(API + `geet/massage/${el['id']}/string/${dd['id']}`)
                    .then((res) => {
                        console.log(res);
                        NotificationManager.success('Сообщения удалены', '', 3000)
                    })
                    .catch((err) => {
                        console.log(err);
                        NotificationManager.error('Ошибка удаления сообщений', '', 3000)})

            for(const el of store.massageN)
                axios.delete(API + `geet/massage/${el['id']}/string/${dd['id']}`)
                    .then((res) => {
                        console.log(res);
                        NotificationManager.success('Сообщения удалены', '', 3000)
                    })
                    .catch((err) => {
                        console.log(err);
                        NotificationManager.error('Ошибка удаления сообщений', '', 3000)})

                axios.delete(API + 'rStrings/' + dd['id'])
                    .then((res) => {
                        console.log(res);
                        setTrigger(!triggerEffect);
                        NotificationManager.success('Аудитория удалена', '', 3000)
                    })
                    .catch((err) => {
                        console.log(err);
                        NotificationManager.error('Сначала убедитесь что сообщения удалены',
                            'Ошибка удаления аудитории',
                            3000)
                    })

        }
    }

    return(
        <form className='admin' onSubmit={handleSubmit(onSubmit)}>
            {/*Удаление аудитории*/}
            <div className='flex_elem '>
                <div>
                    <h6>Выбор аудитории</h6>
                    <Dropdown elems = {rooms} func = {setDD} selected = {dd} keys={'name'}/>
                    <button className='button send' type='submit'
                            onClick={ () => setAction('Удалить') }
                    >Удалить</button>
                </div>

                {/*Добавление аудитории*/}
                <div>
                    <h6>Текстовый идентификатор</h6>
                    <div className='form_elem _second'>
                        <input {...register('code')} placeholder="code"/>
                    </div>
                    <h6>Название аудитории</h6>
                    <div className='form_elem _second'>
                        <input {...register('name')} placeholder="name"/>
                    </div>
                    <button className='button send' type='submit'
                            onClick={ () => setAction('Добавить') }
                    >Добавить</button>
                </div>
            </div>

            {/* Изменение блять*/}
            <div className='flex_elem update'>
                <div className= 'lists'>
                    <div>
                        <h6>Неотображающиеся сообщения</h6>
                        <ul className='list'>
                            {store.massageN.map ( (el, i) => {
                                return <li className={`li_elem${el['selected'] === true? ' select': ''}`}
                                           onClick={ () => {
                                               store.updateN(i, !el['selected']);
                                               setCol('N');
                                           } }
                                >{el['stext']}</li> })}
                        </ul>
                    </div>

                    <div>
                        <h6>Отображающиеся сообщения</h6>
                        <ul className='list'>
                            { store.massageS.map ( (el, i) => {
                                return <li className={`li_elem${el['selected'] === true? ' select': ''}`}
                                           onClick={ () => {
                                               store.updateS(i, !el['selected']);
                                               setCol('S');
                                           } }
                                >{el['stext']}</li> })}
                        </ul>
                    </div>

                </div>

                <div className='send flex_del'>
                    <button className='button' type='submit'
                            onClick={ () => setAction('Обновить_1') }
                    >Сменить отображение</button>

                    <button className='button' type='submit'
                            onClick={ () => setAction('Обновить_2') }
                    >Удалить</button>
                </div>

            </div>
        </form>
    )
})