import React from 'react'

const Heading = ({ heading, text }) => {
    return (
        <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                {heading}
            </h2>
            {text ? (
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                    {text}
                </p>
            ) : null}
        </div>
    );
};

export default Heading