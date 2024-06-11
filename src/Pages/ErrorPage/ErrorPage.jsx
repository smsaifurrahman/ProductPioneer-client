import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div>
            <section className="bg-white dark:bg-gray-900">
    <div className="container flex items-center justify-center min-h-screen px-6 py-12 mx-auto">
        <div className="w-full">
            <div className="flex flex-col items-center max-w-lg mx-auto text-center">
                <p className="text-2xl font-medium text-red-500 dark:text-blue-400">404 error</p>
                <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">We lost this page</h1>
                <p className="mt-4 text-gray-500 dark:text-gray-400">We searched high and low, but couldn’t find what you’re looking for. Let’s find a better place for you to go.</p>

                <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
                    

                    <Link to={'/'} className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                        Take me home
                    </Link>
                </div>
            </div>

           
        </div>
    </div>
</section>

        </div>
    );
};

export default ErrorPage;