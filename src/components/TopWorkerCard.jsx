import React from 'react';
import { FaBookmark, FaStar } from 'react-icons/fa6';

const TopWorkerCard = ({ topWorker }) => {
    const { name, profileImage, availableCoins, totalJobsCompleted, rating, isOnline } = topWorker;
    console.log(topWorker)
    return (
        <div className='bg-white w-64 h-72 relative shadow-lg rounded-lg flex flex-col justify-center items-center'>
            <div className={`avatar ${isOnline ? 'online':'offline'}`}>
                <div className="w-24 rounded-full">
                    <img src={profileImage} />
                </div>
            </div>
            <h2 className='text-2xl font-semibold text-text-primary mt-2'>{name}</h2>
            <p className='flex items-center text-text-secondary'><FaStar className='text-success-green'></FaStar> {rating}/5 ({totalJobsCompleted} jobs)</p>
            <div className='bg-[#FFF4E6] text-text-primary py-2.5 px-4 rounded-full shadow mt-2'>$ {availableCoins} Coins</div>
            <div className='absolute top-0 -right-1'>
                <FaBookmark className='text-4xl text-[#FF8C00]'></FaBookmark>
            </div>
        </div>
    );
};

export default TopWorkerCard;