import React from 'react';
import { motion } from 'framer-motion';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import FormikFields from './FormikFields';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('* Email is required'),
    password: Yup.string().required('* Password is required'),
});

const RegisterSchema = Yup.object().shape({
    email: Yup.string()
        .email('* Invalid email')
        .required('* Email is required'),
    password: Yup.string()
        .min(4, '* Password is too short!')
        .max(20, '* Password is too long!')
        .required('* Password is required'),
    name: Yup.string()
        .min(3, '* Name is too short!')
        .max(20, '* Name is too long!')
        .required('* Name is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], '* Password does not match')
        .required('* Confirm password is required'),
});

const Login = () => {
    const [isRegister, setIsRegister] = React.useState(false);

    const handleClick = (setErrorsCallback: any, resetFormCallback: any) => {
        setIsRegister(!isRegister);
        setErrorsCallback({});
        resetFormCallback();
    };

    return (
        <div className="bg-blue-950 min-h-screen flex justify-center content-center flex-wrap">
            <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="sm:w-8/12 md:w-6/12 xl:w-4/12 max-[640px]:w-full rounded-2xl bg-white"
            >
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        name: '',
                        confirmPassword: '',
                    }}
                    validationSchema={isRegister ? RegisterSchema : LoginSchema}
                    onSubmit={(values, actions) => {
                        console.log(values, actions);
                        actions.setSubmitting(false);
                    }}
                >
                    {({ errors, touched, setErrors, resetForm }) => (
                        <Form
                            className="py-4 rounded-2xl flex flex-col flex-wrap
                            content-center justify-center h-full w-full
                            shadow-md shadow-gray-600 border-b-4 border-l-4
                            border-gray-500"
                        >
                            {isRegister && (
                                <>
                                    <FormikFields
                                        value={'name'}
                                        placeholder={'name'}
                                    />
                                    {errors.name && touched.name ? (
                                        <div className="text-red-500 font-bold -mt-3 mb-3">
                                            {errors.name}
                                        </div>
                                    ) : null}
                                </>
                            )}
                            <FormikFields
                                value={'email'}
                                placeholder={'example@example.com'}
                            />
                            {errors.email && touched.email ? (
                                <div className="text-red-500 font-bold -mt-3 mb-3">
                                    {errors.email}
                                </div>
                            ) : null}
                            <FormikFields
                                value={'password'}
                                placeholder={'password'}
                                type={'password'}
                            />
                            {errors.password && touched.password ? (
                                <div className="text-red-500 font-bold -mt-3 mb-3">
                                    {errors.password}
                                </div>
                            ) : null}
                            {isRegister && (
                                <>
                                    <FormikFields
                                        value={'confirmPassword'}
                                        placeholder={'confirm password'}
                                        type={'password'}
                                    />
                                    {errors.confirmPassword &&
                                        touched.confirmPassword && (
                                            <div className="text-red-500 font-bold -mt-3 mb-3">
                                                {errors.confirmPassword}
                                            </div>
                                        )}
                                </>
                            )}
                            <div className="flex justify-around">
                                <button
                                    type="submit"
                                    className="rounded-full bg-blue-800 p-2
                                    w-5/12 text-white self-center text-xl"
                                >
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    className={`rounded-full bg-green-700 p-2 w-5/12 text-white self-center text-xl ${
                                        isRegister ? 'bg-yellow-700' : ''
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
