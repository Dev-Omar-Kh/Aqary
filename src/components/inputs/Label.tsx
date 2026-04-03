import React from 'react'

export type LabelProps = {
    id: string;
    label: string;
    description?: string;
}

export default function Label({ id, label, description }: LabelProps) {

    return <React.Fragment>
    {id !== '' 
        ?<label htmlFor={id}>
            <p className='text-base font-medium text-black'>{label}</p>
            {description && <p className='text-sm text-black opacity-80'>{description}</p>}
        </label>
        :<div>
            <p className='text-base font-medium text-black'>{label}</p>
            {description && <p className='text-sm text-black opacity-80'>{description}</p>}
        </div>
    }

    </React.Fragment>

}
