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
            <span className="accordion-title">Why is the moon sometimes out during the day?</span>
            <span className="icon" aria-hidden="true"></span>
          </button>
          <div className="accordion-content">
            <p classNameName="accordion-para">
                hello
            </p>
          </div>
        </div>
        <div className="accordion-item">
          <button id="accordion-button-2" aria-expanded="false">
            <span className="accordion-title">Why is the sky blue?</span>
            <span className="icon" aria-hidden="true"></span>
          </button>
          <div className="accordion-content">
            <p classNameName="accordion-para">
                    hello
            </p>
          </div>
        </div>
        <div className="accordion-item">
          <button id="accordion-button-3" aria-expanded="false">
            <span className="accordion-title">Will we ever discover aliens?</span>
            <span className="icon" aria-hidden="true"></span>
          </button>
          <div className="accordion-content">
            <p classNameName="accordion-para">
                hello
            </p>
          </div>
        </div>
        <div className="accordion-item">
          <button id="accordion-button-4" aria-expanded="false">
            <span className="accordion-title">How much does the Earth weigh?</span>
            <span className="icon" aria-hidden="true"></span>
          </button>
          <div className="accordion-content">
            <p classNameName="accordion-para">
                hello
            </p>
          </div>
        </div>
        <div className="accordion-item">
          <button id="accordion-button-5" aria-expanded="false">
            <span className="accordion-title">How do airplanes stay up?</span>
            <span className="icon" aria-hidden="true"></span>
          </button>
          <div className="accordion-content">
            <p classNameName="accordion-para">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro ex nisi, explicabo hic soluta non sit recusandae sequi at eos ab quas, quae, illum laudantium aliquid optio! Rerum, dignissimos saepe.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Disc3