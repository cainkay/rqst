import Stream from '@/components/steam';
import Layout from '@/layouts/layout';
import { type SharedData } from '@/types';
import { StreamGrouped as StreamType } from '@/types/stream';
import { router, usePage } from '@inertiajs/react';


interface Props{
    stream: StreamType
}
export default function Welcome({ stream }: Props) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Layout>
                <main className="off-center-container">
                    <Stream stream={stream} />
                </main>
            </Layout>
        </>
    );
}
