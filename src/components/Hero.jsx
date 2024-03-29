import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroCss from '../styles/Hero.module.css';

const Hero = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('./signUp');
    };

    return (
        <div className={HeroCss.heroSection}>
            <div className={HeroCss.heroContent}>
                <h1>Convene - Where Questions Meet Answers</h1>
                <p>Convene empowers you to crowdsource questions for meetups and events.</p>
                <p>Join the conversation, shape the agenda.</p>
                <button className={HeroCss.ctaButton} onClick={handleGetStarted}>Get Started</button>
            </div>
        </div>
    );
};

export default Hero;
