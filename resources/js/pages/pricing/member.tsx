import Heading from '@/components/heading';
import Layout from '@/layouts/layout';

const PricingMember = () => {
    return (
        <Layout>
            <main className="bg-black">
                <div className="off-center-container py-30">
                    <section className="text-background space-y-4">
                        <Heading className="text-outline-light font-bold text-black">FULL MEMBERSHIP</Heading>
                        <h1 className="text-3xl font-bold">UNLOCK FULL ACCESS</h1>
                        <p className="text-background max-w-lg text-2xl">
                            Unlimited access to past releases, powerful filters by date, LGA, state and category, the ability to save releases, and
                            customise your email alerts. Daily notifications are included.
                        </p>
                    </section>
                </div>
            </main>
        </Layout>
    );
};

export default PricingMember;
