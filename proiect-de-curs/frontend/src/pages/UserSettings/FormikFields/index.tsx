import React from 'react';
import { ErrorMessage, Field } from 'formik';

import { IFormikFieldsProps } from 'shared/interfaces/IFormikFieldsProps';

export const FormikFields = ({ value, type, disabled }: IFormikFieldsProps) => {
    return (
        <>
            <label htmlFor={value} className="capitalize">
                {value.toLowerCase()}
            </label>
            <Field
                id={value}
                name={value}
                type={type || 'text'}
                className={`mb-4 rounded-md border-2 bg-white p-3 text-xl text-black 
                outline-none duration-300 ${disabled && 'cursor-default'}`}
                disabled={disabled}
            />
            <ErrorMessage
                name={value}
                component="div"
                className="-mt-3 mb-3 font-bold text-red-500"
            />
        </>
    );
};

export const FormikTextArea = ({ value, placeholder, disabled }: any) => {
    return (
        <>
            <label htmlFor={value} className="capitalize">
                {value}
            </label>
            <Field
                as="textarea"
                id={value}
                name={value}
                placeholder={placeholder}
                className={`mb-4 w-72 resize-none rounded-md border-2 bg-white
                p-3 text-xl text-black outline-none duration-300 ${
                    disabled && 'cursor-default'
                }`}
                disabled={disabled}
            />
            <ErrorMessage
                name={value}
                component="div"
                className="-mt-3 mb-3 font-bold text-red-500"
            />
        </>
    );
};
