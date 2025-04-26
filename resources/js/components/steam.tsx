import { cn } from '@/lib/utils';
import { StreamSolo } from '@/types/stream';
import dayjs from 'dayjs';
import Heading from './heading';
import Nugget from './nugget';
interface Props {
    hideTitle?: boolean;
    stream: StreamSolo;
}
const Stream = ({ hideTitle, stream }: Props) => {
    return (
        <div>
            {!hideTitle && (
                <section className="flex flex-col-reverse items-center lg:flex-row ">
                    <p className="text-2xl md:text-3xl lg:border-r flex-1 py-5 px-10">
                        In this stream:&nbsp;
                        <span className="font-bold ">{stream.description}</span>
                    </p>
                    <Heading className="px-10 lg:min-w-[500px]">{dayjs(stream.date).format('DD/MM/YYYY')}</Heading>
                </section>
            )}
            <section className="border-y lg:border-x">
                {stream.nugget_groups.map((nugget, index) => (
                    <div key={nugget.category_id} className={cn('border-b px-10 py-5', index === stream.nugget_groups.length - 1 && 'border-b-0')}>
                        <p className="text-primary text-3xl font-bold underline mb-10">{nugget.category_title}</p>
                        <div className='space-y-5'>
                        {nugget.nuggets.map((nugget) => (
                            <Nugget
                                id={nugget.id}
                                is_saved={nugget.is_saved}
                                key={nugget.id}
                                description={nugget.description}
                                date={dayjs(nugget.date).format('DD/MM/YYYY')}
                                location={nugget.state}
                                url={nugget.url}
                            />
                        ))}
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Stream;
