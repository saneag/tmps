import { Field } from 'formik';
import React from 'react';

import { IFormikFieldsProps } from 'shared/interfaces/IFormikFieldsProps';

const FormikFields = ({ value, placeholder, type }: IFormikFieldsProps) => {
    return (
        <>
            <label
                htmlFor={value}
                className="text-md max-[640px]:text-sm font-medium text-gray-400 capitalize"
            >
                {value}
            </label>
            <Field
                id={value}
                name={value}
                placeholder={placeholder}
                type={type || 'text'}
                className="bg-cyan-900 rounded-md p-3 mb-4 text-white w-9/12
                outline-none shadow-md shadow-cyan-700/50 hover:shadow-cyan-700/100
                focus:shadow-cyan-700/100 duration-300 text-xl"
            />
        </>
    );
};

export default FormikFields;
