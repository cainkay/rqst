import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Layout from '@/layouts/layout';

type RegisterForm = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <Layout>
            <Head title="Register" />
            <main className="bg-black">
                <section className="text-background off-center-container py-10 md:py-30">
                    <Heading className="text-outline-light font-bold text-black">FREE PLAN</Heading>

                    <form className="flex flex-col gap-6 text-black" onSubmit={submit}>
                        <div className="grid grid-cols-2">
                            <div className="grid gap-2">
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="first_name"
                                    value={data.first_name}
                                    onChange={(e) => setData('first_name', e.target.value)}
                                    disabled={processing}
                                    placeholder="first name"
                                />
                                <InputError message={errors.first_name} className="mt-2" />
                            </div>
                            <div className="grid gap-2">
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    tabIndex={2}
                                    autoComplete="last_name"
                                    value={data.last_name}
                                    onChange={(e) => setData('last_name', e.target.value)}
                                    disabled={processing}
                                    placeholder="last name"
                                />
                                <InputError message={errors.first_name} className="mt-2" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2">
                            <div className="grid gap-2">
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={3}
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    disabled={processing}
                                    placeholder="email"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    disabled={processing}
                                    placeholder="password"
                                />
                                <InputError message={errors.password} />
                            </div>
                       
                        </div>

               
                        <Button type="submit" className="mt-2 w-full" tabIndex={6} disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Create account
                        </Button>

                        <div className="text-muted-foreground text-center text-sm">
                            Already have an account?{' '}
                            <TextLink href={route('login')} tabIndex={7}>
                                Log in
                            </TextLink>
                        </div>
                    </form>
                </section>
            </main>
        </Layout>
    );
}
