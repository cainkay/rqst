import Layout from '@/layouts/layout';
import { Head } from '@inertiajs/react';

const Subscribe = () => {
    return (
        <Layout>
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
                </div>
            </main>
        </Layout>
    );
};

export default Subscribe;
