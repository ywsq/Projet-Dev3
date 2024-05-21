import React from 'react';
import {Link} from 'react-router-dom';


function CustomerLanding() {

    return (
        <div className="w-full">
            <div id="categories"
                 className="flex w-full h-[600px] px-4 py-14 items-center justify-center space-x-10 bg-gradient-to-t from-[#f6f6f6] to-sky-200">
                <Link to="/Products"
                      className="hover:scale-105 duration-200 flex flex-col items-center h-96 w-1/3 rounded-2xl shadow-lg">
                    <img
                        src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MT0V3_AV1?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1693000370820"
                        alt="Case"
                        className="object-cover h-2/3 rounded-xl"
                    />
                    <p className="h-1/3 flex items-center text-xl font-sans">Accessories</p>
                </Link>
                <Link to="/Products"
                      className="hover:scale-105 duration-200 flex flex-col items-center h-96 w-1/3 rounded-2xl shadow-lg">
                    <img
                        src="https://cdn.shopify.com/s/files/1/0092/8133/9443/products/TL6CyJBVr6YCntDE_f403ba61-d179-4207-b9a4-5087d2b3ac3d_720x.jpg?v=1698286720"
                        alt="Case"
                        className="object-cover h-2/3 rounded-xl"
                    />
                    <p className="h-1/3 flex items-center text-xl font-sans">Components</p>
                </Link>
                <Link to="/Products"
                      className="hover:scale-105 duration-200 flex flex-col items-center h-96 w-1/3 rounded-2xl shadow-lg">
                    <img
                        src="https://opsg-img-cdn-gl.heytapimg.com/epb/202307/25/TEzK16xW2riBwROR.png"
                        alt="Case"
                        className="object-cover h-2/3 rounded-xl"
                    />
                    <p className="h-1/3 flex items-center text-xl font-sans">Devices</p>
                </Link>
            </div>
            <div className="flex px-4 py-14 space-y-4 xl:space-y-12 xl:px-24">
                <div className='flex shadow-lg'>
                    <div
                        className="flex flex-col space-y-4 items-center justify-center w-1/3 text-center p-4 bg-gradient-to-b from-[#f5f5f5] to-[#e5e5e5]">
                        <h1 className="text-4xl font-bold">Fequently asked<br/><span
                            className="text-sky-500">Questions</span>.</h1>
                        <h2 className="text-xl">Find answer in this section</h2>
                        <a href="/FAQ"
                           className='w-52 px-7 py-3 bg-sky-500 text-white hover:bg-sky-500 hover:text-white hover:ring-8 hover:ring-sky-200 transition duration-500 rounded-full text-center'>Find</a>
                    </div>
                    <img
                        src="https://images.unsplash.com/photo-1497005367839-6e852de72767?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Components"
                        className="max-h-[350px] w-2/3 object-cover"/>
                </div>
            </div>
        </div>
    );

}

export default CustomerLanding;