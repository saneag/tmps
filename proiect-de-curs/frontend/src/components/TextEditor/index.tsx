import React from 'react';

interface Props {
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
}

interface ButtonProps {
    buttonType: string;
}

const TextEditor = ({ children, disabled, className }: Props) => {
    const buttons = [
        'format_bold',
        'format_italic',
        'format_underlined',
        'format_strikethrough',
        'format_quote',
        'border_color',
        'superscript',
        'subscript',
    ];

    return (
        <div className={className}>
            <div
                className={`mb-1 flex w-full items-center justify-evenly rounded-2xl bg-gray-300 p-0.5 ${
                    disabled ? 'hidden' : ''
                }`}
            >
                {buttons.map((buttonType) => (
                    <TextEditorButton
                        key={buttonType}
                        buttonType={buttonType}
                    />
                ))}
            </div>
            {children}
        </div>
    );
};

const TextEditorButton = ({ buttonType }: ButtonProps) => {
    return (
        <button className="flex p-1" type="button">
            <span className="material-symbols-outlined">{buttonType}</span>
        </button>
    );
};

export default TextEditor;
