import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TextareaInputProps } from '../../types/propsTypes';
import LoadingInput from './LoadingInput';
import ErrorField from './ErrorField';
import Label from './Label';

// Animation variants
const opacityAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
};

export default function TextareaInput({
    id,
    label,
    placeholder = '',
    value = '',
    onChange,
    onBlur,
    description,
    error,
    className = '',
    disabled = false,
    maxLength,
    minLength,
    readOnly = false,
    rows = 4,
    cols,
}: TextareaInputProps) {

    const [hasValue, setHasValue] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        setHasValue(value && value.trim() !== '' ? true : false);
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setHasValue(e.target.value.trim() !== '');
        if (onChange) onChange(e);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setIsFocused(false);
        if (onBlur) onBlur(e);
    };

    return <React.Fragment>

        <div className={`relative flex flex-col gap-0.5 group ${className}`}>

            <Label id={id} label={label} description={description} />

            <textarea 
                id={id}
                placeholder={placeholder}
                rows={rows}
                cols={cols}
                className={`
                    w-full px-2.5 py-2.5 rounded-md border min-h-28 max-h-40 overflow-y-auto scrollbar-hide
                    ${hasValue ? 'border-[var(--blue-color)]' : 'border-[var(--gray-color)]'} 
                    placeholder:text-[var(--secondary-color)]/40
                    outline-0 duration-300 focus:border-[var(--blue-color)] font-medium text-[var(--secondary-color)]
                    ${error ? 'border-[var(--red-color)]' : ''}
                    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                    resize-none pe-12
                `}
                value={value}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                disabled={disabled}
                readOnly={readOnly}
                maxLength={maxLength}
                minLength={minLength}
            />

            {/* Loading animation on focus */}
            <AnimatePresence>
                {(isFocused || hasValue) && (
                    <motion.div 
                        variants={opacityAnimation} 
                        initial="hidden" 
                        animate="visible" 
                        exit="exit"
                        className="absolute bottom-2.5 right-2.5"
                    >
                        <LoadingInput />
                    </motion.div>
                )}
            </AnimatePresence>

        </div>

        {error && <ErrorField error={error} />}

    </React.Fragment>

}
