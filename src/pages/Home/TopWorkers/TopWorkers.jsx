import React from 'react';
import SectionTitle from '../../../components/SectionTitle';
import TopWorkerCard from '../../../components/TopWorkerCard';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';




const TopWorkers = () => {

  const axiosPublic = useAxiosPublic();

  const { data: topWorkers = [] } = useQuery({
    queryKey: ["topWorkers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/top-workers");
      return res.data;
    },
  });

  return (
    <div>
      <SectionTitle heading={'Best Workers'} subHeading={'Meet Some of Our Top Performers'}></SectionTitle>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center'>
        {
          topWorkers.map((topWorker, idx) => <TopWorkerCard key={idx} topWorker={topWorker}></TopWorkerCard>)
        }
      </div>
    </div>
  );
};

export default TopWorkers;