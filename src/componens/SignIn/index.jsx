import { useDispatch, useSelector } from "react-redux";
import { fetchAuthorization } from "../../redux/listSlice/listSlice";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import styles from './index.module.css';
import { Button, ConfigProvider, Input } from 'antd';
import { getWarning } from "../../redux/listSlice/warningSlice";
import WarningComponent from "../Warning/WarningComponent";


const SignIn = () => {
    const navigate = useNavigate();
    const { control, register, handleSubmit, formState: { errors } } = useForm();
    const { status, error } = useSelector(state => state.list);
    const dispatch = useDispatch();
    const warning = useSelector(state=> state.warning);
    

    const handleClick = () => {
        //navigate('/google')
    }
    const onSubmit = (data) => {

        //console.log(data);

        dispatch(fetchAuthorization(data))
            .unwrap()  // Дожидаемся окончания действия
            .then(() => {
                //console.log(data);
                
                localStorage.setItem('userName', data.email)
                //console.log('втход',localStorage.getItem('userName'));
                
                navigate('/authenticated');  // Редирект после успешной авторизации
            })
            .catch((error) => {
                dispatch(getWarning('Ошибка авторизации'));
                console.error('Ошибка авторизации:', error);
            });
    }
    if (status === 'loading') {
        return <div>...loading</div>
    }
    if(warning === 'Ошибка авторизации') {
        return <WarningComponent />
    }

    return (
        <>
        <div className={styles.container}>
            <div>
                <img src="sibdev-logo.svg" alt="Logo" className={styles.logo} />
            </div>
            <div className={styles.login}>Вход</div>
            <form onSubmit={handleSubmit(onSubmit)}  >
                <div  >
                    <label className={styles.label}>Логин</label>
                    <div>
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: 'Обязательное поле',
                                pattern: {
                                    value: /^[A-Za-z0-9-_.%+&]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                                    message: 'Введите валидный email',
                                }
                            }}
                            render={({ field }) => (
                                <Input {...field} placeholder="Введите ваш email" />
                            )}
                        />
                        <p >{errors.email?.message}</p>
                    </div>
                </div>
                <div    >
                    <label className={styles.label}>Пароль</label>
                    <div>
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: 'Обязательное поле' }}
                            render={({ field }) => (
                                <Input.Password {...field} placeholder="Введите ваш пароль" />
                            )}
                        />
                        <p >{errors.password?.message}</p>
                    </div>
                </div>
                <ConfigProvider
                    theme={{
                        token: {
                            borderRadius: 5,  // Округление рамки
                        },
                        components: {
                            Button: {
                                colorPrimary: '#1390E5', // Основной цвет кнопки
                                colorPrimaryHover: '#0d76c1', // Цвет при наведении
                                controlHeight: 40, // Высота кнопки
                                // controlWidth: 176, // Ширина кнопки
                                fontSize: 14, // Размер шрифта
                            },
                        },
                    }}
                >
                    <Button type="primary" htmlType="submit" className={styles.buttonLogIn}>Вход</Button>
                </ConfigProvider>
            </form>

            <Button onClick={handleClick} >Вход через аккаунт Google</Button>
        </div>
        </>
    )
}
export default SignIn;