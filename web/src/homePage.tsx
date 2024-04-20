import React from 'react';
import Banniere from "./Banniere";
import clavierDessin from './assets/clavierDessin.jpg'
import phoneCase from './assets/phoneCase.png'
import './homePage.css'



function HomePage() {


    return (
            <section>
                <div className='center headerBackground'>
                    <h1 id="HomePageTitle"> Grow your business with <br/>
                        our trusted B2B partnership</h1>
                </div>
                <div className='components'>
                    <div className='componentsText'>
                        <div className='componentsTextTitle'>Need components <br/>
                            for your devices ?
                        </div>
                        <div className='componentsTextExplication'>

                            Discover here an unparalleled selection of premium components, meticulously curated to
                            offer you not only the pinnacle of quality but also unbeatable value. Delve into our
                            expansive collection where excellence meets affordability, ensuring that you secure not
                            just the best, but the best at a price point that exceeds all expectations.
                        </div>
                        <a className='btn btn-dark btn-mid componentsTextButton' href='/Products'>see more</a>
                    </div>
                    <img src={clavierDessin} className='componentsImage' alt="image clavier"/>
                </div>

                <div className='components'>
                    <img src={phoneCase} className='componentsImage' alt="image clavier"/>
                    <div className='componentsText'>
                        <div className='componentsTextTitle'>Or phone cases ...
                        </div>
                        <div className='componentsTextExplication'>
                            Explore an exceptional array of phone cases that epitomize both style and functionality,
                            meticulously sourced to provide you with unparalleled protection for your device without
                            compromising on aesthetics. Dive into our diverse range, where each case is carefully
                            selected to offer not only superior quality but also unbeatable affordability.
                            Elevate your phone&apos;s look and safeguard it with the perfect case, all at a price that
                            defies comparison.
                        </div>
                        <a className='btn btn-dark btn-mid componentsTextButton' href='/Products'>see more</a>
                    </div>
                </div>
                <div className='componentsTextEnd'>
                    <div className='componentsTextTitle'>The product for your bisiness
                    </div>
                    <div className='componentsTextExplication'>

                        Discover the ideal product solutions tailored specifically for your business needs.
                        Our carefully curated selection is designed to optimize efficiency, enhance productivity,
                        and elevate your operations to new heights. With a focus on quality, reliability, and
                        affordability,
                        we offer a comprehensive range of products that empower your business to thrive in today&apos;s
                        competitive
                        landscape. From essential tools to innovative technologies, find everything you need to drive
                        success
                        and achieve your goals, all in one place.
                    </div>
                </div>
            </section>
    );
}

export default HomePage;
