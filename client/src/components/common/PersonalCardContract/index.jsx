import React, {useState} from 'react';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import {changeStudentData, removeStudent} from '../../../actions/student'
import {useLocation, useNavigate} from 'react-router-dom';
import iziToast from "izitoast";
import TextField from "@mui/material/TextField";
import {
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    MenuItem,
    SpeedDial,
    SpeedDialAction,
    SpeedDialIcon
} from "@mui/material";
import "./PersonalCardContract.css";
import Box from "@mui/material/Box";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import jwt_decode from "jwt-decode";
import ModalMessage from "../MessageModal";
import CreateTaskModalWindow from "../CreateTaskModal";
import ModalFile from "../filemanager/ModalFile";
import {getToken} from "../../../utils/token";
import {listItemStyle, propsDataStyle, propsStyle} from '../../../utils/consts/styles'

// файл с по сути тем же, что на страницах Quota.jsx, index.jsx, index.jsx, index.jsx
// отличаются они либо кол-вом форм, либо выходными данными. По сути, можно подумать как 4 страница сменить до 2, а мб до 1

export default function PersonalCardContract() {
    const [active, setActive] = useState(true);
    const [modalActive, setModalActive] = useState(false);
    const [editMode, setEditMode] = useState(true);
    const [modalFileActive, setModalFileActive] = useState(false);
    const [modalMessageActive, setModalMessageActive] = useState(false);

    const handleClickContract = () => {
        setActive(!active)
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleFileModal = () => {
        setModalFileActive(true);
    }

    const handleModal = () => {
        setModalActive(true);
    }

    const handleModalMessage = () => {
        setModalMessageActive(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const location = useLocation();
    const rows = location.state;

    const role = jwt_decode(getToken()).role
    const READER_ACCESS = role === 'Читатель'

    const [latin_name, setLatinName] = useState(rows.latin_name)
    const [education_type, setEducationType] = useState(rows.education_type)
    const [russian_name, setRussianName] = useState(rows.russian_name)
    const [RF_location, setLocation] = useState(rows.RF_location)
    const [contact_phone_number, setPhoneNumber] = useState(rows.contact_phone_number)
    const [representative_name, setRepresentativeName] = useState(rows.representative_name)
    const [representative_phone_number, setRepresentativePhoneNumber] = useState(rows.representative_phone_number)
    const [representative_email, setRepresentativeEmail] = useState(rows.representative_email)
    const [hours_number, setHoursNumber] = useState(rows.hours_number)
    const [student_email, setStudentEmail] = useState(rows.student_email)
    const [agent_name, setAgentName] = useState(rows.agent_name)
    const [agent_phone_number, setAgentPhone] = useState(rows.agent_phone_number)
    const [agent_email, setAgentEmail] = useState(rows.agent_email)
    const [country, setCountry] = useState(rows.country)
    const [birth_place, setBirthPlace] = useState(rows.birth_place)
    const [birth_date, setBirthDate] = useState(rows.birth_date)
    const [residence_place, setResidencePlace] = useState(rows.residence_place)
    const [citizenship, setCitizenship] = useState(rows.citizenship)
    const [gender, setGender] = useState(rows.gender)
    const [passport_number, setPassportNumber] = useState(rows.passport_number)
    const [passport_expiration, setPassportExpiration] = useState(rows.passport_expiration)
    const [passport_issued, setPassportIssued] = useState(rows.passport_issued)
    const [passport_issue_date, setPassportIssueDate] = useState(rows.passport_issue_date)
    const [level_education, setLevelEducation] = useState(rows.level_education)
    const [name_educational_institution, setEducationalInstitution] = useState(rows.name_educational_institution)
    const [form_study, setFormStudy] = useState(rows.form_study)
    const [enrollment, setEnrollment] = useState(rows.enrollment)
    const [enrollment_order, setEnrollmentOrder] = useState(rows.enrollment_order)
    const [expulsion_order, setExpulsionOrder] = useState(rows.expulsion_order)
    const [contract_number, setContractNumber] = useState(rows.contract_number)
    const [status_1C, set1CStatus] = useState(rows.status_1c)
    const [tutor_name, setTutorName] = useState(rows.tutor_name)
    const [first_payment, setFirstPayment] = useState(rows.first_payment)
    const [second_payment, setSecondPayment] = useState(rows.second_payment)
    const [third_payment, setThirdPayment] = useState(rows.third_payment)
    const [fourth_payment, setFourthPayment] = useState(rows.fourth_payment)
    const [entry_date, setEntryDate] = useState(rows.entry_date)
    const [visa_validity, setVisaValidity] = useState(rows.visa_validity)
    const [transfer_to_international_service, setDateOfTransfer] = useState(rows.transfer_to_international_service)
    const [transfer_to_MVD, setDateOfMvdTransfer] = useState(rows.transfer_to_MVD)
    const [estimated_receipt_date, setDateOfReceiving] = useState(rows.estimated_receipt_date)
    const [actual_receipt_date_invitation, setDateOfReceipt] = useState(rows.actual_receipt_date_invitation)
    const [comments, setComments] = useState(rows.comments)

    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            education_type: education_type,
            latin_name: latin_name,
            russian_name: russian_name,
            RF_location: RF_location,
            contact_phone_number: contact_phone_number,
            student_email: student_email,
            agent_name: agent_name,
            agent_phone_number: agent_phone_number,
            agent_email: agent_email,
            country: country,
            birth_place: birth_place,
            birth_date: birth_date,
            residence_place: residence_place,
            citizenship: citizenship,
            gender: gender,
            passport_number: passport_number,
            passport_expiration: passport_expiration,
            passport_issued: passport_issued,
            passport_issue_date: passport_issue_date,
            level_education: level_education,
            name_educational_institution: name_educational_institution,
            form_study: form_study,
            enrollment: enrollment,
            enrollment_order: enrollment_order,
            expulsion_order: expulsion_order,
            contract_number: contract_number,
            status_1C: status_1C,
            tutor_name: tutor_name,
            first_payment: first_payment,
            second_payment: second_payment,
            third_payment: third_payment,
            fourth_payment: fourth_payment,
            entry_date: entry_date,
            visa_validity: visa_validity,
            document_path: '',
            transfer_to_international_service: transfer_to_international_service,
            transfer_to_MVD: transfer_to_MVD,
            estimated_receipt_date: estimated_receipt_date,
            actual_receipt_date_invitation: actual_receipt_date_invitation
        }
        changeStudentData(data, rows.id, navigate)
    };

    const actions = !READER_ACCESS ?
        [
            {
                icon: <NotificationsNoneIcon/>,
                name: 'Создать задачу',
                runFunction: () => {
                    handleModalMessage()
                }
            },
            {
                icon: <InsertDriveFileOutlinedIcon/>,
                name: 'Файлы студента',
                runFunction: () => {
                    handleFileModal()
                }
            },
            {
                icon: <MailOutlineIcon/>,
                name: 'Написать письмо',
                runFunction: () => {
                    handleModal()
                }
            },
            {
                icon: <DeleteOutlineIcon/>,
                name: 'Удалить студента',
                runFunction: () => {
                    handleOpen()
                }
            },
            {
                icon: <EditIcon/>,
                name: 'Редактировать карточку',
                runFunction: () => {
                    setEditMode(!editMode)
                    editMode ?
                        iziToast.success({
                            title: 'ON',
                            message: 'Режим редактирования включен',
                            position: "topRight"
                        })
                        :
                        iziToast.error({
                            title: 'OFF',
                            message: 'Режим редактирования выключен',
                            position: "topRight",
                            color: "#FFF2ED"
                        })
                }
            }
        ] :
        [
            {
                icon: <NotificationsNoneIcon/>,
                name: 'Создать задачу',
                runFunction: () => {
                    handleModalMessage()
                }
            }
        ]
    return (
        <>
            <form onSubmit={handleSubmit}>
                <p className="title_studentName">Личная карточка {rows.russian_name}</p>
                <div className="info_and_education_container">
                    <p className="title_quota"> Личная информация студента </p>
                    <div className="columns_position">
                        <div className="column_style_contract">
                            <p className="tytle_contract_info"> Личные данные</p>
                            <TextField label="Ф.И.О. (лат.)" variant="outlined" color="warning" type="text"
                                       margin='normal' disabled={editMode} required size="small" sx={{width: "325px"}}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setLatinName(event.target.value)} value={latin_name}/>
                            <TextField label="Ф.И.О. (кир.)" variant="outlined" color="warning" type="text"
                                       margin='normal' disabled={editMode}
                                       size="small" inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setRussianName(event.target.value)} value={russian_name}/>
                            <TextField label="Контактный телефон студента" variant="outlined" color="warning" type="tel"
                                       margin='normal' size="small" disabled={editMode}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setPhoneNumber(event.target.value)}
                                       value={contact_phone_number}/>
                            <TextField label="E-mail студента" variant="outlined" color="warning" type="email"
                                       margin='normal' size="small" disabled={editMode}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setStudentEmail(event.target.value)} value={student_email}/>
                            <TextField label="Страна" type="text" variant="outlined" color="warning" margin='normal'
                                       size="small" sx={{width: "325px"}} disabled={editMode}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setCountry(event.target.value)} value={country}/>
                            <TextField label="Дата рождения" type="date" color="warning"
                                       required margin='normal' size="small" disabled={editMode}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setBirthDate(event.target.value)} value={birth_date}/>
                            <TextField label="Место рождения" type="text" variant="outlined" color="warning"
                                       margin='normal' disabled={editMode}
                                       size="small" inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setBirthPlace(event.target.value)} value={birth_place}/>
                            <TextField label="Место проживания" type="text" variant="outlined" color="warning"
                                       margin='normal' size="small" disabled={editMode}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setResidencePlace(event.target.value)}
                                       value={residence_place}/>
                            <TextField label="Гражданство" type="text" variant="outlined" color="warning"
                                       margin='normal' disabled={editMode} size="small"
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setCitizenship(event.target.value)} value={citizenship}/>
                            <TextField label="Пол" type="text" variant="outlined" color="warning" margin='normal'
                                       required size="small" select InputLabelProps={propsStyle} disabled={editMode}
                                       onChange={event => setGender(event.target.value)} value={gender}>
                                <MenuItem sx={propsStyle} value="Мужской">
                                    <span style={propsStyle.style}>Мужской</span>
                                </MenuItem>
                                <MenuItem sx={propsStyle} value="Женский">
                                    <span style={propsStyle.style}>Женский</span>
                                </MenuItem>
                            </TextField>
                            <TextField label="Куратор" type="text" variant="outlined" color="warning"
                                       size="small" disabled={editMode} margin='normal'
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setTutorName(event.target.value)} value={tutor_name}/>
                        </div>
                        <div className="column_style_contract">
                            <p className="tytle_contract_info"> Контактные данные агента</p>
                            <TextField label="Ф.И.О." variant="outlined" color="warning" type="text"
                                       margin='normal' disabled={editMode}
                                       size="small" inputProps={propsStyle} InputLabelProps={propsStyle}/>
                            <TextField label="Телефон" variant="outlined" color="warning" type="tel"
                                       margin='normal' size="small" disabled={editMode}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setPhoneNumber(event.target.value)}
                                       value={contact_phone_number}/>
                            <TextField label="E-mail" variant="outlined" color="warning" type="email"
                                       margin='normal' size="small" disabled={editMode}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setStudentEmail(event.target.value)} value={student_email}/>
                            <p className="tytle_contract_info"> Контактные данные представителя</p>
                            <TextField label="Ф.И.О." variant="outlined" color="warning" type="text"
                                       margin='normal' disabled={editMode}
                                       size="small" inputProps={propsStyle} InputLabelProps={propsStyle}/>
                            <TextField label="Телефон" variant="outlined" color="warning" type="tel"
                                       margin='normal' size="small" disabled={editMode}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setPhoneNumber(event.target.value)}
                                       value={contact_phone_number}/>
                            <TextField label="E-mail" variant="outlined" color="warning" type="email"
                                       margin='normal' size="small" disabled={editMode}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setStudentEmail(event.target.value)} value={student_email}/>
                            <p className="tytle_contract_info"> Данные о местоположении </p>
                            <TextField label="Нахождение в РФ" type="text" variant="outlined" color="warning"
                                       margin='normal' select size="small" InputLabelProps={propsStyle}
                                       onChange={event => setLocation(event.target.value)} value={RF_location}
                                       disabled={editMode}>
                                <MenuItem value="Да">
                                    <span style={propsStyle.style}>Да</span>
                                </MenuItem>
                                <MenuItem value="Нет">
                                    <span style={propsStyle.style}>Нет</span>
                                </MenuItem>
                            </TextField>
                            <TextField label="Дата въезда" type="date" color="warning" disabled={editMode}
                                       margin='normal' size="small" sx={{width: "325px"}}
                                       inputProps={propsStyle} InputLabelProps={propsDataStyle}
                                       onChange={event => setEntryDate(event.target.value)} value={entry_date}/>
                        </div>
                    </div>
                </div>

                <div className="info_and_education_container">
                    <p className="title_quota"> Образование </p>
                    <div className="columns_position">
                        <div className="column_style_contract">
                            <p className="tytle_contract_education"> Полученный уровень образования </p>
                            <TextField label="Уровень полученного образования" type="text" variant="outlined"
                                       color="warning" margin='normal' sx={{width: "325px"}} disabled={editMode}
                                       size="small" inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setLevelEducation(event.target.value)}
                                       value={level_education}/>
                            <TextField label="Образовательная организация" type="text" variant="outlined"
                                       color="warning" margin='normal' size="small" disabled={editMode}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setEducationalInstitution(event.target.value)}
                                       value={name_educational_institution}/>
                            <TextField label="Наименование учебного заведения" type="text" variant="outlined"
                                       color="warning" margin='normal' size="small" disabled={editMode}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setEducationalInstitution(event.target.value)}
                                       value={name_educational_institution}/>
                            <TextField label="Местонахождение учебного заведения" type="text" variant="outlined"
                                       color="warning" margin='normal' size="small" disabled={editMode}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setEducationalInstitution(event.target.value)}
                                       value={name_educational_institution}/>
                            <TextField label="Область образования" type="text" variant="outlined"
                                       color="warning" margin='normal' size="small" disabled={editMode}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setEducationalInstitution(event.target.value)}
                                       value={name_educational_institution}/>
                            <TextField label="Год окончания" type="text" color="warning"
                                       margin='normal' size="small" sx={{width: "325px"}}
                                       inputProps={propsStyle} disabled={editMode}
                                       InputLabelProps={propsDataStyle}
                                       onChange={event => setEntryDate(event.target.value)} value={entry_date}/>
                            <p className="tytle_contract_education"> Дополнительно </p>
                            <TextField label="Примечания" type="text" variant="outlined" color="warning" margin='normal'
                                       size="small" multiline rows={5} disabled={editMode}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setComments(event.target.value)} value={comments}/>
                        </div>
                        <div className="column_style_contract">
                            <p className="tytle_contract_education"> Уровень получаемого образования </p>
                            <TextField label="Статус зачисления" type="text" variant="outlined" color="warning"
                                       margin='normal' size="small" select sx={{width: "325px"}}
                                       InputLabelProps={propsStyle} disabled={editMode}
                                       onChange={event => setEnrollment(event.target.value)} value={enrollment}>
                                <MenuItem value="Зачислен">
                                    <span style={propsStyle.style}>Зачислен</span>
                                </MenuItem>
                                <MenuItem value="Не зачислен">
                                    <span style={propsStyle.style}>Не зачислен</span>
                                </MenuItem>
                            </TextField>
                            <TextField label="Количество часов" type="text" variant="outlined" color="warning"
                                       margin='normal' size="small" select
                                       InputLabelProps={propsStyle} disabled={editMode}
                                       onChange={event => setHoursNumber(event.target.value)} value={hours_number}>
                                <MenuItem value="1008 ак.ч. (1 год)">
                                    <span style={listItemStyle}>1008 ак.ч. (1 год)</span>
                                </MenuItem>
                                <MenuItem value="1008 ак.ч. (1.5 год)">
                                    <span style={listItemStyle}>1008 ак.ч. (1.5 год)</span>
                                </MenuItem>
                                <MenuItem value="868 ак.ч.">
                                    <span style={listItemStyle}>868 ак.ч.</span>
                                </MenuItem>
                                <MenuItem value="728 ак.ч.">
                                    <span style={listItemStyle}>728 ак.ч.</span>
                                </MenuItem>
                                <MenuItem value="588 ак.ч.">
                                    <span style={listItemStyle}>588 ак.ч.</span>
                                </MenuItem>
                                <MenuItem value="504 ак.ч.">
                                    <span style={listItemStyle}>504 ак.ч.</span>
                                </MenuItem>
                                <MenuItem value="288 ак.ч.">
                                    <span style={listItemStyle}>588 ак.ч.</span>
                                </MenuItem>
                                <MenuItem value="144 ак.ч.">
                                    <span style={listItemStyle}>144 ак.ч.</span>
                                </MenuItem>
                                <MenuItem value="108 ак.ч.">
                                    <span style={listItemStyle}>108 ак.ч.</span>
                                </MenuItem>
                                <MenuItem value="588 ак.ч.">
                                    <span style={listItemStyle}>72 ак.ч.</span>
                                </MenuItem>
                            </TextField>
                            <TextField label="Уровень желаемого образования" type="text" variant="outlined"
                                       color="warning" margin='normal' size="small" disabled={editMode}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setEducationalInstitution(event.target.value)}
                                       value={name_educational_institution}/>
                            <TextField label="Форма обучения" type="text" variant="outlined" color="warning"
                                       margin='normal' disabled={editMode}
                                       size="small" select InputLabelProps={propsStyle}
                                       onChange={event => setFormStudy(event.target.value)} value={form_study}>
                                <MenuItem value="Очная">
                                    <span style={listItemStyle}>Очная</span>
                                </MenuItem>
                                <MenuItem value="Гибрид">
                                    <span style={listItemStyle}>Гибрид</span>
                                </MenuItem>
                                <MenuItem value="Онлайн">
                                    <span style={listItemStyle}>Онлайн</span>
                                </MenuItem>
                            </TextField>
                            <TextField label="Тип обучения" type="text" variant="outlined" color="error" margin='normal'
                                       required size="small" select focused InputLabelProps={propsStyle}
                                       disabled={editMode}
                                       onChange={event => setEducationType(event.target.value)} value={education_type}>
                                <MenuItem value="Контракт">
                                    <span style={listItemStyle}>Контракт</span>
                                </MenuItem>
                                <MenuItem value="Квота">
                                    <span style={listItemStyle}>Квота</span>
                                </MenuItem>
                            </TextField>
                            <TextField label="Номер приказа о зачислении" type="text" variant="outlined" color="warning"
                                       margin='normal' size="small" disabled={editMode}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setEnrollmentOrder(event.target.value)}
                                       value={enrollment_order}/>
                            <TextField label="Номер приказа об отчислении" type="text" variant="outlined"
                                       color="warning" disabled={editMode} margin='normal' size="small"
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setExpulsionOrder(event.target.value)}
                                       value={expulsion_order}/>
                            {/*Нужно привязать*/}
                            <TextField label="Куратор" type="text" variant="outlined" color="warning" margin='normal'
                                       size="small" disabled={editMode}
                                       InputLabelProps={propsStyle} inputProps={propsStyle}
                                       onChange={event => setTutorName(event.target.value)} value={tutor_name}/>
                        </div>
                    </div>
                </div>
                <div className="info_and_education_container">
                    <p className="title_quota"> Документы </p>
                    <div className="columns_position">
                        <div className="column_style_contract">
                            <p className="title_contract_doc"> Паспортные данные</p>
                            <TextField label="Номер паспорта" type="text" variant="outlined" color="warning"
                                       margin='normal' disabled={editMode}
                                       required size="small" inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setPassportNumber(event.target.value)}
                                       value={passport_number}/>
                            <TextField label="Срок действия паспорта" type="date" color="warning"
                                       margin='normal' size="small" disabled={editMode}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setPassportExpiration(event.target.value)}
                                       value={passport_expiration}/>
                            <TextField label="Кем выдан" type="text" variant="outlined" color="warning" margin='normal'
                                       size="small" disabled={editMode} value={passport_issued}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setPassportIssued(event.target.value)}/>
                            <TextField label="Дата выдачи" type="date" color="warning" margin='normal'
                                       inputProps={propsStyle} size="small" disabled={editMode}
                                       InputLabelProps={propsDataStyle}
                                       onChange={event => setPassportIssueDate(event.target.value)}
                                       value={passport_issue_date}/>
                            <p className="title_contract_doc"> Дополнительные документы </p>
                            <TextField label="Срок действия визы" type="date" color="warning" disabled={editMode}
                                       margin='normal' size="small" inputProps={propsStyle}
                                       InputLabelProps={propsDataStyle}
                                       onChange={event => setVisaValidity(event.target.value)} value={visa_validity}/>
                            <TextField label="Дата передачи в международную службу" type="date" color="warning"
                                       margin='normal' size="small" inputProps={propsStyle} disabled={editMode}
                                       InputLabelProps={propsDataStyle}
                                       onChange={event => setDateOfTransfer(event.target.value)}
                                       value={transfer_to_international_service}/>
                            <TextField label="Дата передачи в МВД" type="date" color="warning" disabled={editMode}
                                       margin='normal' size="small" inputProps={propsStyle}
                                       InputLabelProps={propsDataStyle}
                                       onChange={event => setDateOfMvdTransfer(event.target.value)}
                                       value={transfer_to_MVD}/>

                            <TextField label="Ориентировочная дата получения" type="date" color="warning"
                                       margin='normal' size="small" inputProps={propsStyle} disabled={editMode}
                                       InputLabelProps={propsDataStyle}
                                       onChange={event => setDateOfReceiving(event.target.value)}
                                       value={estimated_receipt_date}/>

                            <TextField label="Фактическая дата получения приглашения" type="date" color="warning"
                                       margin='normal' size="small" inputProps={propsStyle} disabled={editMode}
                                       InputLabelProps={propsDataStyle}
                                       onChange={event => setDateOfReceipt(event.target.value)}
                                       value={actual_receipt_date_invitation}/>
                        </div>
                        <div className="column_style_contract">
                            <p className="tytle_contract_doc_contaner"> Документы оплаты </p>
                            <TextField label="Номер договора" type="text" variant="outlined" color="warning"
                                       margin='normal' disabled={editMode}
                                       size="small" inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setContractNumber(event.target.value)}
                                       value={contract_number}/>
                            {/*Нужно привязать*/}
                            <TextField label="Рег. номер направления" type="text" variant="outlined" color="warning"
                                       margin='normal' disabled={editMode}
                                       size="small" inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setContractNumber(event.target.value)}
                                       value={contract_number}/>
                            <TextField label="Статус 1C" type="text" variant="outlined" color="warning" margin='normal'
                                       size="small" select InputLabelProps={propsStyle} disabled={editMode}
                                       onChange={event => set1CStatus(event.target.value)} value={status_1C}>
                                <MenuItem value="Прикреплен">
                                    <span style={listItemStyle}>Прикреплен</span>
                                </MenuItem>
                                <MenuItem value="Не прикреплен">
                                    <span style={listItemStyle}>Не прикреплен</span>
                                </MenuItem>
                            </TextField>
                            <TextField label="Платеж 1" type="date" color="warning" disabled={editMode}
                                       margin='normal' size="small" inputProps={propsStyle}
                                       InputLabelProps={propsDataStyle}
                                       onChange={event => setFirstPayment(event.target.value)} value={first_payment}/>
                            <TextField label="Платеж 2" type="date" color="warning" disabled={editMode}
                                       margin='normal' size="small" inputProps={propsStyle}
                                       InputLabelProps={propsDataStyle}
                                       onChange={event => setSecondPayment(event.target.value)} value={second_payment}/>
                            <TextField label="Платеж 3" type="date" color="warning" disabled={editMode}
                                       margin='normal' size="small" inputProps={propsStyle}
                                       InputLabelProps={propsDataStyle}
                                       onChange={event => setThirdPayment(event.target.value)} value={third_payment}/>
                            <TextField label="Платеж 4" type="date" color="warning" disabled={editMode}
                                       margin='normal' size="small" inputProps={propsStyle}
                                       InputLabelProps={propsDataStyle}
                                       onChange={event => setFourthPayment(event.target.value)} value={fourth_payment}/>
                        </div>
                    </div>
                </div>
                {!editMode && <div>
                    <label className="checkbox_style_contract">
                        <input type="checkbox" onClick={handleClickContract}/>Вы уверены, что хотите изменить данные?
                    </label>
                    <div className="button_position_contract_doc">
                        <button type="submit" className="button_style_contract_doc" disabled={active}>Изменить</button>
                    </div>
                </div>}
            </form>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Удаление студента</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Вы уверены, что хотите удалить выбранного студента?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        removeStudent(rows.id, navigate)
                        setOpen(false)
                    }
                    }>Да</Button>
                    <Button onClick={() => {
                        setOpen(false)
                    }
                    }>Нет</Button>
                </DialogActions>
            </Dialog>
            <Box>
                {modalActive || modalMessageActive || modalFileActive ||
                    <SpeedDial
                        ariaLabel="SpeedDial openIcon example"
                        sx={{position: 'fixed', bottom: 20, right: 20}}
                        icon={<SpeedDialIcon/>}
                        FabProps={{
                            sx: {
                                bgcolor: '#FA7A45',
                                '&:hover': {
                                    bgcolor: '#FA7A45',
                                }
                            }
                        }}
                    >
                        {actions.map((action) => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                onClick={() => {
                                    action.runFunction()
                                }}
                            />
                        ))}
                    </SpeedDial>}
                <ModalMessage active={modalActive} setActive={setModalActive} studentEmail={[student_email]}/>
                <CreateTaskModalWindow active={modalMessageActive} setActive={setModalMessageActive}
                                       singleId={rows.id}/>
                <ModalFile active={modalFileActive} setActive={setModalFileActive} studentId={rows.id}/>
            </Box>
        </>
    )
}