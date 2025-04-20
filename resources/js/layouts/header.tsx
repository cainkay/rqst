import SiteLogo from '@/components/icons/site-logo';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

const routes = [
    { name: 'about', path: '/about' },
    { name: 'streams', path: '/streams' },
];

interface Props {
    trueCenter?: boolean;
}
const Header = ({ trueCenter }: Props) => {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    console.log('🚀 ~ Header ~ auth:', auth);

    return (
        <header className="bg-background border-b">
            <div className="flex items-center justify-between max-w-[1500px] m-auto">
                <Link
                    href={route('home')}
                    className="btn btn-primary flex w-full max-w-[200px] items-center justify-center border-r lg:max-w-[201px]"
                >
                    <SiteLogo />
                </Link>
                <section className="lg:pr-10">
                    <div className="search"></div>
                    <div className="actions flex items-center gap-2">
                        {routes.map((route) => (
                            <Link key={route.name} href={route.path} className="btn btn-primary uppercase">
                                {route.name}
                            </Link>
                        ))}
                        {auth.user ? (
                            <>
                                   <Link href={route('subscribe')}>PRICING</Link>
                                <Link href={route('dashboard')} method="post">
                                    ACCOUNT
                                </Link>
                                <Link href={route('logout')} method="post" as="button">
                                    LOGOUT
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href={route('subscribe')}>SUBSCRIBE</Link>
                                <Link href={route('login')}>LOGIN</Link>
                            </>
                        )}
                    </div>
                </section>
            </div>
        </header>
    );
};

export default Header;
