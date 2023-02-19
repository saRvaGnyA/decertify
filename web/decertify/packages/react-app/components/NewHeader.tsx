import { useCelo } from '@celo/react-celo';
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function NewHeader() {
    let [componentInitialized, setComponentInitialized] = useState(false);
    let {
        initialised,
        address,
        connect,
        disconnect
    } = useCelo();

    useEffect(() => {
        if (initialised) {
            setComponentInitialized(true);
        }
    }, [initialised]);


    return (
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <a href="#" className="flex items-center">
                    <Image src="/deCertify-logo.svg" width={256} height={256} alt="deCertify Logo" />
                </a>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <div className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                {componentInitialized && address ? (
                                    <button
                                        type="button"
                                        className="inline-flex bg-gray-600 content-center place-items-center rounded-full border py-4 px-8 text-lg text-gray-100"
                                        onClick={disconnect}
                                    >Disconnect</button>
                                ) : (
                                    <button
                                        type="button"
                                        className="-flex bg-gray-600 content-center place-items-center rounded-full border py-4 px-8 text-lg text-gray-100"
                                        onClick={() =>
                                            connect().catch((e) => console.log((e as Error).message))
                                        }
                                    >Connect</button>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NewHeader