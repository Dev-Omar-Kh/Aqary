import React from 'react';
import type { ErrorFieldProps } from '../../types/propsTypes'

export default function ErrorField({ error }: ErrorFieldProps) {

    return <React.Fragment>

        <div className="mt-3 p-3 bg-[var(--red-color)]/10 border border-[var(--red-color)] rounded-md duration-300">
            <p className="text-sm text-[var(--red-color)]">{error}</p>
        </div>

    </React.Fragment>

}
