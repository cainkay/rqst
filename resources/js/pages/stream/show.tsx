import Stream from '@/components/steam';
import Layout from '@/layouts/layout';
import { SharedData } from '@/types';
import type { Category, StreamSolo } from '@/types/stream';
import { usePage } from '@inertiajs/react';
interface Props {
    stream: StreamSolo;
    categories?: Category[];
}
const StreamDetail = ({ stream, categories }: Props) => {
    console.log("🚀 ~ StreamDetail ~ categories:", categories)
console.log("🚀 ~ StreamDetail ~ stream:", stream)

    const page = usePage<SharedData>();
    const user = page.props.auth?.user;
    console.log('🚀 ~ StreamDetail ~ user:', user);
    return (
        <Layout>
            <main className="">
                <Stream categories={categories} isAllowed={user?.subscribed || false} stream={stream} />
                <p className="off-center-container py-10">This is the end</p>
            </main>
        </Layout>
    );
};

export default StreamDetail;
