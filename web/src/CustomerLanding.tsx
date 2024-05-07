import React from 'react';
import { Link } from 'react-router-dom';
import charger from './assets/charger.jpg'
import component from './assets/component.jpg'
import mobile from './assets/mobile.jpg'
import phoneCase from './assets/mobileCase.jpg'
import nature from './assets/nature.jpg'
import device from './assets/devices.jpg'
import question from './assets/question.jpg'

function CustomerLanding() {

    return (
        <div className="w-full">
            <div id="categories" className="flex w-full h-[600px] px-4 py-14 items-center justify-center space-x-10 bg-gradient-to-t from-white via-sky-200 to-blue-400">
                <Link to="#" className="hover:scale-105 duration-200">
                    <img src={component} className="min-w-56 min-h-56 max-h-72" alt="background"/>
                    <p className="flex justify-center mt-4 text-slate-800 font-semibold">COMPONENTS</p>
                </Link>
                <Link to="#" className="hover:scale-105 duration-200">
                    <img src={mobile} className="min-w-56 min-h-56 max-h-72" alt="background"/>
                    <p className="flex justify-center mt-4 text-slate-800 font-semibold">MOBILE</p>
                </Link>
                <Link to="#" className="hover:scale-105 duration-200">
                    <img src={charger} className="min-w-56 min-h-56 max-h-72" alt="background"/>
                    <p className="flex justify-center mt-4 text-slate-800 font-semibold">ACCESSORIES</p>
                </Link>
            </div>
            <div className="flex-col px-4 py-14 space-y-4 xl:space-y-12 xl:px-24">
                <div className="flex space-x-4 xl:space-x-12">
                    <Link to="#" id="ECO PLUS" className="relative hover:scale-105 duration-200">
                        <img src={nature} className="rounded-xl" alt="background"/>
                        <p className="absolute inset-y-1/2 text-white px-4"><span className="font-bold text-4xl">ECO PLUS</span><br/>
                        We care about the ecology and we are driven to contribute in better products</p>
                    </Link>
                    <Link to="#" id="CASES" className="relative hover:scale-105 duration-200">
                        <img src={phoneCase} className="rounded-xl" alt="background"/>
                        <p className="absolute inset-y-1/2 text-white px-4"><span className="font-bold text-4xl">CASES</span><br/>
                            The best and most popular cases for your customers</p>
                    </Link>
                </div>
                <div className="flex space-x-4 xl:space-x-12">
                    <Link to="#" id="STAR MOBILE" className="relative hover:scale-105 duration-200">
                        <img src={device} className="rounded-xl" alt="background"/>
                        <p className="absolute inset-y-1/2 text-white px-4"><span className="font-bold text-4xl">STAR MOBILE</span><br/>
                            Take a look at our brand products</p>
                    </Link>
                    <Link to="#" id="FREQUENTLY ASKED" className="relative hover:scale-105 duration-200">
                        <img src={question} className="rounded-xl " alt="background"/>
                        <p className="absolute inset-y-1/2 text-white px-4"><span className="font-bold text-4xl">FREQUENTLY ASKED</span><br/>
                            Find answers with the most frequently asked questions by our customers</p>
                        <button></button>
                    </Link>
                </div>
            </div>
        </div>
);

}

export default CustomerLanding;