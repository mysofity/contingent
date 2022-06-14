import React, {useEffect, useState} from "react";
import './LoginPage.css';
import Logo from './logo.png';
import {loginUser} from '../services/serverData'
import "izitoast-react/dist/iziToast.css";
import iziToast from "izitoast";

function LoginPage() {
    const [inputEmail, setEmailItemInput] = useState('')
    const [inputPassword, setPasswordItemInput] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: inputEmail,
            password: inputPassword
        }
        loginUser(data)
            .then(() => {
                iziToast.success({
                    title: 'OK',
                    message: 'Успешная авторизация',
                });
                setEmailItemInput('');
                setPasswordItemInput('');
            })
            .catch((err) => {
                iziToast.error({
                    title: 'Error',
                    message: `Error: ${err.message}`,
                    position: 'topRight'
                });
            })
    };

    return (
        <>
            <div className="form_container">
                <div className="header_greeting">
                    <div className="Login_Logo"><img src={Logo} width="250px" height="50px" alt=""/></div>


                    <form className="form_style" onSubmit={handleSubmit}>

                        <label className="label_style" htmlFor="email">Email</label>
                        <input className="input_style" name="email" type="email" placeholder="Введите свой email"
                               onChange={event => setEmailItemInput(event.target.value)} value={inputEmail}/>
                        <label className="label_style" htmlFor="password">Пароль</label>
                        <input className="input_style" name="password" type="password"
                               placeholder="Введите свой пароль"
                               onChange={event => setPasswordItemInput(event.target.value)} value={inputPassword}/>
                        <label className="checkbox_style_login">
                            <input type="checkbox" placeholder="Запомните меня"/> Запомните меня
                        </label>
                        <button type="submit" className="button_style_login"> Войти</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginPage;