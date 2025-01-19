import React from 'react';
import SectionTitle from '../../../components/SectionTitle';

const HowItWorks = () => {
    return (

        <div className="text-center">
            <SectionTitle heading={'How It Works'} subHeading={'Get started in 4 easy steps'}></SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {[
                    { icon: "📝", title: "Register", description: "Sign up as a Worker or Buyer" },
                    { icon: "🔍", title: "Explore Tasks", description: "Browse tasks or create your own" },
                    { icon: "✅", title: "Submit or Approve", description: "Submit work or review tasks" },
                    { icon: "💵", title: "Earn Rewards", description: "Get paid securely and instantly" },
                ].map((step, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
                        <div className="text-5xl">{step.icon}</div>
                        <h3 className="text-xl font-semibold mt-4">{step.title}</h3>
                        <p className="text-gray-600 mt-2">{step.description}</p>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default HowItWorks;