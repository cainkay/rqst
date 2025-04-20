import React from 'react';
import Footer from './footer';
import Header from './header';

interface Props {
    children: React.ReactNode;
    trueCenter?: boolean;
    hideFooter?: boolean;
}
const Layout = ({ children, trueCenter, hideFooter }: Props) => {
    return (
        <>
            <Header trueCenter={trueCenter} />
            {children}
            {!hideFooter && <Footer />}
        </>
    );
};

export default Layout;
