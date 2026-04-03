import React from 'react';
import type { RadioInputProps } from '../../types/propsTypes';
import Label from './Label';
import ErrorField from './ErrorField';

export default function RadioInput({ label, description, name, options, classNameOptions, value, onChange, extraOptions, error }: RadioInputProps) {

    return <React.Fragment>

        <div className='space-y-2.5'>

            <Label id={''} label={label} description={description} />

            <div className={`${classNameOptions} mt-2.5`}>
                {options.map((option, idx) => (
                    <div key={idx}>
                        <input type="radio" id={option.id} name={name} className='hidden' checked={value === option.value} onChange={() => onChange?.(option.value)} />
                        <label htmlFor={option.id}>
                            {option.label}
                        </label>
                    </div>
                ))}
                {extraOptions?.map((option, idx) => (
                    <div key={idx}>
                        {option.label}
                    </div>
                ))}
            </div>

            {error && <ErrorField error={error} />}

        </div>

    </React.Fragment>

}
