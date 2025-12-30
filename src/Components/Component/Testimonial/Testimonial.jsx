import React from "react";
import btnArrow from "./../../../assets/about-more-circle.svg";

import "swiper/modules";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

import "./ComponentStyle/testimonial.sass";
import { Link } from "react-router-dom";

function Testimonial() {
  return (
    <div className="large-section test-section position-relative pt-5 testimonial-section">
      <div className="container py-5 text-white testimonial-wrapper">
        <div className="row section-head py-5">
          <div className="col-lg-6 col-md-12">
            <div className="testimonial-header">
              <h5>Testemunhos</h5>
              <h1>
                O que <span>utilizadores dizem</span>
              </h1>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 d-flex justify-content-lg-end justify-content-center align-items-end">
            <div className="btn-1">
              <Link to="/contact">
                Contacto
                <img src={btnArrow} alt="arrow" />
              </Link>
            </div>
          </div>
        </div>

        {/** by johnnydurao180215@gmail.com */}
      </div>
    </div>
  );
}

export default Testimonial;
