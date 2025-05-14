import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

const Footer = ({ hideDetails = false }: { hideDetails?: boolean }) => {
    const page = usePage<SharedData>();
    const user = page.props.auth?.user;

    return (
        <footer className="bg-black">
            {!hideDetails && <>{user ? <>{user.is_free_trial && <Message free={false} />}</> : <Message free={true} />}</>}
            <section className="lg:off-center-container">
                <p className="text-background border-background border-x border-t px-10 py-5 uppercase">
                    &copy; RQST.INFO {new Date().getFullYear()}. <Link href="/privacy-policy">Privacy Policy. </Link>{' '}
                    <Link href="/terms-of-service">Terms of Service. </Link>
                    <Link href="/contact">GET IN TOUCH </Link>
                </p>
            </section>
        </footer>
    );
};
export default Footer;
const Message = ({ free }: { free: boolean }) => {
    return (
        <section className="off-center-container flex flex-col lg:flex-row">
            <div className="text-background border-background flex-1 py-10 lg:border-r lg:p-8">
                <p className="text-3xl font-semibold">{free ? 'You are seeing the 5 most recent releases' : 'Want more?'}</p>
                <p className="text-2xl">
                    {free ? (
                        <>
                            {' '}
                            You're seeing the 5 most recent releases <br />
                            Sign up free to see more!
                        </>
                    ) : (
                        <>
                            Full members can access all previous streams, search and filter by date, LGA, state and category, save releases, and
                            customise email notifications to suit your needs.
                        </>
                    )}
                </p>

                <Button asChild className="mt-4 rounded-full px-8 uppercase">
                    <Link href="/subscribe">{free ? 'Subscribe free now' : 'Learn more'}</Link>
                </Button>
            </div>
            <Heading className="text-outline-light hidden w-full items-center font-bold text-balance text-black lg:flex lg:max-w-[500px] lg:p-8">
                {free ? 'SUBSCRIBE FREE' : ' JOIN NOW'}
            </Heading>
        </section>
    );
};
