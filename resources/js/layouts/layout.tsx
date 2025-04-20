import React from 'react';
import Header from './header';
import Footer from './footer';

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
       {!hideFooter &&     <Footer/>}
        </>
    );
};

export default Layout;
