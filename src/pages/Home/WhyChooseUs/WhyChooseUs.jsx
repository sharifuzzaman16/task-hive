import React from 'react';
import SectionTitle from '../../../components/SectionTitle';
import whyChooseUs from '../../../assets/why-choose-us.svg'

const WhyChooseUs = () => {
    return (

        <div className='w-11/12 mx-auto'>
            <SectionTitle heading={'Why Choose Us'} subHeading={'Experience the best micro-tasking platform'}></SectionTitle>
            <div className="flex flex-col md:flex-row gap-20 items-center">
                <div className="w-full md:w-1/2">
                    <img
                        src={whyChooseUs}
                        alt="Why Choose Us"
                    />
                </div>
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h2 className="text-3xl font-bold text-gray-800">Why Choose Us</h2>
                    <p className="text-gray-600 mt-4">Experience the best micro-tasking platform</p>
                    <ul className="mt-6 space-y-4">
                        {[
                            { icon: "⚡", text: "Fast Payments: Earn quickly and securely" },
                            { icon: "🔒", text: "Secure Transactions: Your data is safe with us" },
                            { icon: "🌐", text: "Diverse Opportunities: Tasks for everyone" },
                            { icon: "📱", text: "Responsive Design: Work on any device" },
                        ].map((feature, idx) => (
                            <li key={idx} className="flex items-center">
                                <span className="text-2xl text-green-500">{feature.icon}</span>
                                <p className="ml-4 text-gray-600">{feature.text}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    );
};

export default WhyChooseUs;