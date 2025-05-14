import { Button } from '@/components/ui/button';
import Layout from '@/layouts/layout';
import { cn } from '@/lib/utils';
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
    // {
    //     feature: 'Save releases for later',
    //     freePlan: false,
    //     fullMembership: true,
    // },
    {
        feature: 'Customise email preferences',
        freePlan: false,
        fullMembership: true,
    },
];

const Subscribe = () => {
    const page = usePage<SharedData>();
    const user = page.props.auth?.user;

    return (
        <Layout hideDetails>
            <Head>
                <title>Subscribe</title>
                <meta name="description" content="Subscribe to RQST" />
                <link rel="canonical" href="/subscribe" />
            </Head>

            <main className="bg-black">
                <div className="text-background off-center-container bg-black py-10 md:py-30">
                    <div className="max-w-3xl">
                        <h1 className="mb-4 text-2xl font-bold uppercase">Subscribe to rqst</h1>
                        <p className="text-lg">
                            Stay informed with the latest releases — or go deeper with full access, filters, and personalisation.
                        </p>
                    </div>
                    <table className="hidden w-full max-w-5xl lg:table">
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
                            <tr className="border-background border-b">
                                <td className="align-top text-2xl font-bold">Price</td>
                                <td className="pb-4 text-2xl">
                                    <p className="text-2xl font-bold">$0</p>

                                    {user ? (
                                        <>
                                            {user.is_free_trial && (
                                                <Button asChild variant={'outline'} className="text-background w-30 rounded-full bg-black">
                                                    <Link href="#">CURRENT</Link>
                                                </Button>
                                            )}
                                        </>
                                    ) : (
                                        <Button asChild className="w-30 rounded-full">
                                            <Link href={'/register'}>SIGN UP</Link>
                                        </Button>
                                    )}
                                </td>
                                <td className="pb-4">
                                    <div className="flex items-center gap-2">
                                        <p className="text-2xl font-bold">$99</p>
                                        <p className="max-w-24 text-xs leading-2.5">/month (inc gst) Cancel anytime</p>
                                    </div>

                                    <Button asChild className="w-30 rounded-full">
                                        <Link href={user ? route('checkout') : '/register?type=full'} method={user ? 'post' : 'get'}>
                                            JOIN
                                        </Link>
                                    </Button>
                                </td>
                            </tr>
                            {planMatrix.map((item, index) => (
                                <tr key={index} className="border-background border-b font-thin">
                                    <td className="py-4 text-2xl">{item.feature}</td>
                                    <td className="text-center text-2xl">{item.freePlan ? <CheckMark /> : <CrossMark />}</td>
                                    <td className="text-center text-2xl">{item.fullMembership ? <CheckMark /> : <CrossMark />}</td>
                                </tr>
                            ))}
                            <tr className="border-background border-b font-thin">
                                <td className="py-4 text-2xl">Free trial</td>
                                <td className="text-center text-2xl">
                                    <div className="flex items-center gap-1">
                                        <CheckMark />
                                        <p className="max-w-16 text-left text-xs leading-2.5">14-days full access</p>
                                    </div>
                                </td>
                                <td className="text-center text-2xl">
                                    <div className="flex items-center gap-1">
                                        <CheckMark />
                                        <p className="max-w-24 text-left text-xs leading-2.5">30-day money-back guarantee</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="mt-6 block space-y-6 lg:hidden">
                        <h2 className="mb-4 text-2xl font-bold uppercase">FREE PLAN - $0.00</h2>
                        {user ? (
                            <>
                                {user.is_free_trial && (
                                    <Button asChild variant={'outline'} className="text-background w-30 rounded-full bg-black">
                                        <Link href="#">CURRENT</Link>
                                    </Button>
                                )}
                            </>
                        ) : (
                            <Button asChild className="w-30 rounded-full">
                                <Link href={'/register'}>SIGN UP</Link>
                            </Button>
                        )}

                        <section className="mt-4">
                            {planMatrix
                                .filter((item) => item.freePlan)
                                .map((item, index) => (
                                    <p
                                        className={cn('border-background border-b border-dashed py-4 font-thin', index === 0 && 'border-t')}
                                        key={index}
                                    >
                                        {item.feature}
                                    </p>
                                ))}
                            <p className={cn('border-background border-b py-4 font-thin')}>Free 14-day trial of full Membership</p>
                        </section>
                        <h2 className="mb-4 text-2xl font-bold uppercase">Full Membership - $99</h2>
                        <Button asChild className="w-30 rounded-full">
                            <Link href={user ? route('checkout') : '/register?type=full'} method={user ? 'post' : 'get'}>
                                JOIN
                            </Link>
                        </Button>

                        <section className="mt-4 mb-10">
                            {planMatrix.map((item, index) => (
                                <p className={cn('border-background border-b border-dashed py-4 font-thin', index === 0 && 'border-t')} key={index}>
                                    {item.feature}
                                </p>
                            ))}
                        </section>
                    </div>
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
