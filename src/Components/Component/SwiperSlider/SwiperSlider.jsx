import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import "./swiperslider.sass";

import { TESTIMONIALS_DATA } from './swiper.data';

function SwiperSlider() {

  return (
    <div className="testimonial-slider">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 3500 }}
        centeredSlides
      >
        {TESTIMONIALS_DATA.map((t, i) => (
          <SwiperSlide key={i}>
            <article className="testimonial-card">

              <div className="rating">
                {"★".repeat(t.rating)}
                <span>{t.rating}.0</span>
              </div>

              <h4>{t.title}</h4>
              <p>{t.text}</p>

              <footer>
                <div className="testimonial-avatar">
                  <img src={t.img} alt={t.name} />
                </div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </footer>

            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SwiperSlider;
