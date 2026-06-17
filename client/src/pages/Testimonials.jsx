import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get('/api/testimonials/approved');
      setTestimonials(res.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await axios.post('/api/testimonials', { ...data, rating });
      toast.success('Review submitted! Waiting for admin approval.');
      reset();
      setRating(5);
    } catch (error) {
      toast.error('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <section style={{ paddingTop: '7rem', paddingBottom: '4rem' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="section-title">What People <span>Say</span></h1>
          <p className="section-subtitle">Read what others think about my work</p>
        </motion.div>

        {/* Testimonials Stats */}
        {testimonials.length > 0 && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              display: 'flex',
              gap: '2rem',
              justifyContent: 'center',
              marginBottom: '3rem',
              flexWrap: 'wrap'
            }}
          >
            <div className="glass-card" style={{ padding: '1rem 2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                {testimonials.length}
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Total Reviews</div>
            </div>
            <div className="glass-card" style={{ padding: '1rem 2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent)' }}>
                {(testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length || 0).toFixed(1)}
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Average Rating ⭐</div>
            </div>
          </motion.div>
        )}

        {/* Testimonials Carousel */}
        {testimonials.length > 0 ? (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ marginBottom: '4rem' }}
          >
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
              navigation
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              style={{ paddingBottom: '3rem' }}
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial._id}>
                  <div className="glass-card" style={{ padding: '1.5rem', height: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                      {testimonial.photo ? (
                        <img
                          src={testimonial.photo}
                          alt={testimonial.name}
                          style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                      ) : (
                        <div style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: '50%',
                          background: 'var(--gradient-1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.5rem',
                          fontWeight: 'bold'
                        }}>
                          {testimonial.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h4 style={{ fontWeight: 'bold', fontSize: '1rem' }}>{testimonial.name}</h4>
                        <div style={{ display: 'flex', gap: '0.15rem' }}>
                          {[...Array(5)].map((_, i) => (
                            <span key={i} style={{ color: i < testimonial.rating ? '#fbbf24' : 'var(--text-muted)' }}>
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.7 }}>
                      "{testimonial.review}"
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '1rem' }}>
                      {new Date(testimonial.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        ) : (
          <div className="glass-card" style={{ textAlign: 'center', padding: '3rem', marginBottom: '3rem' }}>
            <p style={{ color: 'var(--text-secondary)' }}>No reviews yet. Be the first to share your experience!</p>
          </div>
        )}

        {/* Review Form */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ maxWidth: '600px', margin: '0 auto' }}
        >
          <div className="glass-card" style={{ padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '0.5rem' }}>
              <span className="text-gradient">Share Your Experience</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
              Your feedback helps me grow and improve
            </p>

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Rating */}
              <div>
                <label style={{ fontWeight: 500, marginBottom: '0.5rem', display: 'block' }}>Your Rating</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '2rem',
                        cursor: 'pointer',
                        color: star <= (hoverRating || rating) ? '#fbbf24' : 'var(--text-muted)',
                        transition: 'color 0.2s ease'
                      }}
                    >
                      ★
                    </button>
                  ))}
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginLeft: '0.5rem', alignSelf: 'center' }}>
                    {rating}/5
                  </span>
                </div>
              </div>

              {/* Name */}
              <div>
                <label style={{ fontWeight: 500, marginBottom: '0.5rem', display: 'block' }}>Your Name</label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  placeholder="Enter your name"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: errors.name ? '1px solid var(--error)' : '1px solid var(--border)',
                    borderRadius: '0.75rem',
                    padding: '0.875rem',
                    width: '100%',
                    color: 'white'
                  }}
                />
                {errors.name && (
                  <p style={{ color: 'var(--error)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Review */}
              <div>
                <label style={{ fontWeight: 500, marginBottom: '0.5rem', display: 'block' }}>Your Review</label>
                <textarea
                  {...register('review', { required: 'Review is required', minLength: 10 })}
                  rows="4"
                  placeholder="Share your experience working with me..."
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: errors.review ? '1px solid var(--error)' : '1px solid var(--border)',
                    borderRadius: '0.75rem',
                    padding: '0.875rem',
                    width: '100%',
                    color: 'white',
                    resize: 'vertical'
                  }}
                />
                {errors.review && (
                  <p style={{ color: 'var(--error)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                    {errors.review.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary"
                style={{ width: '100%', padding: '1rem' }}
              >
                {submitting ? 'Submitting...' : '📝 Submit Review'}
              </button>

              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                Your review will be visible after admin approval
              </p>
            </form>
          </div>
        </motion.div>
      </div>

      <style>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: var(--primary) !important;
        }
        .swiper-pagination-bullet {
          background: var(--text-muted) !important;
        }
        .swiper-pagination-bullet-active {
          background: var(--primary) !important;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;