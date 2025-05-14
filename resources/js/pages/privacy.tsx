import Layout from '@/layouts/layout';
import { Head } from '@inertiajs/react';

const Privacy = () => {
    return (
        <Layout hideFooter>
            <Head>
                <title>Privacy Policy</title>
                <meta name="description" content="Privacy Policy" />
            </Head>
            <main className="bg-black">
                <div className="text-background off-center-container bg-black py-10 md:py-30">
                    <div className="max-w-3xl space-y-5">
                        <h1 className="text-2xl font-bold uppercase">Privacy Policy</h1>
                        <p>Effective Date: 1st May 2025</p>

                        <p className="text-lg">
                          At RQST.info, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).
                        </p>
                        
                        <div className='border-b border-background h-px max-w-sm'></div>

                        <p className="pb-2">
                            <strong className='text-lg'>1. What Information We Collect</strong>
                            <br /> <br />
                            We collect the following types of personal information:
                            <br /> <br />
                            General users:
                            <ul className="mt-2 list-disc space-y-1 pl-6">
                                <li>Name and email address (if you sign up for updates or contact us)</li>
                                <li>Website usage data (via cookies and analytics tools)</li>
                            </ul>
                            <br />
                            Subscribers to paid services:
                            <ul className="mt-2 list-disc space-y-1 pl-6">
                                <li>Full name and email address</li>
                                <li>Billing address</li>
                                <li>Subscription and usage preferences</li>
                                <li>Email engagement data (opens, clicks, and interactions with emails we send)</li>
                                <li>Any other information voluntarily provided during sign-up</li>
                            </ul>
                            <br />
                            Payment details (e.g. credit card information) are not stored or processed by RQST.info. All transactions are handled by Stripe, our third-party payment processor.
                        </p>

                        <p className="pb-2">
                            <strong className='text-lg'>2. How We Collect Information</strong>
                            <br /> <br />
                            We collect information through:
                            <ul className="mt-2 list-disc space-y-1 pl-6">
                                <li>Direct input by you (e.g. subscription forms, contact forms)</li>
                                <li>Automated tools like cookies, analytics, and email tracking pixels</li>
                                <li>Third-party providers such as Stripe (for payment processing) and our email platform (for engagement data)</li>
                            </ul>
                        </p>

                        <p className="pb-2">
                            <strong className='text-lg'>3. How We Use Your Information</strong>
                            <br /> <br />
                            We use your personal information to:
                            <ul className="mt-2 list-disc space-y-1 pl-6">
                                <li>Provide and manage subscriptions</li>
                                <li>Send email updates, alerts, and newsletters</li>
                                <li>Monitor and improve email communications through engagement tracking</li>
                                <li>Improve site functionality and user experience</li>
                                <li>Comply with legal obligations</li>
                            </ul>
                            <br />
                            We do not sell or rent your personal information to third parties.
                        </p>

                        <p className="pb-2">
                            <strong className='text-lg'>4. Payments via Stripe</strong>
                            <br /> <br />
                            All payments for subscriptions are securely processed by Stripe. Your payment details are entered directly into Stripe's platform and are not stored by RQST.info. For more information, see Stripe's Privacy Policy.
                        </p>

                        <p className="pb-2">
                            <strong className='text-lg'>5. Email Engagement Tracking</strong>
                            <br /> <br />
                            We track how subscribers interact with our emails, including whether you open them and which links you click. This helps us improve the relevance and quality of our communications. You can unsubscribe at any time by clicking the unsubscribe link in any email we send.
                        </p>

                        <p className="pb-2">
                            <strong className='text-lg'>6. Disclosure of Personal Information</strong>
                            <br /> <br />
                            We may share your information with:
                            <ul className="mt-2 list-disc space-y-1 pl-6">
                                <li>Service providers (e.g. Stripe, email delivery platforms) who help us operate the site and deliver services</li>
                                <li>Authorities or regulators if legally required</li>
                            </ul>
                            <br />
                            All providers we use are selected for their privacy and security standards.
                        </p>

                        <p className="pb-2">
                            <strong className='text-lg'>7. Data Security</strong>
                            <br /> <br />
                            We take reasonable steps to ensure your personal information is protected from misuse, interference, loss, unauthorised access, modification, or disclosure. Data is stored using secure infrastructure based in Australia or by trusted international providers with appropriate safeguards.
                        </p>

                        <p className="pb-2">
                            <strong className='text-lg'>8. Cookies and Website Analytics</strong>
                            <br /> <br />
                            We use cookies and third-party tools (like Google Analytics) to collect anonymised usage data to help us understand how visitors use the site. You can manage cookies in your browser settings.
                        </p>

                        <p className="pb-2">
                            <strong className='text-lg'>9. Accessing or Updating Your Information</strong>
                            <br /> <br />
                            You may request access to or correction of your personal information by contacting us at hello@rqst.info. We will respond within a reasonable timeframe.
                        </p>

                        <p className="pb-2">
                            <strong className='text-lg'>10. External Links</strong>
                            <br /> <br />
                            Our site may include links to other websites. We are not responsible for the privacy practices or content of those external sites.
                        </p>

                        <p className="pb-2">
                            <strong className='text-lg'>11. Changes to This Policy</strong>
                            <br /> <br />
                            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.
                        </p>

                        <p className="pb-2">
                            <strong className='text-lg'>12. Contact Us</strong>
                            <br /> <br />
                            For any questions or concerns about this Privacy Policy or your personal information, please contact:
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

export default Privacy;