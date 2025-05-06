import Authenticate from '@/components/auth/authenticate';
import SiteLogo from '@/components/icons/site-logo';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useFilterStore } from '@/store/filter';
import { SharedData } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

const routes = [
    { name: 'about', path: '/about' },
    { name: 'streams', path: '/stream' },
];

const Header = () => {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const [showLoginMenu, setShowLoginMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const loginButtonRef = useRef<HTMLAnchorElement>(null);
    const { searchTerm, setSearchTerm } = useFilterStore();

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                loginButtonRef.current &&
                !loginButtonRef.current.contains(event.target as Node)
            ) {
                setShowLoginMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleLoginMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowLoginMenu(!showLoginMenu);
    };

    const handlerSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.visit('/releases');
    };

    return (
        <header className="bg-background relative border-b">
            <div className="m-auto flex max-w-[1500px] items-center justify-between">
                <Link
                    href={route('home')}
                    className="btn btn-primary flex w-full max-w-[200px] items-center justify-center border-r lg:max-w-[201px]"
                >
                    <SiteLogo />
                </Link>
                <section className="lg:pr-10 flex-1 flex justify-between items-center">
                        <div className="search">
                            <form className="flex items-center gap-2" onSubmit={handlerSearch}>
                                <Input
                                    id="search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.currentTarget.value)}
                                    type="text"
                                    placeholder="Search..."
                                    className="bg-background w-full max-w-[300px] border-0 text-black focus:ring-0"
                                />
                            </form>
                        </div>
                        <div className="actions flex items-center gap-2">
                            {routes.map((route) => (
                                <Link key={route.name} href={route.path} className="btn btn-primary uppercase">
                                    {route.name}
                                </Link>
                            ))}
                            {auth.user ? (
                                <>
                               {!auth.user.subscribed &&     <Link href={route('subscribe')}>PRICING</Link>}
                                    <Link href={route('profile.edit')}>ACCOUNT</Link>
                                    <Link href={route('logout')} method="post" as="button">
                                        LOGOUT
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href={route('subscribe')}>SUBSCRIBE</Link>
                                    <a
                                        ref={loginButtonRef}
                                        href={route('login')}
                                        onClick={toggleLoginMenu}
                                        className={cn(`btn btn-primary uppercase`, showLoginMenu ? 'text-black underline' : '')}
                                    >
                                        LOGIN
                                    </a>
                                </>
                            )}
                        </div>
                </section>
            </div>

            {/* Login Mega Menu */}
            {showLoginMenu && <Authenticate onClose={() => setShowLoginMenu(false)} />}
        </header>
    );
};

export default Header;
