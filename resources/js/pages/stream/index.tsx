import Heading from '@/components/heading';
import Layout from '@/layouts/layout';
import { Stream } from '@/types/stream';
import { router } from '@inertiajs/react';
import dayjs from 'dayjs';
interface Props {
    streams: Stream[];
}
export default function Streams({ streams }: Props) {
    return (
        <Layout>
            <main className='off-center-container'>
            {streams.map((stream) => (
                <section 
                role='button'
                onClick={() => router.visit(route('stream.show', stream.id))}
                key={stream.id} className="flex flex-col-reverse lg:items-center lg:flex-row border-b">
                    <p className="lg:px-10 py-5 lg:py-10 text-2xl md:text-3xl lg:border-r flex-1">
                        In this stream:&nbsp;
                        <span className="font-bold">{stream.description}</span>
                    </p>
                    <Heading className="lg:px-10 pt-5 lg:py-5 max-w-lg w-full flex-1">{dayjs(stream.date).format('DD/MM/YYYY')}</Heading>
                </section>
            ))}
            </main>
        </Layout>
    );
}
