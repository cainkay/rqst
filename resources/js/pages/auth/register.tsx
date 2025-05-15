import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Layout from '@/layouts/layout';
import { useGlobalStore } from '@/store/global';

type RegisterForm = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    type: string;
};

export default function Register() {

    const params = new URLSearchParams(window.location.search)?.get('type') || 'free';

    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        type: params,
    });

    const { setShowLoginMenu } = useGlobalStore();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <Layout hideFooter>
            <Head title="Register" />
            <main className="bg-black">
                <section className="text-background off-center-container py-10 md:py-30">
                    <div className="mb-4 max-w-3xl space-y-4">
                        {params === 'full' ? (
                            <>
                                <Heading className="text-outline-light font-bold text-black">JOIN</Heading>
                                <p className="text-background text-balance">
                                    Unlimited access to past releases, powerful filters by date, LGA, state and category, and customise your daily
                                    email notifications.
                                </p>
                                <p className="text-2xl font-bold uppercase">
                                    first you need to sign up or &nbsp;
                                    <span role="button" onClick={() => setShowLoginMenu(true)} className="text-background underline">
                                        login
                                    </span>
                                </p>
                            </>
                        ) : (
                            <>
                                <Heading className="text-outline-light font-bold text-black">FREE PLAN</Heading>
                                <p className="text-background text-balance">
                                    Get daily email alerts and instant access to today&apos;s releases. As a bonus, you&apos;ll also unlock 14 days of
                                    full access — including filters, history, and saved releases.
                                </p>

                                <p className="text-2xl font-bold">SUBSCRIBE NOW</p>
                            </>
                        )}
                    </div>

                    <form className="flex max-w-xl flex-col gap-6 text-black" onSubmit={submit}>
                        <div className="grid grid-cols-2 gap-4">
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

                        <div className="grid grid-cols-2 gap-4">
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

                        <p className="text-background">
                            I have read and agree to the{' '}
                            <TextLink href="/terms-of-service" className="text-background underline" tabIndex={5}>
                                terms & conditions
                            </TextLink>{' '}
                            and{' '}
                            <TextLink href="/privacy-policy" className="text-background underline" tabIndex={5}>
                                privacy policy
                            </TextLink>
                        </p>

                        <Button type="submit" className="mt-2 max-w-32 rounded-full" tabIndex={6} disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            SIGN UP
                        </Button>
                    </form>
                </section>
            </main>
        </Layout>
    );
}
