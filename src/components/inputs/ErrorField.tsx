import React from 'react';

export type ErrorFieldProps = {
    error: string;
}

export default function ErrorField({ error }: ErrorFieldProps) {

    return <React.Fragment>

        <div className="mt-3 p-3 bg-red/10 border border-red rounded-md duration-300">
            <p className="text-sm text-red">{error}</p>
        </div>

    </React.Fragment>

}
