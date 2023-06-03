import React from 'react';

interface Props {
    title: string;
    setTitle: (title: string) => void;
}

const FormTitle = ({ title, setTitle }: Props) => {
    return (
        <div className="flex justify-center">
            <div className="relative w-11/12 md:w-7/12">
                <input
                    type="text"
                    className="w-full rounded-2xl bg-gray-500 p-3
                    text-xl text-white outline-none duration-300"
                    placeholder="Title"
                    value={title}
                    maxLength={50}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <span className="absolute bottom-0 right-3 text-white">
                    {title.length}/50
                </span>
            </div>
        </div>
    );
};

export default FormTitle;
