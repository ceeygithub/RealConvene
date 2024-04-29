// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import ProfileCSS from '../styles/Profile.module.css';
// import { useAuth } from '../contexts/AuthContext';


// const Profile = () => {
//     const navigate = useNavigate();
//       const {selectedInterests, setSelectedInterests,interests } = useAuth(); 
//     const [buttonStyle, setButtonStyle] = useState({
//         border: '2px solid #2ecc71',
//         background: 'none',
//         color: '#2ecc71',
//     });

//     const handleInterestClick = (interest) => {
//         if (selectedInterests.includes(interest)) {
//             setSelectedInterests(selectedInterests.filter((item) => item !== interest));
//         } else {
//             setSelectedInterests([...selectedInterests, interest]);
//         }

//         // Update button style based on selected interests
//         const newButtonStyle = selectedInterests.length >= 0
//             ? { border: '2px solid #2ecc71', background: '#2ecc71', color: '#fff' }
//             : { border: '2px solid #2ecc71', background: 'none', color: '#2ecc71' };

//         setButtonStyle(newButtonStyle);
//     };

//     const handleClick = () => {
//         if (selectedInterests.length > 0) {
//               console.log('Selected Interests:', selectedInterests);
//             // Navigate only if at least one interest is selected
//             navigate('/userDashboard', { state: { selectedInterests } });
//         }
    
//     };

//     // const isButtonDisabled = selectedInterests.length === 0;
//     const isButtonDisabled = selectedInterests.length < 1;

//     return (
//         <>
//             <div className={ProfileCSS.menuContainer}>
//                 <h2 className={ProfileCSS.heading}>Get started by picking a few interests</h2>

//                 <div className={ProfileCSS.menuColumn}>
//                     {/* Your menu items */}
//                     {interests.map((interest, index) => (
//                         <div key={index} className={ProfileCSS.menuItem}>
//                             <div className={`${ProfileCSS.card} ${selectedInterests.map(interest => interest.name).includes(interest.name) ? ProfileCSS.selected : ''}`}>
//                                 <img
//                                     src={interest.image}
//                                     alt={interest.name}
//                                     className={ProfileCSS.img}
//                                     onClick={() => handleInterestClick(interest)}
//                                 />
//                                 <div className={ProfileCSS.cardBody}>
//                                     <p className="card-text">{interest.name}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 <button className={ProfileCSS.btn} onClick={handleClick} disabled={isButtonDisabled} style={buttonStyle}>
//                     Next
//                 </button>
//             </div>
//         </>
//     );
// };

// export default Profile;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCSS from '../styles/Profile.module.css';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
    const navigate = useNavigate();
    const { selectedInterests, setSelectedInterests, interests } = useAuth();
    const [buttonStyle, setButtonStyle] = useState({
        border: '2px solid #2ecc71',
        background: 'none',
        color: '#2ecc71',
    });

    useEffect(() => {
        // Retrieve selected interests from local storage on component mount
        const storedInterests = localStorage.getItem('selectedInterests');
        if (storedInterests) {
            setSelectedInterests(JSON.parse(storedInterests));
        }
    }, [setSelectedInterests]);

    const handleInterestClick = (interest) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter((item) => item !== interest));
        } else {
            setSelectedInterests([...selectedInterests, interest]);
        }

        const newButtonStyle = selectedInterests.length > 0
            ? { border: '2px solid #2ecc71', background: '#2ecc71', color: '#fff' }
            : { border: '2px solid #2ecc71', background: 'none', color: '#2ecc71' };

        setButtonStyle(newButtonStyle);

        // Store selected interests in local storage
        localStorage.setItem('selectedInterests', JSON.stringify(selectedInterests));
    };

    const handleClick = () => {
        if (selectedInterests.length > 0) {
            navigate('/userDashboard', { state: { selectedInterests } });
        }
    };

    const isButtonDisabled = selectedInterests.length < 1;

    return (
        <>
            <div className={ProfileCSS.menuContainer}>
                <h2 className={ProfileCSS.heading}>Get started by picking a few interests</h2>

                <div className={ProfileCSS.menuColumn}>
                    {interests.map((interest, index) => (
                        <div key={index} className={ProfileCSS.menuItem}>
                            <div className={`${ProfileCSS.card} ${selectedInterests.map(interest => interest.name).includes(interest.name) ? ProfileCSS.selected : ''}`}>
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
