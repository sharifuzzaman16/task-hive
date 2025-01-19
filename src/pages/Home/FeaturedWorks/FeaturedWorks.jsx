import React from 'react';
import SectionTitle from '../../../components/SectionTitle';
import TaskCard from '../../../components/TaskCard';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const FeaturedWorks = () => {

    const axiosPublic = useAxiosPublic();

    const { data: featuredTasks = [] } = useQuery({
        queryKey: ["featuredTasks"],
        queryFn: async () => {
            const res = await axiosPublic.get("/featured-tasks");
            return res.data;
        },
    });


    return (
        <div>
            <SectionTitle heading={'Featured Tasks'} subHeading={'Highlighted Ongoing Tasks'}></SectionTitle>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center'>
                {
                    featuredTasks.map((task, idx) => <TaskCard key={idx} task={task}></TaskCard>)
                }
            </div>
        </div>
    );
};

export default FeaturedWorks;