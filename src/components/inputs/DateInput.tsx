import React, { useRef, useState } from 'react';
import Label from './Label';

type DateInputProps = {
    id: string;
    label: string;
    value?: string; // "DD-MM-YYYY"
    onChange?: (value: string) => void;
    onBlur?: () => void;
    isRequired?: boolean;
    error?: string;
    className?: string;
    disabled?: boolean;
    readOnly?: boolean;
    description?: string;
};

type DateParts = {
    day: string;
    month: string;
    year: string;
};

function clamp(value: string, max: number): string {
    const num = parseInt(value, 10);
    if (isNaN(num)) return value;
    return String(Math.min(num, max));
}

export default function DateInput({
    id,
    label,
    value = '',
    onChange,
    onBlur,
    error,
    className = '',
    disabled = false,
    readOnly = false,
    description,
}: DateInputProps) {

    // Parse initial value "DD-MM-YYYY" → parts
    const parseValue = (val: string): DateParts => {
        const [d = '', m = '', y = ''] = val.split('-');
        return { day: d, month: m, year: y };
    };

    const [parts, setParts] = useState<DateParts>(() => parseValue(value));

    const dayRef   = useRef<HTMLInputElement>(null);
    const monthRef = useRef<HTMLInputElement>(null);
    const yearRef  = useRef<HTMLInputElement>(null);

    const emit = (next: DateParts) => {
        if (onChange) {
            const full = `${next.day}-${next.month}-${next.year}`;
            onChange(full);
        }
    };

    const handleDay = (e: React.ChangeEvent<HTMLInputElement>) => {
        let raw = e.target.value.replace(/\D/g, '').slice(0, 2);
        // Auto-clamp if user typed 2 digits
        if (raw.length === 2) raw = clamp(raw, 31);
        const next = { ...parts, day: raw };
        setParts(next);
        emit(next);
        // Auto-advance to month when 2 digits entered
        if (raw.length === 2) monthRef.current?.focus();
    };

    const handleMonth = (e: React.ChangeEvent<HTMLInputElement>) => {
        let raw = e.target.value.replace(/\D/g, '').slice(0, 2);
        if (raw.length === 2) raw = clamp(raw, 12);
        const next = { ...parts, month: raw };
        setParts(next);
        emit(next);
        if (raw.length === 2) yearRef.current?.focus();
    };

    const handleYear = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
        const next = { ...parts, year: raw };
        setParts(next);
        emit(next);
    };

    // Backspace on empty month → go back to day
    const handleMonthKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && parts.month === '') {
            dayRef.current?.focus();
        }
    };

    // Backspace on empty year → go back to month
    const handleYearKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && parts.year === '') {
            monthRef.current?.focus();
        }
    };

    const handleBlur = () => {
        // Pad day/month with leading zero on blur
        setParts(prev => {
            const padded: DateParts = {
                day:   prev.day.length   === 1 ? prev.day.padStart(2, '0')   : prev.day,
                month: prev.month.length === 1 ? prev.month.padStart(2, '0') : prev.month,
                year:  prev.year,
            };
            emit(padded);
            return padded;
        });
        if (onBlur) onBlur();
    };

    const sharedInputClass = `
        h-10 px-2.5 rounded-md border border-green outline-0 duration-300
        font-medium text-black text-center placeholder:text-black/40
        [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
        ${error    ? 'border-red'                    : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${readOnly ? 'bg-green/50'                   : ''}
    `;

    return <React.Fragment>
        <div className={`relative flex flex-col gap-1 group ${className}`}>

            <Label id={id} label={label} description={description} error={error} />

            <div id={id} className="grid grid-cols-20 items-center">

                {/* Day */}
                <input
                    ref={dayRef}
                    type="text"
                    inputMode="numeric"
                    placeholder="اليوم"
                    maxLength={2}
                    value={parts.day}
                    onChange={handleDay}
                    onBlur={handleBlur}
                    disabled={disabled}
                    readOnly={readOnly}
                    className={`${sharedInputClass} col-span-4`}
                    aria-label="Day"
                />

                <span className="flex items-center justify-center text-black/40 font-bold select-none">-</span>

                {/* Month */}
                <input
                    ref={monthRef}
                    type="text"
                    inputMode="numeric"
                    placeholder="الشهر"
                    maxLength={2}
                    value={parts.month}
                    onChange={handleMonth}
                    onKeyDown={handleMonthKeyDown}
                    onBlur={handleBlur}
                    disabled={disabled}
                    readOnly={readOnly}
                    className={`${sharedInputClass} col-span-6`}
                    aria-label="Month"
                />

                <span className="flex items-center justify-center text-black/40 font-bold select-none">-</span>

                {/* Year */}
                <input
                    ref={yearRef}
                    type="text"
                    inputMode="numeric"
                    placeholder="السنة"
                    maxLength={4}
                    value={parts.year}
                    onChange={handleYear}
                    onKeyDown={handleYearKeyDown}
                    onBlur={handleBlur}
                    disabled={disabled}
                    readOnly={readOnly}
                    className={`${sharedInputClass} col-span-8`}
                    aria-label="Year"
                />

            </div>

        </div>
    </React.Fragment>
}