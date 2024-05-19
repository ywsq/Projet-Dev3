import React from 'react';
import logo from './assets/LogoStar.png'
import './homePage.css'


function HomePage() {
    return (
        <div>
            <div className='relative'>
                <img
                    src="https://images.unsplash.com/photo-1542393545-10f5cde2c810?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Background"
                    className=" w-full object-cover"
                />
                <div
                    className="absolute flex flex-col items-center sm:top-1/4 lg:top-80 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
                    <h1 className="text-5xl text-white font-bold select-none">Grow Your Business With <br/> Our Trusted
                        B2B Partnership</h1>
                    <a href="/Partnership"
                       className="block flex justify-center w-20 mt-8 px-10 py-4 bg-white text-gray-900 hover:bg-sky-500 hover:text-white hover:ring-2 hover:ring-sky-200 transition duration-500 rounded-full">GO</a>
                </div>
            </div>

            <div className='flex bg-gradient-to-b from-sky-200 to-sky-100 text-slate-700'>
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
                    <a className='w-52 px-7 py-3 text-sky-500 border-sky-400 border-2 hover:bg-sky-400 hover:border-sky-400 hover:text-white rounded-2xl transition duration-500 text-center'
                       href='/Products'>see more</a>
                </div>
                <img
                    src="https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=1084&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className='w-1/2 object-cover' alt="image clavier"/>
            </div>

            <div className='flex bg-gradient-to-b from-white to-[#f6f6f6] text-slate-700'>
                <img
                    src="https://images.unsplash.com/photo-1535157412991-2ef801c1748b?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className='w-1/2 object-cover' alt="image clavier"/>
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
                    <a className='w-52 px-7 py-3 text-slate-900 border-slate-900 border-2 hover:bg-slate-900 hover:text-white rounded-2xl transition duration-500 text-center'
                       href='/Products'>see more</a>
                </div>
            </div>
            <div className='p-20 text-white bg-slate-950'>
                <div className='componentsTextTitle'>The Product For Your Business
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
                <div className='my-10 flex flex-col justify-center items-center space-y-10'>
                    <img className="w-20 h-20" src={logo} alt={"Image"}/>
                    <p className="text-3xl font-semibold">Apply for partnership</p>
                    <a href="/AccountCreation"
                       className='w-52 px-7 py-3 bg-white text-gray-900 hover:bg-sky-500 hover:text-white hover:ring-4 hover:ring-sky-200 transition duration-500 rounded-full text-center'>CREATE
                        YOUR<br/>ACCOUNT</a>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
