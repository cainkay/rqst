import { type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Layout from '@/layouts/layout';
import { State } from '@/types/state';
import { Category } from '@/types/stream';
import Password from './password';
import UserPreferences from './preferences';

type ProfileForm = {
    first_name: string;
    last_name: string;
    email?: string;
};

interface Props {
    mustVerifyEmail: boolean;
    status?: string;
    categories: number[];
    app_categories: Category[];
    states: number[];
    app_states: State[];
    app_lgas: State[];
    lgas: number[];
}

export default function Profile({ mustVerifyEmail, status, categories, app_categories, states, app_states, lgas, app_lgas }: Props) {
    console.log('🚀 ~ Profile ~ app_categories:', app_categories);
    console.log('🚀 ~ Profile ~ categories:', categories);
    const user = usePage<SharedData>().props.auth?.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
        first_name: user!.first_name,
        last_name: user!.last_name,
        email: user!.email,
    });
    console.log('🚀 ~ Profile ~ errors:', errors);
    console.log('🚀 ~ Profile ~ data:', data);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <Layout hideFooter>
            <Head title="Profile settings" />
            <main className="text-background bg-black">
                <section className="text-background off-center-container py-10 md:py-30">
                    <div className="max-w-xl space-y-6">
                        <Heading className="text-outline-light font-bold text-black">ACCOUNT</Heading>

                        <div className="mb-4 grid gap-2">
                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block text-black"
                                value={data.email}
                                readOnly
                                disabled
                                autoComplete="username"
                                placeholder="Email address"
                            />

                            <InputError className="mt-2" message={errors.email} />
                        </div>
                        <form onSubmit={submit} className="space-y-4">
                            {mustVerifyEmail && user?.email_verified_at === null && (
                                <div className="space-y-4">
                                    <p className="text-background text-sm">
                                        Your email address is unverified.{' '}
                                        <Link
                                            href={route('verification.send')}
                                            method="post"
                                            as="button"
                                            className="text-background underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                        >
                                            Click here to resend the verification email.
                                        </Link>
                                    </p>

                                    {status === 'verification-link-sent' && (
                                        <div className="mt-2 text-sm font-medium text-green-600">
                                            A new verification link has been sent to your email address.
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Input
                                        id="name"
                                        className="mt-1 block text-black"
                                        value={data.first_name}
                                        onChange={(e) => setData('first_name', e.currentTarget.value)}
                                        required
                                        autoComplete="name"
                                        placeholder="Full name"
                                    />
                                    <InputError className="mt-2" message={errors.first_name} />
                                </div>
                                <div className="grid gap-2">
                                    <Input
                                        id="name"
                                        className="mt-1 block text-black"
                                        value={data.last_name}
                                        onChange={(e) => setData('last_name', e.currentTarget.value)}
                                        required
                                        autoComplete="name"
                                        placeholder="Full name"
                                    />

                                    <InputError className="mt-2" message={errors.last_name} />
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Button className="rounded-full" disabled={processing}>
                                    Save details
                                </Button>

                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-green-500">Saved</p>
                                </Transition>
                            </div>
                        </form>
                    </div>

                    <Password />

                    <UserPreferences
                        lgas={lgas}
                        app_lgas={app_lgas}
                        categories={categories}
                        app_categories={app_categories}
                        states={states}
                        app_states={app_states}
                    />
                </section>
            </main>
        </Layout>
    );
}
