import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

import './ContactStyle/contactcard.sass';

const ContactCard = ({ type, title, value, pin = false }) => {
  let Icon;
  switch(type){
    case "location": Icon = FaMapMarkerAlt; break;
    case "phone": Icon = FaPhoneAlt; break;
    case "email": Icon = FaEnvelope; break;
    default: Icon = FaMapMarkerAlt;
  }

  const cardClass = `info-card ${type}-icon ${pin ? "pin-icon" : ""}`;

  return (
    <li className={cardClass}>
      <span className="icon-wrapper">
        <span className="icon"><Icon aria-hidden="true" /></span>
        <span className="shadow"></span>
        <span className="glow"></span>
      </span>
      <div className="text">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </li>
  );
};

export default ContactCard;
