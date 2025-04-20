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
            <main className="off-center-container">
                {streams.map((stream) => (
                    <section
                        role="button"
                        onClick={() => router.visit(route('stream.show', stream.id))}
                        key={stream.id}
                        className="flex flex-col-reverse border-b lg:flex-row lg:items-center"
                    >
                        <p className="flex-1 py-5 text-2xl md:text-3xl lg:border-r lg:px-10 lg:py-10">
                            In this stream:&nbsp;
                            <span className="font-bold">{stream.description}</span>
                        </p>
                        <Heading className="w-full max-w-lg flex-1 pt-5 lg:px-10 lg:py-5">{dayjs(stream.date).format('DD/MM/YYYY')}</Heading>
                    </section>
                ))}
            </main>
        </Layout>
    );
}
