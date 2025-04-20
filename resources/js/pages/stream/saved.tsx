import Nugget from '@/components/nugget';
import Layout from '@/layouts/layout';
import { cn } from '@/lib/utils';
import { Nugget as NuggetType } from '@/types/stream';
import dayjs from 'dayjs';

interface Props {
    nuggets: NuggetType[];
}
const StreamsSaved = ({ nuggets }: Props) => {
    console.log('🚀 ~ StreamsSaved ~ nuggets:', nuggets);
    return (
        <Layout>
            <main className="off-center-container py-30">
                <h1 className="mb-10 text-4xl font-bold">Saved Nuggets</h1>
                {nuggets.length > 0 ? (
                    nuggets.map((nugget, index) => (
                        <Nugget
                            clasName={cn("py-5 border-b", index !== nuggets.length - 1 && "border-t")}
                            id={nugget.id}
                            is_saved={nugget.is_saved}
                            key={nugget.id}
                            view={true}
                            description={nugget.description}
                            date={dayjs(nugget.date).format('DD/MM/YYYY')}
                            location={nugget.state}
                            url={nugget.url}
                        />
                    ))
                ) : (
                    <div className="">
                        <h2 className="mb-4 text-2xl font-bold">No Nuggets Found</h2>
                        <p className="text-gray-500">It seems you haven't saved any nuggets yet.</p>
                    </div>
                )}
            </main>
        </Layout>
    );
};

export default StreamsSaved;
