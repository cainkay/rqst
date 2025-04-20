import { forwardRef, useState } from 'react';
import ForgotPassword from './forgot-password';
import Login from './login';

interface Props {
    onClose?: () => void;
}

const Authenticate = forwardRef<HTMLDivElement, Props>(({
    onClose
}, ref) => {
    const [forgotPassword, setForgotPassword] = useState(false);

    const handleForgotPassword = (value: boolean) => {
        setForgotPassword(value);
    };
    
    return (
        <div
            ref={ref}
            className="absolute right-0 z-50 w-full origin-top-right transform border bg-black shadow-xl transition-all duration-300"
            style={{ top: '100%' }}
        >
            {forgotPassword ? (
                <ForgotPassword action={handleForgotPassword} /> 
            ) : (
                <Login action={handleForgotPassword} 
                onClose={onClose}
                />
            )}
        </div>
    );
});

Authenticate.displayName = 'Authenticate';

export default Authenticate;