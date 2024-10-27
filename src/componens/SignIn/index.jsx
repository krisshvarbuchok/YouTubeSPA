import { useDispatch, useSelector } from "react-redux";
import { fetchAuthorization } from "../../redux/listSlice/listSlice";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import styles from './index.module.css';
import { Button, ConfigProvider, Input, Flex, Spin } from 'antd';
import { getWarning } from "../../redux/listSlice/WarningComponentSlice";
import WarningComponent from "../Warning/WarningComponent";

const contentStyle = {
    padding: 50,
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
};
const content = <div style={contentStyle} />;

const SignIn = () => {
    const navigate = useNavigate();
    const { control, register, handleSubmit, formState: { errors } } = useForm();
    const { status, error } = useSelector(state => state.list);
    const dispatch = useDispatch();
    const warning = useSelector(state => state.warning);


    // const handleClick = () => {
    //     //navigate('/google')
    // }
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
        return <div>
            <Flex gap="middle" vertical>
                <Flex gap="middle">
                    <Spin tip="Loading" size="large">
                        {content}
                    </Spin>
                </Flex>

            </Flex></div>
    }
    if (warning === 'Ошибка авторизации') {
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
                                borderRadius: 5,
                            },
                            components: {
                                Button: {
                                    colorPrimary: '#1390E5',
                                    colorPrimaryHover: '#0d76c1',
                                    controlHeight: 40,
                                    fontSize: 14,
                                },
                            },
                        }}
                    >
                        <Button type="primary" htmlType="submit" className={styles.buttonLogIn}>Вход</Button>
                    </ConfigProvider>
                </form>

                {/* <Button onClick={handleClick} >Вход через аккаунт Google</Button> */}
            </div>
        </>
    )
}
export default SignIn;