import React from 'react';
import { motion } from 'framer-motion';
import { Form, Formik } from 'formik';
import { useAppDispatch } from 'redux/store';

import { login, register, resetStatus } from 'redux/slices/authSlice';
import { IUserRegister } from 'shared/interfaces/IUser';

import { FormikFields, ApiError } from './FormikFields';
import { LoginSchema, RegisterSchema } from './FormikSchemas';

interface IPayload {
    isAuthenticated: boolean;
    status: number;
}

const Login = () => {
    const dispatch = useAppDispatch();

    const [isRegister, setIsRegister] = React.useState(false);
    const [responseStatus, setResponseStatus] = React.useState(0);

    const handleClick = (setErrorsCallback: any, resetFormCallback: any) => {
        setIsRegister(!isRegister);
        dispatch(resetStatus());
        setErrorsCallback({});
        resetFormCallback();
    };

    const handleSubmit = (values: IUserRegister, actions: any) => {
        validate(values).then(() => {});
    };

    const validate = async (values: IUserRegister) => {
        const { password, email } = values;

        if (isRegister) {
            const { payload } = await dispatch(register(values));
            const { status } = payload as IPayload;
            setResponseStatus(status);
            if (status === 409) {
                return;
            }
        } else {
            const { payload } = await dispatch(login({ email, password }));
            const { status } = payload as IPayload;
            setResponseStatus(status);

            if (status === 401) {
                return;
            }
        }
        setIsRegister(false);
    };

    return (
        <div className="flex min-h-screen flex-wrap content-center justify-center bg-blue-950">
            <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl bg-white max-[640px]:w-full sm:w-8/12 md:w-6/12 xl:w-4/12"
            >
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        firstName: '',
                        lastName: '',
                        confirmPassword: '',
                    }}
                    validationSchema={isRegister ? RegisterSchema : LoginSchema}
                    onSubmit={(values: IUserRegister, actions) => {
                        handleSubmit(values, actions);
                        actions.setSubmitting(true);
                    }}
                >
                    {({ setErrors, resetForm }) => (
                        <Form
                            className="flex h-full w-full flex-col flex-wrap
                            content-center justify-center rounded-2xl border-b-4
                            border-l-4 border-gray-500 py-4 shadow-md
                            shadow-gray-600"
                        >
                            {isRegister && (
                                <FormikFields
                                    value={'firstName'}
                                    placeholder={'firstname'}
                                />
                            )}
                            {isRegister && (
                                <FormikFields
                                    value={'lastName'}
                                    placeholder={'lastname'}
                                />
                            )}
                            <FormikFields
                                value={'email'}
                                placeholder={'example@example.com'}
                            />
                            <FormikFields
                                value={'password'}
                                placeholder={'password'}
                                type={'password'}
                            />
                            {isRegister && (
                                <FormikFields
                                    value={'confirmPassword'}
                                    placeholder={'confirm password'}
                                    type={'password'}
                                />
                            )}

                            {!isRegister && responseStatus === 401 && (
                                <ApiError
                                    value={'Username or password is wrong'}
                                />
                            )}

                            {isRegister && responseStatus === 409 && (
                                <ApiError value={'Email already exist'} />
                            )}

                            {!isRegister && responseStatus === 500 && (
                                <ApiError
                                    value={'Something went wrong with server'}
                                />
                            )}

                            <div className="flex justify-around">
                                <button
                                    type="submit"
                                    className="w-5/12 self-center
                                    rounded-full border-b-4 border-blue-900
                                    bg-gradient-to-r from-blue-500 to-blue-800 p-2
                                    text-xl text-white shadow-md shadow-blue-500
                                    hover:bg-gradient-to-br"
                                >
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    className={`w-5/12 self-center rounded-full 
                                    border-b-4 border-green-900 bg-gradient-to-l 
                                    from-green-500 to-green-800 p-2 text-xl 
                                    text-white hover:bg-gradient-to-bl ${
                                        isRegister
                                            ? 'border-yellow-900 from-yellow-500 ' +
                                              'to-yellow-800'
                                            : ''
                                    }`}
                                    onClick={() =>
                                        handleClick(setErrors, resetForm)
                                    }
                                >
                                    {isRegister ? 'Login' : 'Register'}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </motion.div>
        </div>
    );
};

export default Login;
