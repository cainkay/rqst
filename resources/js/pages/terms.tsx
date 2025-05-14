import Layout from '@/layouts/layout';
import { Head } from '@inertiajs/react';

const Terms = () => {
    return (
        <Layout hideFooter>
            <Head>
                <title>Terms & Conditions</title>
                <meta name="description" content="Terms & Conditions" />
            </Head>
            <main className="bg-black">
                <div className="text-background off-center-container bg-black py-10 md:py-30">
                    <div className="max-w-3xl space-y-5">
                        <h1 className="text-2xl font-bold uppercase">Terms & Conditions</h1>
                        <p>Effective Date: 1st May 2025</p>

                        <p className="text-lg">
                            Welcome to RQST.info. By accessing or using this website and its services, you agree to the following Terms & Conditions. If you do not agree with any part of these terms, please do not use the site or services.
                        </p>
                        
                        <div className='border-b border-background h-px max-w-sm'></div>

                        <p className="pb-2">
                            <strong className='text-lg'>1. Service Overview</strong>
                            <br /> <br />
                            RQST.info provides curated updates on public exhibitions and notices sourced from publicly available data published by
                            local government authorities (LGAs) and other organisations. Information is processed using automated systems, including
                            artificial intelligence (AI), to help users stay informed.
                        </p>

                      

                        <p className="pb-2">
                            <strong className='text-lg'>2. Information Accuracy & Use</strong>
                            <br /> <br />
                            All information on this site is derived from public sources. While we make every effort to ensure accuracy and timeliness:
                            <ul className="mt-2 list-disc space-y-1 pl-6">
                                <li>We do not guarantee the completeness or reliability of the information.</li>
                                <li>You are responsible for verifying details via the source links provided.</li>
                                <li>No investment, planning, legal, or financial decisions should be made based on our content.</li>
                                <li>RQST.info is not liable for any actions taken based on the information provided.</li>
                            </ul>
                        </p>

                        <p className="pb-2">
                            <strong className='text-lg'>3. Subscription Terms, Trials & Changes</strong>
                            <br /> <br />
                            We may update our product, membership plans, or free trial offerings at any time. Where these changes affect your active
                            subscription:
                            <ul className="mt-2 list-disc space-y-1 pl-6">
                                <li>We will notify you in advance of any material changes.</li>
                                <li>
                                    You will have the option to cancel or request a refund if the changes are not acceptable to you (see Section 4
                                    below).
                                </li>
                            </ul>
                        </p>

                        <p className="pb-2">
                            <strong className='text-lg'>4. Payments & Refunds</strong>
                            <br /> <br />
                            All subscriptions are billed in advance and handled securely via Stripe.
                        </p>

                        <p className="pb-2">
                            <strong className='text-lg'>4.1 30-Day Money-Back Guarantee</strong>
                            <br /> <br />
                            All new subscriptions come with a 30-day money-back guarantee, available once per customer. To request a refund, you must
                            contact us within 30 days of your original purchase.
                        </p>

                        <p className="pb-2">
                            <strong className='text-lg'>4.2 Refunds After 30 Days</strong>
                            <br /> <br />
                            After 30 days, subscriptions are considered locked in for the duration of the plan (monthly or annual). No refunds will be
                            offered beyond this period unless required by law. If changes to your plan are made by RQST.info and you are not
                            satisfied, you may request a refund, which will be assessed at our sole discretion on a case-by-case basis.
                        </p>

                        <p className="pb-2">
                            <strong className='text-lg'>4.3 Auto-Renewals and Cancellations</strong>
                            <br /> <br />
                            All memberships are set to auto-renew at the end of each billing cycle. You may cancel your subscription at any time via
                            your account or by contacting support. Cancellations must be made before the end of your current billing period to avoid
                            charges for the next cycle.
                        </p>

                        <p className="pb-2">
                            <strong className='text-lg'>5. AI Processing Disclaimer</strong>
                            <br /> <br />
                            We use automated tools, including artificial intelligence, to collect and summarise data. While these systems are designed
                            to improve usability, they may occasionally misinterpret data or present outdated information. Please use the provided
                            source links to verify any information before acting on it.
                        </p>

                        <p className="pb-2">
                            <strong className='text-lg'>6. Liability Disclaimer</strong>
                            <br /> <br />
                            To the fullest extent permitted by law:
                            <ul className="mt-2 list-disc space-y-1 pl-6">
                                <li>All services are provided "as is" and without warranties of any kind.</li>
                                <li>
                                    RQST.info is not liable for any loss or damage arising from your use of the site or any information contained
                                    herein.
                                </li>
                            </ul>
                        </p>

                        <p className="pb-2">
                            <strong className='text-lg'>7. Intellectual Property</strong>
                            <br /> <br />
                            All content, branding, and design elements on this site remain the intellectual property of RQST.info and may not be
                            copied, reproduced, or redistributed without prior written consent.
                        </p>

                        <p className="pb-2">
                            <strong className='text-lg'>8. Changes to Terms</strong>
                            <br /> <br />
                            These Terms & Conditions may be updated at any time. The most current version will always be published on this page.
                            Continued use of the site after updates constitutes acceptance of the revised terms.
                        </p>

                        <p className="pb-2">
                            <strong className='text-lg'>9. Governing Law</strong>
                            <br /> <br />
                            These terms are governed by the laws of New South Wales, Australia. Any disputes shall be resolved in the jurisdiction of
                            NSW courts.
                        </p>

                        <p className="pb-2">
                            <strong className='text-lg'>10. Contact Us</strong>
                            <br /> <br />
                            For questions about these Terms or to request a refund, contact:
                        </p>

                        <div className="pb-4">
                            <p>RQST.info</p>
                            <p>
                                Email:{' '}
                                <a href="mailto:hello@rqst.info" className="underline">
                                    hello@rqst.info
                                </a>
                            </p>
                            <p>
                                Website:{' '}
                                <a href="https://www.rqst.info" className="underline">
                                    www.rqst.info
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default Terms;
