import { useGlobalStore } from '@/store/global';
import { useState } from 'react';
import ForgotPassword from './forgot-password';
import Login from './login';

const Authenticate = () => {
    const [forgotPassword, setForgotPassword] = useState(false);
    const { setShowLoginMenu } = useGlobalStore();

    const handleForgotPassword = (value: boolean) => {
        setForgotPassword(value);
    };

    return (
        <div
            className="absolute right-0 z-50 w-full origin-top-right transform border bg-black shadow-xl transition-all duration-300"
            style={{ top: '100%' }}
        >
            {forgotPassword ? (
                <ForgotPassword action={handleForgotPassword} />
            ) : (
                <Login action={handleForgotPassword} onClose={() => setShowLoginMenu(false)} />
            )}
        </div>
    );
};

Authenticate.displayName = 'Authenticate';

export default Authenticate;
