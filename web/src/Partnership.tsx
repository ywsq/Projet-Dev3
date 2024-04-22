import React from 'react';
import Banniere from "./Banniere";
import bussinessPartnership from './assets/handshake-partnership.jpg'
import B2BPlatform from './assets/B2B.jpg'
import './Partnership.css'

function Partnership() {
    return (
            <section>

                <div className='components'>
                    <div className='componentsText'>
                        <div className='componentsTextTitle'>Your partner <br/>
                            in accessories
                        </div>
                        <div className='componentsTextExplication'>
                            Forge a seamless partnership with us as your premier destination for accessories.
                            With an unwavering commitment to excellence, we provide a diverse array of top-tier
                            accessories meticulously crafted to complement your lifestyle and meet your every need.
                            Whether you seek sophisticated elegance or rugged durability, our curated selection ensures
                            you&apos;ll find the perfect match for your style and preferences. Trust in our expertise
                            and
                            dedication to quality as we accompany you on your journey, delivering unparalleled products
                            and service every step of the way.
                        </div>
                    </div>
                    <img src={bussinessPartnership} className='componentsImage' alt="image handhake"/>
                </div>
                <div className='componentsTextTitle flex justify-center'>
                    B2B Platform
                </div>
                <img src={B2BPlatform} className='px-10 w-full mb-10' alt="image clavier"/>
                <div className='componentsTextTitle flex justify-center'>
                    The advantages
                </div>

                <div className="advantages">
                    <div className="advantage">
                        <div className="adventageTitle">Full catalog</div>
                        <div className="adventageText"> Dive into our comprehensive catalog featuring an extensive array of high-quality products to cater to all your needs and preferences, ensuring you find exactly what you&apos;re looking for.</div>
                    </div>
                    <div className="advantage">
                        <div className="adventageTitle">Low moq</div>
                        <div className="adventageText">Take advantage of our flexible ordering system with low minimum order quantities, allowing you to access premium products without hefty commitments.</div>
                    </div>
                    <div className="advantage">
                        <div className="adventageTitle">Flexibility</div>
                        <div className="adventageText">Embrace the freedom to customize your orders according to your unique specifications, tailored to match your business requirements perfectly.</div>
                    </div>
                </div>                <div className="flex">
                    <div className="advantage">
                        <div className="adventageTitle">easy logistic</div>
                        <div className="adventageText">Simplify your logistical operations with our streamlined processes, enabling seamless delivery of your chosen products to your doorstep with minimal effort.</div>
                    </div>
                    <div className="advantage">
                        <div className="adventageTitle">3 clicks to buy</div>
                        <div className="adventageText">Experience the ultimate convenience of our user-friendly interface, where purchasing your desired items is as simple as a few clicks, saving you time and effort.</div>
                    </div>
                    <div className="advantage">
                        <div className="adventageTitle">Intutive</div>
                        <div className="adventageText">Navigate through our platform effortlessly thanks to its intuitive design and smooth functionality, ensuring a seamless browsing and shopping experience every time.</div>
                    </div>
                </div>
                <div className='applyButtonParent'>
                <button className='applyButton'> APPLY FOR <br/>PARTNERSHIP</button>
                </div>
            </section>
    );
}

export default Partnership;