import React from 'react';
import { ErrorMessage, Field } from 'formik';

import { IFormikFieldsProps } from 'shared/interfaces/IFormikFieldsProps';

const FormikFields = ({ value, placeholder, type }: IFormikFieldsProps) => {
    return (
        <>
            <label htmlFor={value} className="capitalize">
                {value}
            </label>
            <Field
                id={value}
                name={value}
                type={type || 'text'}
                value={placeholder}
                className=""
            />
            <ErrorMessage name={value} component="div" className="" />
        </>
    );
};

export default FormikFields;
