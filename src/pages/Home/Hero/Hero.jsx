import React from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import onlineArt from '../../../assets/hero-svg/online-art.svg'
import pushNotification from '../../../assets/hero-svg/push-notifications.svg'
import transferMoney from '../../../assets/hero-svg/transfer-money.svg'
import printingInvoices from '../../../assets/hero-svg/printing-invoices.svg'

const Hero = () => {
    return (

        <Swiper
            pagination={{
                dynamicBullets: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
        >
            <SwiperSlide>
                <div className='flex items-center h-[550px]'>
                    <div className='w-1/2 p-10'>
                        <h2 className='text-text-primary text-5xl font-bold'>Earn Money, Complete Tasks, and Grow Your Earnings!</h2>
                        <p className='text-text-secondary text-xl mt-4 leading-6'>Join a thriving community of Workers and Buyers. Complete tasks, earn rewards, and take control of your financial future.</p>
                        <button className='mt-6 px-4 py-3 bg-bg-primary rounded-lg text-white'>Browse Tasks</button>
                    </div>
                    <div className='w-1/2 p-10'>
                        <img className='w-full' src={onlineArt} />
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='flex items-center h-[550px]'>
                    <div className='w-1/2 p-10'>
                        <h2 className='text-text-primary text-5xl font-bold'>Unlock New Opportunities, One Task at a Time!</h2>
                        <p className='text-text-secondary text-xl mt-4 leading-6'>Whether you're looking to complete tasks or create them, our platform offers endless opportunities to earn and grow.</p>
                        <button className='mt-6 px-4 py-3 bg-bg-primary rounded-lg text-white'>Sign Up Now</button>
                    </div>
                    <div className='w-1/2 p-10'>
                        <img className='w-full' src={pushNotification} />
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='flex items-center h-[550px]'>
                    <div className='w-1/2 p-10'>
                        <h2 className='text-text-primary text-5xl font-bold'>Maximize Your Earnings with Simple Tasks!</h2>
                        <p className='text-text-secondary text-xl mt-4 leading-6'>Earn coins by completing easy tasks and get paid faster. Start working today and watch your earnings grow!</p>
                        <button className='mt-6 px-4 py-3 bg-bg-primary rounded-lg text-white'>Start Earning</button>
                    </div>
                    <div className='w-1/2 p-10'>
                        <img className='w-full' src={printingInvoices} />
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    );
};

export default Hero;