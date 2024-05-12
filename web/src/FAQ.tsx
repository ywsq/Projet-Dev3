import React from 'react';

function FAQ() {
    return (
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="accordion">
                <div className="accordion-item border-b border-gray-200">
                    <button id="accordion-button-1" aria-expanded="false" className="accordion-button">
                        <span className="accordion-title text-lg font-semibold">Why is the moon sometimes out during the day?</span>
                        <span className="icon" aria-hidden="true"></span>
                    </button>
                    <div className="accordion-content hidden">
                        <p className="py-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut.
                            Ut tortor pretium viverra suspendisse potenti.</p>
                    </div>
                </div>
                <div className="accordion-item border-b border-gray-200">
                    <button id="accordion-button-2" aria-expanded="false" className="accordion-button">
                        <span className="accordion-title text-lg font-semibold">Why is the sky blue?</span>
                        <span className="icon" aria-hidden="true"></span>
                    </button>
                    <div className="accordion-content hidden">
                        <p className="py-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut.
                            Ut tortor pretium viverra suspendisse potenti.</p>
                    </div>
                </div>
                <div className="accordion-item border-b border-gray-200">
                    <button id="accordion-button-3" aria-expanded="false" className="accordion-button">
                        <span className="accordion-title text-lg font-semibold">Will we ever discover aliens?</span>
                        <span className="icon" aria-hidden="true"></span>
                    </button>
                    <div className="accordion-content hidden">
                        <p className="py-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut.
                            Ut tortor pretium viverra suspendisse potenti.</p>
                    </div>
                </div>
                <div className="accordion-item border-b border-gray-200">
                    <button id="accordion-button-4" aria-expanded="false" className="accordion-button">
                        <span className="accordion-title text-lg font-semibold">How much does the Earth weigh?</span>
                        <span className="icon" aria-hidden="true"></span>
                    </button>
                    <div className="accordion-content hidden">
                        <p className="py-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut.
                            Ut tortor pretium viverra suspendisse potenti.</p>
                    </div>
                </div>
                <div className="accordion-item">
                    <button id="accordion-button-5" aria-expanded="false" className="accordion-button">
                        <span className="accordion-title text-lg font-semibold">How do airplanes stay up?</span>
                        <span className="icon" aria-hidden="true"></span>
                    </button>
                    <div className="accordion-content hidden">
                        <p className="py-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut.
                            Ut tortor pretium viverra suspendisse potenti.</p>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default FAQ;