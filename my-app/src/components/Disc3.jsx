import React, { useEffect } from 'react';
import "./Disc3.css"

const Disc3 = () => {
    useEffect(() => {
        const items = document.querySelectorAll('.accordion button');
        
        function toggleAccordion() {
            const itemToggle = this.getAttribute('aria-expanded');
        
            for (let i = 0; i < items.length; i++) {
                items[i].setAttribute('aria-expanded', 'false');
            }
        
            if (itemToggle === 'false') {
                this.setAttribute('aria-expanded', 'true');
            }
        }
        
        items.forEach((item) => item.addEventListener('click', toggleAccordion));

        // Cleanup listeners on unmount
        return () => {
            items.forEach((item) => item.removeEventListener('click', toggleAccordion));
        };
    }, []);

  return (
    <>
      
    <div className="disc3">
    <h2 className="accordion_heading">Frequently Asked Questions</h2>
      <div className="accordion">
        <div className="accordion-item">
          <button id="accordion-button-1" aria-expanded="false">
            <span className="accordion-title">What is better help ?</span>
            <span className="icon" aria-hidden="true"></span>
          </button>
          <div className="accordion-content">
            <p classNameName="accordion-para">
            It is an online web based mental health app to provide its members a judgement free and affordable mental health care service
            </p>
          </div>
        </div>
        <div className="accordion-item">
          <button id="accordion-button-2" aria-expanded="false">
            <span className="accordion-title">Who are the listeners ?</span>
            <span className="icon" aria-hidden="true"></span>
          </button>
          <div className="accordion-content">
            <p classNameName="accordion-para">
            The listeners are working psychologist and students who are trained extensively through a program to provide our members the best possible help they need.
            </p>
          </div>
        </div>
        <div className="accordion-item">
          <button id="accordion-button-3" aria-expanded="false">
            <span className="accordion-title">Is it safe and secure ?</span>
            <span className="icon" aria-hidden="true"></span>
          </button>
          <div className="accordion-content">
            <p classNameName="accordion-para">
            Better help promotes anonymity to ensure neither the identity of the member or listener is revealed.
            </p>
          </div>
        </div>
        <div className="accordion-item">
          <button id="accordion-button-4" aria-expanded="false">
            <span className="accordion-title">How much does it cost ?</span>
            <span className="icon" aria-hidden="true"></span>
          </button>
          <div className="accordion-content">
            <p classNameName="accordion-para">
            Members who seek out therapy get the first session free and the later sessions are charged based on the therapist and session duration. Rest all services are free of cost.
            </p>
          </div>
        </div>
        <div className="accordion-item">
          <button id="accordion-button-5" aria-expanded="false">
            <span className="accordion-title">What if I don't need therapy?</span>
            <span className="icon" aria-hidden="true"></span>
          </button>
          <div className="accordion-content">
            <p classNameName="accordion-para">
            Not all members require a therapist at all times, better help promotes a safe and free space where members can contact listeners and help them better understand their situation.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Disc3