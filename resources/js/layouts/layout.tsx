import PaywallDialog from '@/components/auth/paywall-dialog';
import React from 'react';
import Footer from './footer';
import Header from './header';

interface Props {
    children: React.ReactNode;
    hideFooter?: boolean;
    hideDetails?: boolean;
}
const Layout = ({ children, hideFooter, hideDetails = false }: Props) => {
    return (
        <>
            <Header />
            {children}
            {!hideFooter && <Footer hideDetails={hideDetails} />}
            <PaywallDialog />
        </>
    );
};

export default Layout;
