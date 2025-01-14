import React from 'react';
import SectionTitle from '../../../components/SectionTitle';
import TaskCard from '../../../components/TaskCard';

const FeaturedWorks = () => {

    const tasks = [
        {
            task_title: "Watch My YouTube Video and Leave a Comment",
            task_detail: "Watch the full video on my YouTube channel and leave a relevant comment about the content.",
            required_workers: 150,
            payable_amount: 5,
            completion_date: "2025-02-15",
            submission_info: "Screenshot of the comment posted",
            task_image_url: "https://img.freepik.com/free-photo/young-online-customer-black-friday-promotions_23-2148313167.jpg?ga=GA1.1.1156946936.1732189185&semt=ais_tags_boosted"
        },
        {
            task_title: "Share My Instagram Post and Tag Friends",
            task_detail: "Share my latest Instagram post and tag at least 3 friends in the post.",
            required_workers: 200,
            payable_amount: 3,
            completion_date: "2025-02-20",
            submission_info: "Screenshot of the shared post with tagged friends",
            task_image_url: "https://img.freepik.com/premium-photo/popularity-social-media-smiling-wavyhaired-woman-tshirt-holding-network-heart-like-icon-showing-camera-smart-phone-with-blank-screen-indoor-studio-shot-isolated-gray-background_416530-14973.jpg?ga=GA1.1.1156946936.1732189185&semt=ais_tags_boosted"
        },
        {
            task_title: "Complete a Survey and Submit Your Feedback",
            task_detail: "Complete the customer feedback survey and provide a detailed review of your experience.",
            required_workers: 100,
            payable_amount: 7,
            completion_date: "2025-02-25",
            submission_info: "Screenshot of completed survey submission",
            task_image_url: "https://img.freepik.com/premium-photo/online-survey-form-modish-digital-information-collection_31965-323891.jpg?ga=GA1.1.1156946936.1732189185&semt=ais_tags_boosted"
        },
        {
            task_title: "Sign Up for My Newsletter and Share",
            task_detail: "Sign up for my newsletter and share the sign-up link with your friends.",
            required_workers: 50,
            payable_amount: 10,
            completion_date: "2025-03-01",
            submission_info: "Screenshot of the sign-up confirmation and shared link",
            task_image_url: "https://img.freepik.com/premium-photo/cropped-hand-men-using-technology-table_1048944-13988622.jpg?ga=GA1.1.1156946936.1732189185&semt=ais_tags_boosted"
        },
        {
            task_title: "Install My App and Give a Rating",
            task_detail: "Download and install my mobile app, then provide a rating of 4 stars or higher in the app store.",
            required_workers: 300,
            payable_amount: 4,
            completion_date: "2025-03-10",
            submission_info: "Screenshot of the app store rating",
            task_image_url: "https://img.freepik.com/free-photo/customer-experience-creative-collage_23-2149371200.jpg?ga=GA1.1.1156946936.1732189185&semt=ais_tags_boosted"
        },
        {
            task_title: "Like and Share My Facebook Post",
            task_detail: "Like my latest Facebook post and share it to your timeline with a comment.",
            required_workers: 250,
            payable_amount: 6,
            completion_date: "2025-03-05",
            submission_info: "Screenshot of the like and shared post",
            task_image_url: "https://img.freepik.com/free-photo/young-girl-holding-sign-point-it-aside-high-quality-photo_144627-74479.jpg?ga=GA1.1.1156946936.1732189185&semt=ais_tags_boosted"
        }
    ];


    return (
        <div>
            <SectionTitle heading={'Featured Tasks'} subHeading={'Highlighted Ongoing Tasks'}></SectionTitle>
            <div className='grid grid-cols-3 gap-10 justify-items-center'>
            {
                tasks.map((task, idx) => <TaskCard key={idx} task={task}></TaskCard>)
            }
            </div>
        </div>
    );
};

export default FeaturedWorks;