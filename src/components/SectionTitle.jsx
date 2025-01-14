import React from 'react';

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className='w-2/5 text-center mx-auto my-20'>
            <p className='italic text-bg-primary'>--- {subHeading} ---</p>
            <h1 className='text-4xl font-bold text-text-primary mt-2'>{heading}</h1>
            <div className="divider"></div>
        </div>
    );
};

export default SectionTitle;