import React from 'react';
import Banniere from "./Banniere";
import bussinessPartnership from './assets/handshake-partnership.jpg'
import B2BPlatform from './assets/B2B.jpg'
import './Partnership.css'

function Partnership() {
    return (
            <div>
                <div className='relative'>
                    <img
                        src="https://images.unsplash.com/photo-1524323599945-b9b2e5a44e73?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Handshake"
                        className="max-h-[600px] w-full object-cover"
                    />
                    <div className="absolute top-10 xl:top-0 left-0 w-full px-20 lg:px-52 text-center p-4">
                        <h1 className="text-5xl font-bold">Your Partner in Accessories</h1>
                        <h2 className="text-3xl font-semibold">B2B PLATFORM</h2>
                    </div>
                </div>
                <div className="w-full flex flex-col items-center space-y-5 bg-white ">
                    <h2 className="text-3xl font-semibold">Excellence in Accessory Partnerships</h2>
                    <p className="w-96 text-center text-xl">Discover premier accessories with us. From <span className="text-orange-500 font-semibold">elegant to durable</span>, find your <span className="text-orange-500 font-semibold">perfect</span> match. <span className="text-orange-500 font-semibold">Trust</span> our <span className="text-orange-500 font-semibold">expertise</span> for unparalleled products and service</p>
                </div>
                <div className="bg-white flex items-center justify-center">
                    <img  src="https://img.freepik.com/vecteurs-libre/personnages-dessins-animes-collegues-collaboration-efficace-cooperation-entre-collegues-travail-equipe-collegues-discutant-solution-interaction-reussie_335657-2309.jpg?w=740&t=st=1715214319~exp=1715214919~hmac=ec9e29c38037afd1520c7c697c19fc756d40c3eafc2878ccf9973349f7e296b8" className='h-96 w-96 mb-10' alt="image clavier"/>
                </div>
                <div className="bg-gradient-to-b from-white to-sky-200">
                    <div className='text-5xl font-bold flex justify-center pt-20 mb-14'>
                        THE ADVANTAGES
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
                    </div>
                    <div className="flex">
                        <div className="advantage">
                            <div className="adventageTitle">easy logistic</div>
                            <div className="adventageText">Simplify your logistical operations with our streamlined processes, enabling seamless delivery of your chosen products to your doorstep with minimal effort.</div>
                        </div>
                        <div className="advantage">
                            <div className="adventageTitle">3 clicks to buy</div>
                            <div className="adventageText">Experience the ultimate convenience of our user-friendly interface, where purchasing your desired items is as simple as a few clicks, saving you time and effort.</div>
                        </div>
                        <div className="advantage">
                            <div className="adventageTitle">Intuitive</div>
                            <div className="adventageText">Navigate through our platform effortlessly thanks to its intuitive design and smooth functionality, ensuring a seamless browsing and shopping experience every time.</div>
                        </div>
                    </div>
                    <div className='py-10 flex flex-col justify-center items-center space-y-5'>
                        <p className="text-3xl font-semibold text-slate-900">Apply for partnership</p>
                        <a href="/AccountCreation" className='w-52 px-7 py-3 bg-white text-gray-900 hover:bg-sky-500 hover:text-white hover:ring-8 hover:ring-sky-100 transition duration-500 rounded-full text-center'>CREATE YOUR<br/>ACCOUNT</a>
                    </div>
                </div>

            </div>
    );
}

export default Partnership;