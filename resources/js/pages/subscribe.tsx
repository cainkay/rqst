import { Button } from '@/components/ui/button';
import Layout from '@/layouts/layout';
import { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { CheckIcon, XIcon } from 'lucide-react';

const planMatrix = [
    {
        feature: 'Daily mail alerts',
        freePlan: true,
        fullMembership: true,
    },
    {
        feature: 'Access today’s releases',
        freePlan: true,
        fullMembership: true,
    },
    {
        feature: 'Full access to release history',
        freePlan: false,
        fullMembership: true,
    },
    {
        feature: 'Search all releases',
        freePlan: false,
        fullMembership: true,
    },
    {
        feature: 'Filter by date, LGA, state & category',
        freePlan: false,
        fullMembership: true,
    },
    {
        feature: 'Save releases for later',
        freePlan: false,
        fullMembership: true,
    },
    {
        feature: 'Customise email preferences',
        freePlan: false,
        fullMembership: true,
    },
];

const Subscribe = () => {
    const page = usePage<SharedData>();
    const { auth } = page.props;

    return (
        <Layout hideDetails>
            <Head>
                <title>Subscribe</title>
                <meta name="description" content="Subscribe to RQST" />
                <link rel="canonical" href="/subscribe" />
            </Head>

            <main className="bg-black">
                <div className="text-background off-center-container bg-black py-10 md:py-30">
                    <div className="max-w-4xl">
                        <h1 className="mb-4 text-2xl font-bold">ABOUT RQST STREAMS</h1>
                        <p className="text-lg">
                            Stay informed with the latest releases — or go deeper with full access, filters, and personalisation.
                        </p>
                    </div>
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <td className="py-4 text-2xl font-bold">Feature</td>
                                <td className="text-2xl">
                                    <p className="font-bold">Free Plan</p>
                                </td>
                                <td className="text-2xl">
                                    <p className="font-bold">Full Membership</p>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-4 text-2xl font-bold">Price</td>
                                <td className="text-2xl">
                                    <p className="text-2xl font-bold">$0</p>

                                    {auth.user ? (
                                        <>
                                            {!auth.user.subscribed && (
                                                <Button asChild variant={'outline'} className="text-background w-30 rounded-full bg-black">
                                                    <Link href="#">CURRENT</Link>
                                                </Button>
                                            )}
                                        </>
                                    ) : (
                                        <Button asChild className="w-30 rounded-full">
                                            <Link href={'/register'}>JOIN</Link>
                                        </Button>
                                    )}
                                </td>
                                <td className=" ">
                                    <div className="flex items-center gap-2">
                                        <p className="text-2xl font-bold">$99</p>
                                        <p className="max-w-24 text-xs leading-2.5">/month (inc gst) Cancel anytime</p>
                                    </div>

                                    <Button asChild className="w-30 rounded-full">
                                        <a  href={auth?.user ? '/checkout' : '/register?type=full'} referrerPolicy='no-referrer'>JOIN</a>
                                    </Button>
                                </td>
                            </tr>
                            {planMatrix.map((item, index) => (
                                <tr key={index} className="border-background border-b">
                                    <td className="py-4 text-2xl">{item.feature}</td>
                                    <td className="text-center text-2xl">{item.freePlan ? <CheckMark /> : <CrossMark />}</td>
                                    <td className="text-center text-2xl">{item.fullMembership ? <CheckMark /> : <CrossMark />}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </Layout>
    );
};

export default Subscribe;

const CheckMark = () => {
    return (
        <div className="bg-background flex h-6 w-6 items-center justify-center rounded-xs">
            <CheckIcon className="h-4 w-4 text-black" />
        </div>
    );
};

const CrossMark = () => {
    return (
        <div className="border-background flex h-6 w-6 items-center justify-center rounded-xs border bg-black">
            <XIcon className="text-background h-4 w-4" />
        </div>
    );
};
