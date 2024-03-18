import React from 'react';
import FooterCss from '../styles/Footer.module.css'; 

const Footer = () => {
  return (
    <footer className={FooterCss.footer}>
      <div className={FooterCss.footerContent}>
        <div className={FooterCss.footerSection}>
          <h3>Contact Us</h3>
          <p>Email: info@convene.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
        <div className={FooterCss.footerSection}>
          <h3>Follow Us</h3>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
        </div>
        <div className={FooterCss.footerSection}>
          <h3>Legal</h3>
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
        </div>
      </div>
      <div className={FooterCss.footerBottom}>
        <p>&copy; 2024 Convene. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
