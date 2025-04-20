import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import InputError from '../input-error';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};
interface Props {
    action?: (value: boolean) => void;
    onClose?: () => void;
}
const Login = ({ action, onClose } : Props) => {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onSuccess: () => {
                if(onClose) onClose()
            },
            onFinish: () => reset(),
        });
    };

    return (
        <div className="off-center-container py-10">
            <h2 className="mb-6 text-2xl font-bold text-white">LOGIN.</h2>
            <form className="flex w-full flex-col gap-6" onSubmit={submit}>
                <div className="flex flex-col gap-4 lg:flex-row">
                    <div className="grid w-full gap-2 lg:max-w-[300px]">
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email"
                        />
                      
                    </div>

                    <div className="grid w-full gap-2 lg:max-w-[300px]">
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="password"
                        />
                      
                    </div>

                    <Button type="submit" className="m-auto w-full rounded-full px-10 lg:m-0 lg:max-w-[100px]" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Log in
                    </Button>
                </div>
            </form>
            <InputError className='mt-2' message={errors.email} />
            <InputError className='mt-2' message={errors.password} />
            <p className="text-background mt-5 text-sm">
                Don't know your password?&nbsp;
                <Button variant="link" className="underline text-background" onClick={() => action && action(true)} >
                    Click here
                </Button>
            </p>
        </div>
    );
};

export default Login;
