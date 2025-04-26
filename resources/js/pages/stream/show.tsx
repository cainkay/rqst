import Stream from '@/components/steam';
import Layout from '@/layouts/layout';
import type { StreamSolo } from '@/types/stream';
interface Props {
    stream: StreamSolo;
}
const StreamDetail = ({ stream }: Props) => {
    return (
        <Layout>
            <main className="off-center-container">
                <Stream stream={stream} />
                <p className="py-10">This is the end</p>
            </main>
        </Layout>
    );
};

export default StreamDetail;
