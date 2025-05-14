import { Button } from '@/components/ui/button';
import Layout from '@/layouts/layout';
import { Head } from '@inertiajs/react';
import React, { useCallback, useEffect, useState } from 'react';

interface Props {
    status: number;
}

const randomRemarks = [
    'Have you tried turning it off and on again?',
    "Even our AI couldn't find this page!",
    "This page is playing hide and seek. It's winning.",
    'Looks like our Stream needs a compass.',
    'Our algorithms are still learning geography.',
];

const ErrorPage: React.FC<Props> = ({ status }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [remarkIndex, setRemarkIndex] = useState(0);

    const title =
        {
            404: 'Lost in the Data Stream',
            500: 'Server Error',
            503: 'Service Unavailable',
            403: 'Forbidden Territory',
            401: 'Unauthorized Access',
            // Default fallback for any other status code
            default: 'Unexpected Error',
        }[status] || 'Unexpected Error';

    const description =
        {
            404: "Looks like this Stream dried up! The page you're looking for has gone with the flow somewhere else.",
            500: "Our AI had a moment. We're teaching it better manners as we speak.",
            503: "We're upgrading our Streams! Please paddle back later.",
            403: 'This Stream is off-limits. Even AI knows some boundaries.',
            401: 'Please log in to access this Stream of information.',
            default: 'Something unexpected happened. Our team is investigating.',
        }[status] || 'Something unexpected happened. Our team is investigating.';

    // Function to cycle through remarks
    const cycleRemark = useCallback(() => {
        setIsAnimating(true);

        setTimeout(() => {
            setRemarkIndex((prevIndex) => (prevIndex + 1) % randomRemarks.length);
            setIsAnimating(false);
        }, 500);
    }, []);

    useEffect(() => {
        // Initial animation
        setIsAnimating(true);
        const initialTimer = setTimeout(() => setIsAnimating(false), 1000);

        // Set up interval for cycling through remarks
        const remarkInterval = setInterval(cycleRemark, 5000);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(remarkInterval);
        };
    }, [cycleRemark]);

    return (
        <Layout>
            <Head title={`${status} - ${title}`} />
            <div className="relative flex min-h-[90svh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 to-black px-4 text-center text-white">
                <div className={`scale-100 opacity-100 transition-all duration-700`}>
                    <h1 className="mb-2 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-7xl font-bold text-transparent md:text-9xl">
                        {status}
                    </h1>
                    <h2 className="mb-4 text-2xl font-bold md:text-4xl">{title}</h2>
                    <p className="mx-auto mb-6 max-w-lg text-lg text-gray-300 md:text-xl">{description}</p>

                    <div className="flex h-16 items-center justify-center">
                        <p
                            className={`mb-8 cursor-pointer text-lg font-medium italic transition-all duration-500 ${isAnimating ? '-translate-y-4 transform opacity-0' : 'translate-y-0 transform opacity-100'}`}
                            onClick={cycleRemark}
                        >
                            {randomRemarks[remarkIndex]}
                        </p>
                    </div>

                    <div className="mb-8 flex flex-col justify-center gap-4 sm:flex-row">
                        <Button asChild>
                            <a href="/" className="rounded-md text-white">
                                Return Home
                            </a>
                        </Button>
                        <Button variant="outline" onClick={() => setShowHelp(!showHelp)}>
                            Need Help?
                        </Button>
                    </div>

                    {showHelp && (
                        <div className="animate-fadeIn mx-auto mb-8 max-w-lg rounded-lg border border-blue-500/50 bg-blue-900/20 p-4 text-left shadow-lg shadow-blue-500/20 backdrop-blur-sm">
                            <h3 className="mb-2 text-xl font-bold">Try these options:</h3>
                            <ul className="list-disc space-y-2 pl-5 text-gray-300">
                                <li>Check the URL for typos</li>
                                <li>
                                    Go back to our{' '}
                                    <a href="/" className="text-blue-400 hover:underline">
                                        homepage
                                    </a>
                                </li>
                                <li>
                                    Contact us at <span className="text-blue-400">hello@rqst.info</span>
                                </li>
                                <li>Try refreshing the page</li>
                            </ul>
                        </div>
                    )}
                </div>

                {/* Water animation with actual styles */}
                <div className="absolute bottom-0 left-0 h-24 w-full overflow-hidden opacity-30">
                    <div className="water-wave"></div>
                </div>
            </div>
        </Layout>
    );
};

export default ErrorPage;
