import React from "react";
import btnArrow from "./../../../assets/btn-arrow.svg";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/modules";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

import "./ComponentStyle/testimonial.sass";
import { Link } from "react-router-dom";

function Testimonial() {
  return (
    <>
      {/** */}
      <div className="large-section test-section position-relative pt-5">
        {/** Testimonial */}
        <div className="container py-5 text-white">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="container mb-5">
              <div className="row section-head py-5">
                <div className="col-lg-6">
                  <div className="section-title">
                    <h5>Testemunhos</h5>
                    <h1>
                      O que os nossos <span>clientes dizem</span>
                    </h1>
                  </div>
                </div>
                <div className="col-lg-6 d-flex justify-content-end align-items-end">
                  <div className="btn-1">
                    <Link to="/contact" className="btn-1">
                      Contacto
                      <img src={btnArrow} alt="arrow" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Testimonial;
