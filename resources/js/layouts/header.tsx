import Authenticate from '@/components/auth/authenticate';
import BurgerIcon from '@/components/icons/burger-icon';
import MinusIcon from '@/components/icons/minus-icon';
import SearchIcon from '@/components/icons/search-icon';
import SiteLogo from '@/components/icons/site-logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useFilterStore } from '@/store/filter';
import { useGlobalStore } from '@/store/global';
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
    const searchInputRef = useRef<HTMLInputElement>(null);
    const { setSearchTerm, clearFilters } = useFilterStore();
    const [keyword, setKeyword] = useState('');
    const [searchActive, setSearchActive] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const { displayPaywall } = useGlobalStore();

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

    // Focus input when search becomes active
    useEffect(() => {
        if (searchActive && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [searchActive]);

    const toggleLoginMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowLoginMenu(!showLoginMenu);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (keyword.trim()) {
            clearFilters();
            setSearchTerm(keyword);
            router.visit('/releases');
        }
    };

    const toggleSearch = () => {
        if (!auth || !auth?.user?.subscribed) {
            displayPaywall(true);
            return;
        }
        setSearchActive(!searchActive);
        if (!searchActive) {
            // Reset keyword when opening search
            setKeyword('');
            setShowMobileMenu(false);
        }
    };

    const handleToggleMobileMenu = (value: boolean) => {

        if (value) {
            setSearchActive(false);
        }
        setShowLoginMenu(false);
        setShowMobileMenu(value);
    };

    // Handle escape key to close search
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            setSearchActive(false);
        }
    };

    const searchElement = (
        <form className={cn('flex w-full items-center', searchActive ? 'bg-white' : 'w-10')} onSubmit={handleSearch}>
            <div
                className={cn('overflow-hidden transition-all duration-300 ease-in-out', searchActive ? 'mr-2 flex-1 opacity-100' : 'w-0 opacity-0')}
            >
                <Input
                    ref={searchInputRef}
                    id="search"
                    value={keyword}
                    onChange={(e) => setKeyword(e.currentTarget.value)}
                    onKeyDown={handleKeyDown}
                    type="text"
                    placeholder="Type here to search..."
                    className="w-full border-0 text-black focus:ring-0"
                />
            </div>

            <Button
                type={searchActive ? 'submit' : 'button'}
                onClick={searchActive ? undefined : toggleSearch}
                variant="dark"
                className={cn('min-w-10 rounded-none transition-transform duration-300', searchActive ? 'translate-x-0' : '')}
                aria-label={searchActive ? 'Submit search' : 'Open search'}
            >
                <SearchIcon className="h-6! w-6!" />
            </Button>
        </form>
    );

    const linkElement = (
        <>
            {routes.map((route) => (
                <Link key={route.name} href={route.path} className="btn btn-primary uppercase">
                    {route.name}
                </Link>
            ))}
            {auth?.user ? (
                <>
                    {auth?.user?.is_free_trial && <Link href={route('subscribe')}>PRICING</Link>}
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
        </>
    );

    return (
        <header className="bg-background sticky top-0 border-b z-10">
            <div className="m-auto flex max-w-[1500px] items-center justify-between">
                <Link
                    href={route('home')}
                    className="btn btn-primary flex w-full max-w-[160px] items-center justify-center lg:max-w-[201px] lg:border-r"
                >
                    <SiteLogo />
                </Link>
                <section className="hidden flex-1 items-center justify-between lg:flex lg:pr-10">
                    <div className="search relative flex items-center">
                        <div
                            className={cn(
                                'ml-10 flex items-center overflow-hidden transition-all duration-300 ease-in-out',
                                searchActive ? 'w-64' : 'w-10',
                            )}
                        >
                            {searchElement}
                        </div>
                    </div>
                    <div className="actions flex items-center gap-2">{linkElement}</div>
                </section>

                <section className="flex items-center lg:hidden">
                    <Button
                        variant={'dark'}
                        onClick={toggleSearch}
                        className={cn('relative h-16 w-16 overflow-hidden rounded-none', searchActive ? 'text-background bg-black' : '')}
                    >
                        <SearchIcon className="h-6! w-6!" />
                    </Button>
                    <Button
                        onClick={() => handleToggleMobileMenu(!showMobileMenu)}
                        variant={'dark'}
                        className={cn('relative h-16 w-16 overflow-hidden rounded-none', showMobileMenu ? 'text-background bg-black' : '')}
                    >
                        <div className="relative">
                            {/* Burger Icon */}
                            <div
                                className={cn(
                                    'absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out',
                                    showMobileMenu ? 'scale-75 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100',
                                )}
                            >
                                <BurgerIcon className="h-6! w-6!" />
                            </div>

                            {/* Minus Icon */}
                            <div
                                className={cn(
                                    'absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out',
                                    showMobileMenu ? 'scale-100 rotate-0 opacity-100' : 'scale-75 rotate-90 opacity-0',
                                )}
                            >
                                <MinusIcon className="h-6! w-6!" />
                            </div>
                        </div>
                    </Button>
                </section>
                {/* Mobile Menu */}
            </div>
            {showMobileMenu && (
                <div
                    className="absolute right-0 z-50 w-full origin-top-right transform border bg-black shadow-xl transition-all duration-300 lg:hidden px-5 py-10 flex-col flex items-center gap-5 text-background text-2xl"
                    style={{ top: '100%' }}
                >
                    {linkElement}
                </div>
            )}
            {searchActive && (
                <div
                    className="absolute right-0 z-50 block w-full origin-top-right transform border bg-black px-5 py-10 shadow-xl transition-all duration-300 lg:hidden"
                    style={{ top: '100%' }}
                >
                    {searchElement}
                </div>
            )}

            {/* Login Mega Menu */}
            {showLoginMenu && <Authenticate onClose={() => setShowLoginMenu(false)} />}
        </header>
    );
};

export default Header;
