import React from 'react';

import Blog from '../Component/Blog/Blog';
import Faq from '../Component/Faq/Faq';
import SwiperSlider from '../Component/SwiperSlider/SwiperSlider';
import Tecnologies from '../Component/Tecnologies/Tecnologies';
import Testimonial from '../Component/Testimonial/Testimonial';
import About from '../Component/About/About';

function Main() {
  return (
    <>
      {/* About */}
      <section id="about">
        <About />
      </section>

      {/* Tecnologies */}
      <section id="technologies">
        <Tecnologies />
      </section>

      {/* Testimonial */}
      <section id="testimonial">
        <Testimonial />
      </section>

      {/* swiper */}
      <section >
        <SwiperSlider />
      </section>

      {/* Faq */}
      <section id="faq">
        <Faq />
      </section>

      {/* Blog */}
      <section id="blog">
        <Blog />
      </section>
    </>
  );
}

export default Main;
