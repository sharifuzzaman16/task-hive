import React from 'react';
import SectionTitle from '../../../components/SectionTitle';
import TopWorkerCard from '../../../components/TopWorkerCard';

const topWorkers = [
    {
      name: "John Doe",
      profileImage: "https://images.unsplash.com/photo-1595347097560-69238724e7bd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fG1hbnxlbnwwfHwwfHx8Mg%3D%3D",
      availableCoins: 1500,
      totalJobsCompleted: 50,
      rating: 4.8,
      isOnline: true
    },
    {
      name: "Jane Smith",
      profileImage: "https://images.unsplash.com/photo-1532170579297-281918c8ae72?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzd8fHBvcnRyYWl0fGVufDB8fDB8fHwy",
      availableCoins: 1400,
      totalJobsCompleted: 48,
      rating: 4.7,
      isOnline: true
    },
    {
      name: "Michael Lee",
      profileImage: "https://images.unsplash.com/photo-1583071299210-c6c113f4ac91?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fG1hbnxlbnwwfHwwfHx8Mg%3D%3D",
      availableCoins: 1300,
      totalJobsCompleted: 45,
      rating: 4.6,
      isOnline: true
    },
    {
      name: "Sarah Brown",
      profileImage: "https://images.unsplash.com/photo-1512310604669-443f26c35f52?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fHBvcnRyYWl0fGVufDB8fDB8fHwy",
      availableCoins: 1200,
      totalJobsCompleted: 40,
      rating: 4.5,
      isOnline: false
    },
    {
      name: "David Wilson",
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8fDI%3D",
      availableCoins: 1100,
      totalJobsCompleted: 38,
      rating: 4.4,
      isOnline: true
    },
    {
      name: "Emily Johnson",
      profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8fDI%3D",
      availableCoins: 1000,
      totalJobsCompleted: 35,
      rating: 4.3,
      isOnline: false
    },
    {
      name: "Alice Johnson",
      profileImage: "https://images.unsplash.com/photo-1568038479111-87bf80659645?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBvcnRyYWl0fGVufDB8fDB8fHww",
      availableCoins: 200,
      totalJobsCompleted: 50,
      rating: 4.9,
      isOnline: true
    },
    {
      name: "David Smith",
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
      availableCoins: 150,
      totalJobsCompleted: 45,
      rating: 4.7,
      isOnline: false
    }
  ];
  
  

const TopWorkers = () => {
    return (
        <div>
            <SectionTitle heading={'Best Workers'} subHeading={'Meet Some of Our Top Performers'}></SectionTitle>
            <div className='grid grid-cols-4 gap-10 justify-items-center'>
                {
                    topWorkers.map((topWorker, idx) => <TopWorkerCard key={idx} topWorker={topWorker}></TopWorkerCard>)
                }
            </div>
        </div>
    );
};

export default TopWorkers;