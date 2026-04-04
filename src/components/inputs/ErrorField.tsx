import React from 'react';

export type ErrorFieldProps = {
    error: string;
}

export default function ErrorField({ error }: ErrorFieldProps) {

    return <React.Fragment>

        <div className="duration-300">
            <p className="text-xs text-red">* {error} *</p>
        </div>

    </React.Fragment>

}
