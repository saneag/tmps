import React from 'react';

interface IProps {
    imageUrl: string;
    alt: string;
    className: string;
    type?: string;
}

const ImageRenderer = ({ imageUrl, alt, className, type }: IProps) => {
    if (type === 'userAvatar' && imageUrl === '') {
        return (
            <span className={`material-symbols-outlined ${className}`}>
                account_circle
            </span>
        );
    }

    return (
        <>
            <img
                src={`http://localhost:5000/${imageUrl}`}
                alt={alt}
                className={className}
            />
        </>
    );
};

export default ImageRenderer;
