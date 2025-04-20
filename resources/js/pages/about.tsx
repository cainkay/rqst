import Layout from '@/layouts/layout';
import { Head } from '@inertiajs/react';

const About = () => {
    return (
        <Layout hideFooter>
            <Head>
                <title>About</title>
                <meta name="description" content="About RQST" />
                <link rel="canonical" href="/about" />
            </Head>
            <main className="bg-black">
                <div className="text-background off-center-container bg-black py-10 md:py-30">
                    <div className="max-w-3xl space-y-5">
                        <h1 className="text-2xl font-bold">ABOUT RQST STREAMS</h1>
                        <p className="text-2xl">
                            This service is Streams by RQST it simplifies access to essential publicly available information mandated by Australian
                            federal and state governments—including development applications, tenders, and land-use notices.
                        </p>
                        <p className="text-lg">
                            Streams is for engineers, architects, urban planners, environmental consultants, community groups and many others. Quickly
                            find, save, and track notifications relevant to your interests, and receive personalised updates directly to your inbox.
                            Stay effortlessly informed by signing up—it's free, simple, and designed to put critical information at your fingertips.
                        </p>
                        <p className="text-lg">
                            We offer a wide range of flexible AI powered solutions for organisations, whether you want your own private Stream or to
                            create content for your customer base our AI solutions can help. If you would like more info about Streams by RQST and how
                            it could help your organisation get in touch: hello@rqst.info
                        </p>
                        <div className="border-background h-1 max-w-xs border-b"></div>
                        <h2 className="text-2xl font-bold">ABOUT RQST</h2>
                        <p className="text-2xl">
                            We're an AI focused marketing agency. We have a range of solutions for businesses looking at ways to automate the process
                            of getting, keeping and growing customers. Click here to learn more.
                        </p>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default About;
