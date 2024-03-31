import React from 'react';
import './AccountRequests.css';

function AccountRequests() {
    return (
        <body>
            <div className="text-gray-900 flex justify-center">
                <div>

                </div>
                <div className="px-3 py-4 ">
                    <h1 className="text-3xl font-semibold">Account Requests</h1>
                    <table className="w-3/4 text-md bg-white shadow-lg rounded-xl mb-4">
                        <tbody>
                            <tr className="border-t hover:bg-gray-100">
                                <td className="p-3 px-4"><input type="text" value="user.name" className="bg-transparent"/></td>
                                <td className="p-3 px-5 flex justify-end">
                                    <button type="button"
                                            className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Save
                                    </button>
                                    <button type="button"
                                            className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </body>
    );
}

export default AccountRequests;