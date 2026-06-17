import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import RatingStars from './RatingStars';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const TestimonialCarousel = ({ testimonials }) => {
  if (!testimonials.length) {
    return (
      <div className="text-center text-gray-400 py-12">
        No reviews yet. Be the first to review!
      </div>
    );
  }

  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={30}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className="testimonial-slider pb-12"
    >
      {testimonials.map((testimonial, index) => (
        <SwiperSlide key={testimonial._id}>
          <div className="glass-card p-6 h-full" data-aos="fade-up" data-aos-delay={index * 100}>
            <div className="flex items-center gap-4 mb-4">
              {testimonial.photo ? (
                <img
                  src={testimonial.photo}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-xl font-bold">
                  {testimonial.name.charAt(0)}
                </div>
              )}
              <div>
                <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                <RatingStars rating={testimonial.rating} />
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">"{testimonial.review}"</p>
            <p className="text-gray-500 text-sm mt-4">
              {new Date(testimonial.createdAt).toLocaleDateString()}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TestimonialCarousel;