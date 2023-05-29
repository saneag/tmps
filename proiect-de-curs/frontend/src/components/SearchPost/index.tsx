import React from 'react';
import debounce from 'lodash.debounce';

interface ISearchPost {
    search: string;
    setSearch: (search: string) => void;
}

const SearchPost = ({ search, setSearch }: ISearchPost) => {
    const [inputValue, setInputValue] = React.useState('');
    const inputRef = React.useRef<HTMLInputElement>(null);

    const updateSearch = React.useCallback(
        debounce((value: string) => {
            setSearch(value);
        }, 400),
        []
    );

    const handleInputChange = (e: any) => {
        setInputValue(e.target.value);
        updateSearch(e.target.value);
    };

    const handleClearSearch = () => {
        setSearch('');
        setInputValue('');
        inputRef.current?.focus();
    };

    return (
        <div className="relative w-60 md:w-80">
            <input
                placeholder="Search..."
                value={inputValue}
                onChange={handleInputChange}
                className="w-full rounded-md border-2 bg-white px-3 py-2 text-xl
                text-black outline-none transition-all duration-300
                focus:border-blue-500"
                maxLength={50}
                ref={inputRef}
            />
            {inputValue && (
                <span
                    className="material-symbols-outlined absolute right-2
                    top-3 cursor-pointer"
                    onClick={handleClearSearch}
                >
                    close
                </span>
            )}
        </div>
    );
};

export default SearchPost;
