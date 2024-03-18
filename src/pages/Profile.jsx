import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCSS from '../styles/Profile.module.css';
// import Button from '../components/button/Button';

const interests = [
    {
        name: 'Art & Culture',
        image: 'https://images.pexels.com/photos/2372978/pexels-photo-2372978.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
        name: 'Career & Business',
        image: 'https://images.pexels.com/photos/2041627/pexels-photo-2041627.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
        name: 'Community & Environment',
        image: 'https://images.pexels.com/photos/3387159/pexels-photo-3387159.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
        name: 'Science & Education',
        image: 'https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=600',
    },

    {
        name: 'Games',
        image: 'https://images.pexels.com/photos/1543766/pexels-photo-1543766.jpeg?auto=compress&cs=tinysrgb&w=400',
    },

    {
        name: 'Health & Wellbeing',
        image: 'https://images.pexels.com/photos/3768593/pexels-photo-3768593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },

    {
        name: 'Hobbies & Passion',
        image: 'https://images.pexels.com/photos/10030340/pexels-photo-10030340.jpeg?auto=compress&cs=tinysrgb&w=600',
    },

    {
        name: 'Identity & Language',
        image: 'https://images.pexels.com/photos/4440715/pexels-photo-4440715.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },

    {
        name: 'Movements & Politics',
        image: 'https://images.pexels.com/photos/4664301/pexels-photo-4664301.jpeg?auto=compress&cs=tinysrgb&w=600',
    },

    {
        name: 'Music & Dancing',
        image: 'https://images.pexels.com/photos/3971985/pexels-photo-3971985.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
        name: 'Sports & Fitness',
        image: 'https://images.pexels.com/photos/848618/pexels-photo-848618.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
        name: 'Technology',
        image: 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
];

const Profile = () => {
    const navigate = useNavigate();
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [buttonStyle, setButtonStyle] = useState({
        border: '2px solid #2ecc71',
        background: 'none',
        color: '#2ecc71',
    });

    const handleInterestClick = (interest) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter((item) => item !== interest));
        } else {
            setSelectedInterests([...selectedInterests, interest]);
        }

        // Update button style based on selected interests
        const newButtonStyle = selectedInterests.length >= 0
            ? { border: '2px solid #2ecc71', background: '#2ecc71', color: '#fff' }
            : { border: '2px solid #2ecc71', background: 'none', color: '#2ecc71' };

        setButtonStyle(newButtonStyle);
    };

    const handleClick = () => {
        if (selectedInterests.length > 0) {
            // Navigate only if at least one interest is selected
            navigate('/userprofile', { state: { selectedInterests } });
        }
    };

    // const isButtonDisabled = selectedInterests.length === 0;
    const isButtonDisabled = selectedInterests.length < 1;

    return (
        <>
            <div className={ProfileCSS.menuContainer}>
                <h2 className={ProfileCSS.heading}>Get started by picking a few interests</h2>

                <div className={ProfileCSS.menuColumn}>
                    {/* Your menu items */}
                    {interests.map((interest, index) => (
                        <div key={index} className={ProfileCSS.menuItem}>
                            <div className={`${ProfileCSS.card} ${selectedInterests.includes(interest) ? ProfileCSS.selected : ''}`}>
                                <img
                                    src={interest.image}
                                    alt={interest.name}
                                    className={ProfileCSS.img}
                                    onClick={() => handleInterestClick(interest)}
                                />
                                <div className={ProfileCSS.cardBody}>
                                    <p className="card-text">{interest.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button className={ProfileCSS.btn} onClick={handleClick} disabled={isButtonDisabled} style={buttonStyle}>
                    Next
                </button>
            </div>
        </>
    );
};

export default Profile;
