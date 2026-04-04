import React from 'react'
import ErrorField from './ErrorField';

export type LabelProps = {
    id: string;
    label: string;
    description?: string;
    error?: string;
}

export default function Label({ id, label, description, error }: LabelProps) {

    return <React.Fragment>
    {id !== '' 
        ?<label className='flex items-end justify-between max-[800px]:flex-col max-[800px]:items-start' htmlFor={id}>
            <div>
                <p className='text-base font-medium text-black'>{label}</p>
                {description && <p className='text-sm text-black opacity-80'>{description}</p>}
            </div>
            {error && <ErrorField error={error} />}
        </label>
        :<div className='flex items-end justify-between max-[800px]:flex-col max-[800px]:items-start'>
            <div>
                <p className='text-base font-medium text-black'>{label}</p>
                {description && <p className='text-sm text-black opacity-80'>{description}</p>}
            </div>
            {error && <ErrorField error={error} />}
        </div>
    }

    </React.Fragment>

}
