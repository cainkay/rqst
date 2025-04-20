import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import InputError from '../input-error';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface Props {
    action?: (value: boolean) => void;
}
const ForgotPassword = ({ action }: Props) => {
    const [message, setMessage] = useState('');
    const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'), {
            onSuccess: () => {
              setMessage('If an account exists with that email, a password reset link will be sent.');
            },
            onError: () => {
                setMessage('');
            },
            onFinish: (response) => {
                console.log('🚀 ~ post ~ response:', response);
            },
        });
    };
    return (
        <div className="off-center-container py-10">
            <h2 className="mb-6 text-2xl font-bold text-white">FORGOT PASSWORD.</h2>
            <form onSubmit={submit}>
                <div className="flex flex-col gap-4 lg:flex-row">
                    <div className="grid w-full gap-2 lg:max-w-[300px]">
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="off"
                            value={data.email}
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@example.com"
                        />
                    </div>

                    <div className="flex items-center justify-start">
                        <Button className="w-full rounded-full" disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Email password reset link
                        </Button>
                    </div>
                </div>
            </form>
            {message && <div className="mt-2 text-green-600">{message}</div>}

            <InputError className="mt-2" message={errors.email} />

            <p className="text-background mt-5 text-sm">
                Remember your password?&nbsp;
                <Button variant="link" className="text-background underline" onClick={() => action && action(false)}>
                    Log in here
                </Button>
            </p>
        </div>
    );
};

export default ForgotPassword;
