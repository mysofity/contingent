import {useState, useEffect} from 'react';
import './Navbar.css'
import { NavLink } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import jwt_decode from 'jwt-decode'
import {HOME_ROUTE, NOTIFICATION_ROUTE, REGISTRATION_ROUTE} from "../../../utils/consts";
import {getCountNotifications} from "../../../services/serverData";
import IconButton from "@mui/material/IconButton";
import {Avatar, Badge} from "@mui/material";
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';

export default function Navbar() {
    const [countOfNotifications, setCountOfNotifications] = useState('')
    let tokenName = ''
    let userName = ''
    let decodedToken = jwt_decode(localStorage.getItem("jwt"))
    try {
        if (localStorage.getItem("jwt")){
            tokenName = decodedToken.name.split(' ')
            userName =  tokenName.length === 2 ? `${tokenName[0]} ${tokenName[1]}` : tokenName
        }
    } catch (e) {
        userName = "Не авторизовано"
    }

    useEffect(() => {
        getCountNotifications(decodedToken.userId)
            .then(data => setCountOfNotifications(data))
    }, [])

    const [isActive, setIsActive] = useState(false)

    return (
        <section className="navbar">
            <NavLink to={HOME_ROUTE} className="navbar__item"> <HomeIcon sx={{fontSize: 20}}/>
                <div className="nav__pad">Главная</div>
            </NavLink>
            <div className="account">
                <div className="dropdown_btn_account" onClick={(e) => setIsActive(!isActive)}>
                    <NavLink to={NOTIFICATION_ROUTE}>
                        <IconButton aria-label={countOfNotifications}>
                            <Badge badgeContent={countOfNotifications} color="info">
                                <EmailIcon sx={{fontSize: 19, color: "#FA7A45"}}/>
                            </Badge>
                        </IconButton>
                    </NavLink>
                    <div className="nav__pad"> Личный кабинет</div>
                </div>

                {isActive && (
                    <div className="dropdown_content_account">
                        <div className="user_account">
                            <div className="user_name_account">{userName}</div>
                        </div>
                        <NavLink to={NOTIFICATION_ROUTE} className="mail_button_account">
                            <EmailIcon sx={{fontSize: 19}}/>
                            <div className="nav__pad"> Уведомления</div>
                        </NavLink>

                        {decodedToken.userId === 35 &&
                            <NavLink to={REGISTRATION_ROUTE} className="mail_button_account">
                                <HowToRegOutlinedIcon sx={{fontSize: 19}}/>
                                <div className="nav__pad"> Регистрация</div>
                            </NavLink>
                        }

                        <button
                            className="exit_button_account"
                            onClick={() => {
                                localStorage.removeItem('jwt')
                                window.location.reload()
                            }}><ExitToAppIcon sx={{fontSize: 19}}/>
                            <div className="nav__pad">Выход</div>
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}


