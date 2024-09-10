import { useRouter } from 'next/navigation';
import React, { useState, ChangeEvent } from 'react'

interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
    bg: String;
    width: String;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, bg, width }) => {
    const router = useRouter();

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        router.push('/')
        const value = e.target.value;
        onSearch(value);
    };

    return (
        <label className={`input input-bordered flex items-center gap-2 ${width} ${bg}`}>
            <input
                type="text"
                className="grow"
                placeholder="Search"
                onChange={handleSearch}
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd" />
            </svg>
        </label>
    )
}

export default SearchBar