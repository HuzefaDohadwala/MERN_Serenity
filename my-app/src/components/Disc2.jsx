import React, { useEffect } from 'react';
import "./Disc2.css"


const Disc2 = () => {
    useEffect(() => {
        let targetElements = document.querySelectorAll(".test_name1, .test_name2, .test_words1, .test_words12, .test_words21, .test_words22, .test_words11"); // Added .test_words11

        function isInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.bottom >= 0
            );
        }

        function checkVisibility() {
            for (let el of targetElements) {
                if (isInViewport(el) && !el.classList.contains('faded-in')) { // Checking if the element doesn't have 'faded-in' class
                    el.style.opacity = "1";
                    el.classList.add('faded-in');  // Adding the class to the element
                }
            }
        }

        window.addEventListener('scroll', checkVisibility);
        checkVisibility();  // Call once to check initial visibility

        // Clean-up the event listener on component unmount
        return () => window.removeEventListener('scroll', checkVisibility);
    }, []);   
  return (
    <>
    <div className="disc2">
    <div className="disc2_semic11"></div>
    <div className="disc2_semic12"></div>
    <div className="disc2_semic13"></div>
    <div className="disc2_semic14"></div>
    <div className="disc2_testimony">
    <div className="test1">
        <p className="test_words11">
        "For years, I felt trapped in my own thoughts, thinking I was alone in my struggles. Discovering this platform became a beacon of hope. The resources and community here have genuinely made a difference in my life. It's reassuring to know I'm not alone on this journey."
        </p>
        <h2 className="test_name1">-Alex M., Chicago, IL</h2>
        </div>
        <div className="test1">
        <p className="test_words12">
        "I've always been wary of seeking support online, but this platform changed my perspective. The insightful articles, various therapy options, and connections I've made here have been a game-changer. It's more than a website; it's a community where I feel understood."
        </p>
        <h2 className="test_name1">-Priya S., Los Angeles, CA</h2>
    </div>
    <div className="test2">
        <p className="test_words21">
        "Mental health challenges can be a winding, uncertain path, but this platform has been my compass. The guidance, clarity, and support I've received here are unparalleled. The professionals are genuinely compassionate, and I can't express how grateful I am."
        </p>
        <h2 className="test_name2">-Alex M., Chicago, IL</h2>
        </div>
        <div className="test2">
        <p className="test_words22">
        "Before I found this platform, I felt like I was navigating a maze without a map. Now, armed with invaluable strategies and resources, I feel more in control of my mental health. Each time I visit, I'm reminded that it's okay to seek help and that I'm part of a larger, supportive community."
        </p>
        <h2 className="test_name2">-Priya S., Los Angeles, CA</h2>
    </div>
    </div>
    </div>
    </>
  )
}

export default Disc2