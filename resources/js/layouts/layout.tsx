import React from 'react';
import Footer from './footer';
import Header from './header';

interface Props {
    children: React.ReactNode;
    hideFooter?: boolean;
}
const Layout = ({ children,  hideFooter }: Props) => {
    return (
        <>
            <Header />
            {children}
            {!hideFooter && <Footer />}
        </>
    );
};

export default Layout;
