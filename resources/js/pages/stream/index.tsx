import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { useStreams } from '@/hooks/use-streams';
import Layout from '@/layouts/layout';
import { SharedData } from '@/types';
import { Stream } from '@/types/stream';
import { router, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
interface Props {
    streams: Stream[];
    current_page: number;
    total: number;
    last_page: number;
    per_page: number;
    
}
export default function Streams(props: Props) {
    console.log("🚀 ~ Streams ~ props:", props)
    const page = usePage<SharedData>();
    const { user } = page.props.auth;

    const { streams, hasMorePages, loadMore, isLoadingMore , isError } = useStreams({
        initialData: {
            data: props.streams,
            current_page: props.current_page,
            total: props.total,
            per_page: props.per_page,
            last_page: props.last_page,
        },
    });
    console.log("🚀 ~ Streams ~ isError:", isError)
    console.log("🚀 ~ Streams ~ streams:", streams)

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
                            <span className="font-bold">{stream?.description}</span>
                        </p>
                        <Heading className="w-full max-w-lg flex-1 pt-5 lg:px-10 lg:py-5">{dayjs(stream.date).format('DD/MM/YYYY')}</Heading>
                    </section>
                ))}

                {user && hasMorePages ? (
                    <Button className="my-5 rounded-full" size={'lg'} disabled={isLoadingMore} onClick={() => loadMore()}>
                        Load more
                    </Button>
                ) : (
                    <p className="py-10">This is the end</p>
                )}
            </main>
        </Layout>
    );
}
