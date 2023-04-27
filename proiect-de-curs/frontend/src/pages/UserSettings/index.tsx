import React from 'react';
import { Formik, Form } from 'formik';

import FormikFields from './FormikFields';

import { useAppSelector } from 'redux/store';
import { resetStatus } from '../../redux/slices/authSlice';

const UserSettings = () => {
    const user = useAppSelector((state) => state.auth.user);

    const handleClick = (setErrorsCallback: any, resetFormCallback: any) => {
        setErrorsCallback({});
        resetFormCallback();
    };

    return (
        <div>
            <Formik
                initialValues={{
                    firstName: user?.firstName,
                    lastName: user?.lastName,
                    email: user?.email,
                }}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {({ setErrors, resetForm }) => (
                    <Form className="flex flex-col">
                        <FormikFields
                            value={'firstname'}
                            placeholder={user?.firstName}
                        />
                        <FormikFields
                            value={'lastname'}
                            placeholder={user?.lastName}
                        />
                        <FormikFields
                            value={'email'}
                            placeholder={user?.email}
                            type={'email'}
                        />
                        <button
                            type="submit"
                            onClick={() => handleClick(setErrors, resetForm)}
                        >
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UserSettings;
