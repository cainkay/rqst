import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { useStreams } from '@/hooks/use-streams';
import Layout from '@/layouts/layout';
import { cn } from '@/lib/utils';
import { useGlobalStore } from '@/store/global';
import { SharedData } from '@/types';
import { Stream } from '@/types/stream';
import { Link, router, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { XIcon } from 'lucide-react';
interface Props {
    streams: Stream[];
    current_page: number;
    total: number;
    last_page: number;
    per_page: number;
}
export default function Streams(props: Props) {
    const page = usePage<SharedData>();
    const user = page.props.auth?.user;

    const { displayPaywall } = useGlobalStore();
    const { streams, hasMorePages, loadMore, isLoadingMore } = useStreams({
        initialData: {
            data: props.streams,
            current_page: props.current_page,
            total: props.total,
            per_page: props.per_page,
            last_page: props.last_page,
        },
    });

    const handleStreamViewClick = (stream: Stream) => {
        if (user && user.subscribed) {
            const isTodaysStream = dayjs(stream.date).isSame(dayjs(), 'day');
            if (user.is_free_trial && !isTodaysStream) {
                displayPaywall(true);
                return;
            }
            router.visit(route('stream.show', stream.id));
        } else {
            displayPaywall(true);
        }
    };

    return (
        <Layout>
            <main className="lg:off-center-container">
                <section className="w-full max-w-lg flex-1 p-5 lg:p-10">
                    <p className="mb-5 text-3xl">{user ? 'All Streams...' : 'Todays Streams...'}</p>
                    <Button asChild variant={'secondary'} className="rounded-full">
                        <Link href="/">
                            <XIcon className="size-4" />
                            Close
                        </Link>
                    </Button>
                </section>
                {streams.map((stream, index) => (
                    <section
                        role="button"
                        onClick={() => handleStreamViewClick(stream)}
                        key={index}
                        className={cn('flex cursor-pointer flex-col-reverse border-b lg:flex-row lg:items-center', index === 0 && 'border-t')}
                    >
                        <p className="flex-1 p-5 py-5 text-2xl md:text-3xl lg:border-r lg:p-10">
                            In this stream:&nbsp;
                            <span className="font-bold">{stream?.description}</span>
                        </p>
                        <Heading className="w-full max-w-lg flex-1 px-5 pt-5 lg:px-10 lg:py-5">{dayjs(stream.date).format('DD/MM/YYYY')}</Heading>
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
