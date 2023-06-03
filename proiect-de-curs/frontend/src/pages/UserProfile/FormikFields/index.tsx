import React from 'react';
import { ErrorMessage, Field } from 'formik';

import { IFormikFieldsProps } from 'shared/interfaces/IFormikFieldsProps';

export const FormikFields = ({ value, type, disabled }: IFormikFieldsProps) => {
    return (
        <div className="flex flex-col">
            <label htmlFor={value} className="capitalize">
                {value.toLowerCase()}
            </label>
            <Field
                id={value}
                name={value}
                type={type || 'text'}
                className={`mb-4 w-80 rounded-md border-2 bg-white p-3 text-xl text-black outline-none 
                duration-300 md:w-72 ${disabled && 'cursor-default'}`}
                disabled={disabled}
            />
            <ErrorMessage
                name={value}
                component="div"
                className="-mt-3 mb-3 font-bold text-red-500"
            />
        </div>
    );
};

export const FormikTextArea = ({ value, placeholder, disabled }: any) => {
    return (
        <div className="flex flex-col">
            <label htmlFor={value} className="capitalize">
                {value}
            </label>
            <div className="relative">
                <Field
                    as="textarea"
                    id={value}
                    name={value}
                    placeholder={placeholder}
                    className={`mb-4 min-h-[200px] w-80 resize-none rounded-md border-2
              bg-white p-3 text-xl text-black outline-none duration-300 ${
                  disabled && 'cursor-default'
              }
            `}
                    disabled={disabled}
                />
                {!disabled && (
                    <span className="absolute bottom-0 right-2">
                        <span
                            className={`${
                                placeholder.length > 300 &&
                                'font-bold text-red-500'
                            }`}
                        >
                            {placeholder.length}
                        </span>
                        /300
                    </span>
                )}
            </div>
            <ErrorMessage
                name={value}
                component="div"
                className="-mt-3 mb-3 font-bold text-red-500"
            />
        </div>
    );
};
