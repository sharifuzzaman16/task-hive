import React from 'react';
import SectionTitle from '../../../components/SectionTitle';

const Faqs = () => {

    const faqs = [
        {
            question: "What is this platform about?",
            answer: "Our platform connects users with exciting tasks, rewards them with coins, and offers hassle-free payouts for completed activities."
        },
        {
            question: "Who can join the platform?",
            answer: "Anyone who is at least 18 years old and interested in earning rewards can join."
        },
        {
            question: "How do I start completing tasks?",
            answer: "Once you sign up, visit the 'Tasks' section to explore available opportunities and start earning coins."
        },
        {
            question: "What types of tasks are available?",
            answer: "Tasks range from surveys and app testing to creative challenges and community contributions."
        },
        {
            question: "How do I earn coins?",
            answer: "Coins are earned by completing tasks on the platform. Each task specifies the number of coins you can earn upon successful completion."
        },
        {
            question: "How do I request a payout?",
            answer: "Navigate to the 'Payouts' section in your dashboard, select the amount you want to withdraw, and provide the necessary payment details."
        },
        {
            question: "What payment methods are supported?",
            answer: "We currently support PayPal, bank transfers, and several other popular payment gateways."
        },
        {
            question: "How long does it take to process payouts?",
            answer: "Payouts are processed within 3–5 business days."
        },
        {
            question: "How can I contact support?",
            answer: "You can reach out to our support team via the 'Contact Us' page or by emailing support@[yourplatform].com."
        },
        {
            question: "Can I delete my account?",
            answer: "Yes, you can request account deletion by contacting support through the 'Help Center' or emailing us directly."
        }
    ];


    return (
        <div>
            <SectionTitle heading={'Frequently Asked Questions'} subHeading={'Quick answers to common questions.'}></SectionTitle>
            <div className="join join-vertical w-full">
                {
                    faqs.map((faq, idx) => <div key={idx} className="collapse collapse-arrow join-item border-base-300 border">
                        <input type="radio" name="my-accordion-4" defaultChecked />
                        <div className="collapse-title text-xl font-medium">{faq.question}</div>
                        <div className="collapse-content">
                            <p>{faq.answer}</p>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Faqs;