import React, { useRef, useEffect, useState } from 'react';
import './Home4.css';

const Home4 = () => {
    const circleRef = useRef(null);
    const [isTransitioned, setIsTransitioned] = useState(false);
    useEffect(() => {
        const circle = circleRef.current;
        let targetX = window.innerWidth / 2;
        let targetY = window.innerHeight / 2;
        let currentX = targetX;
        let currentY = targetY;
        const speed = 0.2;

        function animate() {
            const dx = targetX - currentX;
            const dy = targetY - currentY;

            currentX += dx * speed;
            currentY += dy * speed;

            circle.style.left = (currentX - 50) + 'px';
            circle.style.top = (currentY - 50) + 'px';

            requestAnimationFrame(animate);
        }

        animate();

        function handleMouseMove(event) {
            targetX = event.clientX;
            targetY = event.clientY;
        }

        document.body.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.body.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    function toggleColors() {
        document.body.classList.toggle('transitioned');
        setIsTransitioned(prevState => !prevState);
    }

    return (
        <>  
           <div className={`home4 ${isTransitioned ? 'transitioned4' : ''}`}>
            <div className="clickable-text4" onClick={toggleColors}>
                Let's Get Started
            </div>
            <button className="transition-button4">Next</button>
            <div className="circle4" ref={circleRef}></div>
        </div>
        </>
    );
};

export default Home4;
