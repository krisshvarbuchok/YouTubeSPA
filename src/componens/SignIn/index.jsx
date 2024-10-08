import { useDispatch, useSelector } from "react-redux";
import { fetchAuthorization } from "../../redux/listSlice/listSlice";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import styles from './index.module.css';
import { Button, Input } from 'antd';


const SignIn = () => {
    const navigate = useNavigate();
    const { control, register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch(); 

    const handleClick = () =>{
        navigate('/google')
    }
    const onSubmit = (data) => {
        
        console.log(data);
        dispatch(fetchAuthorization(data))
            .unwrap()  // Дожидаемся окончания действия
            .then(() => {
                navigate('/authenticated');  // Редирект после успешной авторизации
            })
            .catch((error) => {
                console.error('Ошибка авторизации:', error);
            });
    }

    return (
        <div className={styles.container}>
            <div>
            <img src="sibdev-logo.svg" alt="Logo" className={styles.logo} />
            </div>
            <div className={styles.login}>Вход</div>
            <form onSubmit={handleSubmit(onSubmit)}  >
                <div  >
                    <label className={styles.label}>Логин</label>
                    <div>
                        {/* <Input  {...register('email', {
                            required: 'Обязательное поле',
                            pattern: {
                                value: /^[A-Za-z0-9-_.%+&]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                                message: 'Введите валидный email',
                            }
                        })} /> */}
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
                        {/* <Input.Password type="password" {...register('password', {
                            required: 'Обязательное поле',
                        })} /> */}
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

                <Button  type="primary" htmlType="submit" className={styles.buttonLogIn}>Вход</Button>

            </form>
            
            <Button onClick={handleClick} >Вход через аккаунт Google</Button>
        </div>
    )
}
export default SignIn;