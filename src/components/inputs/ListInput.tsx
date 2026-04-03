import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import { IoIosArrowForward } from 'react-icons/io';
import Animations from './../../animations/Animations';
import type { IconType } from 'react-icons';

type ListOption = {
    value: string | number;
    label: string;
    icon?: IconType;
};

type ListInputProps = {
    id: string;
    label?: string;
    placeholder: string;
    error?: string;
    value: string;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    options: ListOption[];
    isRequired?: boolean;
    disabled?: boolean;
};

export default function ListInput({
    id,
    label,
    placeholder,
    error,
    value,
    onChange,
    onBlur,
    options,
    isRequired = true,
    disabled = false,
}: ListInputProps) {
    
    const [hasValue, setHasValue] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setHasValue(value && value.trim() !== '' ? true : false);
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setIsFocused(false);
                if (onBlur) onBlur();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onBlur]);

    const handleInputClick = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
            setIsFocused(true);
        }
    };

    const handleOptionSelect = (optionValue: string | number) => {
        const stringValue = optionValue.toString();
        
        // Update local onChange if provided
        if (onChange) onChange(stringValue);
        
        setIsOpen(false);
        setIsFocused(false);
        if (onBlur) onBlur();
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        // Blur is handled by click outside
    };

    const selectedOption = options.find(option => option.value.toString() === value);

    return  <React.Fragment>

        <div className={`relative flex flex-col gap-0.5 group`} ref={dropdownRef}>

            {label && <label 
                className={`flex items-center gap-1.5 cursor-pointer`} 
                htmlFor={id}
                onClick={handleInputClick}
            >
                <p
                    className={`
                        ${hasValue 
                            ? 'text-[var(--blue-color)]' 
                            : (isFocused ? 'text-[var(--blue-color)]' : 'text-[var(--secondary-color)]')
                        } 
                        duration-300 group-focus-within:text-[var(--blue-color)] text-base font-medium
                    `}
                >
                    {label}
                </p>
                {isRequired && <p className='text-sm text-[var(--red-color)]'>*</p>}
            </label>}

            <div className="relative">

                <div 
                    ref={inputRef}
                    className={`
                        relative p-2.5 pr-10.5 rounded-md border 
                        ${hasValue 
                            ? 'border-[var(--blue-color)]' 
                            : (isFocused ? 'border-[var(--blue-color)]' : 'border-[var(--gray-color)]')
                        } 
                        outline-0 duration-300 focus:border-[var(--blue-color)] text-base font-medium text-[var(--secondary-color)]
                        ${disabled ? 'border-[var(--gray-color)]/80 cursor-not-allowed ' : 'cursor-pointer'}
                        flex items-center text-sm text-[var(--blue-color)]
                        ${error ? 'border-[var(--red-color)]' : ''}
                    `}
                    onClick={handleInputClick}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    tabIndex={disabled ? -1 : 0}
                >
                    <span className={`
                        ${selectedOption ? 'text-[var(--black-color)]' : 'text-[var(--dark-blue-opacity-color)] opacity-50'}
                    `}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                </div>

                {/* Chevron Icon */}
                <div 
                    onClick={handleInputClick}
                    className={`
                        absolute right-2.5
                        top-1/2 -translate-y-1/2 text-lg flex items-center duration-300
                        ${hasValue ? 
                            'text-[var(--blue-color)]' : (isFocused ? 'text-[var(--blue-color)]' : 'text-[var(--secondary-color)]/50')
                        } 
                        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                    `}
                >
                    <motion.div
                        animate={{ 
                            rotate: isOpen ? 90 : 0,
                            color: isHovered && !disabled ? 'var(--blue-color)' : undefined
                        }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                        <IoIosArrowForward />
                    </motion.div>
                </div>

            </div>

            {/* Dropdown Options */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={Animations.dropdownAnimation}
                        initial='hidden' 
                        animate='visible' 
                        exit='exit'
                        className={`
                            absolute top-full left-0 right-0 shrink-0 mt-1 bg-[var(--white-color)] border border-[var(--gray-color)] 
                            rounded-md shadow-lg z-30 max-h-60 overflow-y-auto overflow-x-hidden scrollbar-hide
                        `}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {options.map((option, index) => (
                            <motion.div
                                key={option.value}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ 
                                    delay: 0.1 + (index * 0.07), 
                                    duration: 0.2 
                                }}
                                className={`
                                    relative w-full p-2.5 cursor-pointer text-base font-medium text-[var(--secondary-color)] !opacity-80
                                    border-b border-[var(--gray-color)] flex items-center gap-2.5
                                    transition-colors duration-300 last:border-b-0 whitespace-nowrap
                                    before:content-[""] before:absolute before:inset-0 before:z-[-1]
                                    before:bg-gradient-to-tl before:transition-opacity before:duration-300
                                    before:from-[var(--blue-color)] before:to-[var(--green-color)]
                                    ${option.value.toString() === value 
                                        ? 'text-[var(--white-color)] before:opacity-100 !opacity-100' 
                                        : 'hover:text-[var(--white-color)] hover:before:opacity-100 before:opacity-0 hover:!opacity-100'
                                    }
                                `}
                                onClick={() => handleOptionSelect(option.value)}
                            >
                                {option.icon && <option.icon className={'text-xl shrink-0'} />}
                                <p>{option.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

        </div>

        {error && <p className='text-xs text-[var(--red-color)]'>{error}</p>}

    </React.Fragment>

}