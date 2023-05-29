import React from 'react';

interface Props {
    title: string;
    setTitle: (title: string) => void;
}

const FormTitle = ({ title, setTitle }: Props) => {
    return (
        <div className="flex justify-center">
            <input
                type="text"
                className="w-11/12 rounded-2xl bg-gray-500 p-3
                            text-xl text-white outline-none duration-300 md:w-7/12"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
        </div>
    );
};

export default FormTitle;
