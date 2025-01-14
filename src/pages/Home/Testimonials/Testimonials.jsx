import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import SectionTitle from "../../../components/SectionTitle";
import { FaStar } from "react-icons/fa";

const Testimonials = () => {

    const testimonials = [
        {
            name: "John Doe",
            photo: "https://images.unsplash.com/photo-1595347097560-69238724e7bd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fG1hbnxlbnwwfHwwfHx8Mg%3D%3D",
            quote: "This platform has greatly helped me improve my productivity. Highly recommend it!",
            rating: 5,
        },
        {
            name: "Jane Smith",
            photo: "https://images.unsplash.com/photo-1532170579297-281918c8ae72?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzd8fHBvcnRyYWl0fGVufDB8fDB8fHwy",
            quote: "I love how easy it is to find tasks. The interface is smooth and user-friendly.",
            rating: 4,
        },
        {
            name: "David Lee",
            photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8fDI%3D",
            quote: "Great place to earn some extra income. I’ve been using it for months and it’s amazing!",
            rating: 4,
        },
        {
            name: "Emily Wang",
            photo: "https://images.unsplash.com/photo-1512310604669-443f26c35f52?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fHBvcnRyYWl0fGVufDB8fDB8fHwy",
            quote: "The tasks are interesting and rewarding. Definitely a fantastic platform to join!",
            rating: 5,
        },
        {
            name: "Sophia Green",
            photo: "https://img.freepik.com/free-photo/portrait-person-attending-vibrant-techno-music-party_23-2150551579.jpg?uid=R182943406&ga=GA1.1.1156946936.1732189185&semt=ais_tags_boosted",
            quote: "The customer service is top-notch, and I’m always getting the help I need.",
            rating: 4,
        },
        {
            name: "Olivia Davis",
            photo: "https://img.freepik.com/premium-photo/beautiful-brunette-young-woman-glasses-green-pants_85369-1253.jpg?uid=R182943406&ga=GA1.1.1156946936.1732189185&semt=ais_tags_boosted",
            quote: "The rewards are worth the effort. Keep up the great work!",
            rating: 5,
        },
        {
            name: "Noah Miller",
            photo: "https://img.freepik.com/free-photo/young-blonde-woman-with-denim-shirt_273609-5810.jpg?uid=R182943406&ga=GA1.1.1156946936.1732189185&semt=ais_tags_boosted",
            quote: "A game-changer for earning passive income. This platform has changed my life!",
            rating: 5,
        },
    ];

    return (
        <div>
            <SectionTitle heading={'What Our Users Say'} subHeading={'Hear from our satisfied users'} />
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'3'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
            >
                {
                    testimonials.map((testimonial, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="p-6 bg-white rounded-lg shadow-lg text-center">
                                <img className="w-24 h-24 rounded-full mx-auto" src={testimonial.photo} alt={testimonial.name} />
                                <h3 className="mt-4 text-xl font-semibold text-gray-800">{testimonial.name}</h3>
                                <div className="flex justify-center mt-2">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className={`text-yellow-400 ${i < testimonial.rating ? 'fill-current' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-600 mt-4">"{testimonial.quote}"</p>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
};

export default Testimonials;
