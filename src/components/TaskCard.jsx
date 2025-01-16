import React from 'react';

const TaskCard = ({task}) => {

    const {task_image_url, payable_amount, required_workers, task_detail, task_title} = task;

    return (
        <div className='w-[300px] h-[410px] bg-white shadow rounded-lg relative'>
            <img className='rounded-t-lg h-[200px] w-full object-fill' src={task_image_url} alt="" />
            <div className='p-4 h-[150px]'>
                <h2 className='text-xl font-semibold text-text-primary'>{task_title}</h2>
                <p className='text-text-secondary'>{task_detail}</p>
            </div>
            <div className='h-[50px] p-4 flex items-center justify-between'>
                <p className='badge text-lg bg-[#FFF4E6]'>$ {payable_amount} Coins</p>
                <button className='bg-bg-primary px-6 py-2 rounded-lg text-white'>Details</button>
            </div>
            <div className='absolute top-0 right-0 m-4 px-4 bg-[#FFF4E6] text-text-primary rounded-full shadow'>{required_workers}</div>
        </div>
    );
};

export default TaskCard;