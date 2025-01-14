import React from 'react';
import CountUp from 'react-countup';
import SectionTitle from '../../../components/SectionTitle';
import { FaTasks } from 'react-icons/fa';
import { FaCoins, FaMoneyBillWave, FaUsers } from 'react-icons/fa6';

const PlatformStats = () => {
    return (
        <div className="w-11/12 mx-auto text-center">
            <SectionTitle heading={'Platform Statistics'} subHeading={'See our platform’s growth in numbers'}></SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-10">
                {[
                    { label: "Total Tasks", count: 15200, icon: <FaTasks /> },
                    { label: "Active Users", count: 4500, icon: <FaUsers /> },
                    { label: "Coins Earned", count: 32500, icon: <FaCoins /> },
                    { label: "Payouts Processed", count: 12400, icon: <FaMoneyBillWave /> },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col justify-center items-center">
                        <h3 className="text-4xl font-bold text-bg-primary">
                            <CountUp end={stat.count} duration={3} />
                        </h3>
                        <p className="text-gray-600">{stat.label}</p>
                        <div className="text-bg-primary text-5xl mt-2">{stat.icon}</div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default PlatformStats;