import React from 'react';
import productPage from './assets/websiteProducts.png'

function Service() {
    return (
        <div>
            <div className='flex'>
                <div className="flex flex-col space-y-4 items-center justify-center w-1/3 text-center text-slate-700 p-4 bg-gradient-to-b from-[#e6e6e6] to-[#e2e2e2]">
                    <h1 className="text-4xl font-bold">All The Components.<br/>In One Place.</h1>
                    <h2 className="text-xl">Components for repairing Samsung, Apple, etc.</h2>
                </div>
                <img
                    src="https://images.unsplash.com/photo-1597424216910-9e56f8a09b8e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Components"
                    className="max-h-[350px] w-2/3 object-cover"
                />

            </div>
            <div className="w-full flex flex-col items-center space-y-14 py-20">
                <h2 className="text-3xl font-semibold font-mono">The Products For Your Business</h2>
                <div className="flex px-20 space-x-5">
                    <div className="flex flex-col items-center h-96 w-1/3 rounded-2xl shadow-lg">
                        <img
                            src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MT0V3_AV1?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1693000370820"
                            alt="Case"
                            className="object-cover h-2/3 rounded-xl"
                        />
                        <p className="h-1/3 flex items-center text-xl font-sans">Cases</p>
                    </div>
                    <div className="flex flex-col items-center h-96 w-1/3 rounded-2xl shadow-lg">
                        <img
                            src="https://cdn.shopify.com/s/files/1/0092/8133/9443/products/TL6CyJBVr6YCntDE_f403ba61-d179-4207-b9a4-5087d2b3ac3d_720x.jpg?v=1698286720"
                            alt="Components"
                            className="object-cover h-2/3 rounded-xl"
                        />
                        <p className="h-1/3 flex items-center text-xl font-sans">Components</p>
                    </div>
                    <div className="flex flex-col items-center h-96 w-1/3 rounded-2xl shadow-lg">
                        <img
                            src="https://opsg-img-cdn-gl.heytapimg.com/epb/202307/25/TEzK16xW2riBwROR.png"
                            alt="Devices"
                            className="object-cover h-2/3 rounded-xl"
                        />
                        <p className="h-1/3 flex items-center text-xl font-sans">Devices</p>
                    </div>
                </div>
            </div>
            <div className="p-20 flex flex-col space-y-10">
                <div className='flex shadow-lg'>
                    <div className="flex flex-col space-y-4 items-center justify-center w-1/3 text-center text-slate-50 p-4 bg-gradient-to-b from-[#222115] to-[#282a23]">
                        <h1 className="text-4xl font-bold">Shipping<br/><span className="text-yellow-500">Delivery</span>.</h1>
                        <h2 className="text-xl">Shipment and delivery of large quantity</h2>
                    </div>
                    <img
                        src="https://images.unsplash.com/photo-1532635042-a6f6ad4745f9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Components"
                        className="max-h-[350px] w-2/3 object-cover"/>
                </div>
                <div className='flex shadow-lg'>
                    <div className="flex flex-col space-y-4 items-center justify-center w-1/3 text-center text-slate-700 p-4 bg-[#f6f6f6]">
                        <h1 className="text-4xl font-bold">B2B<br/><span className="text-sky-500">Platform</span>.</h1>
                        <h2 className="text-xl">Access a vast catalog of products<br/>Chosen by experts for your business</h2>
                    </div>
                    <img
                        src={productPage}
                        alt="Components"
                        className="max-h-[350px] w-2/3 object-cover"/>
                </div>
                <div className='flex shadow-lg'>
                    <div className="flex flex-col space-y-4 items-center justify-center w-1/3 text-center text-slate-700 p-4 bg-gradient-to-b from-[#e6e6e6] to-[#e2e2e2]">
                        <h1 className="text-4xl font-bold">The Best<br/>For <span className="text-[#7fc701]">Accessories</span>.</h1>
                        <h2 className="text-xl">Lifestyle for Samsung, Apple, etc.</h2>
                    </div>
                    <img
                        src="https://images.unsplash.com/photo-1598061403733-a0d8eb6bd569?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Components"
                        className="max-h-[350px] w-2/3 object-cover"/>
                </div>
            </div>
            <div className='py-20 flex flex-col justify-center items-center space-y-10'>
                <p className="text-4xl font-semibold text-slate-900">Apply for partnership</p>
                <a href="/AccountCreation" className=' w-52 px-7 py-3 bg-sky-500 text-white hover:bg-sky-500 hover:text-white hover:ring-8 hover:ring-sky-200 transition duration-500 rounded-full text-center'>CREATE YOUR<br/>ACCOUNT</a>
            </div>
        </div>
);
}

export default Service;