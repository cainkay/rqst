import { cn } from '@/lib/utils';
import { StreamGrouped } from '@/types/stream';
import dayjs from 'dayjs';
import Heading from './heading';
import CalendarIcon from './icons/calendar-icon';
import FolderIcon from './icons/folder-icon';
import PinIcon from './icons/pin-icon';
import Nugget from './nugget';
import { Button } from './ui/button';

interface Props {
    hideTitle?: boolean;
    stream: StreamGrouped;
}
const Stream = ({ hideTitle, stream }: Props) => {
    return (
        <div>
            <section className="flex border-x border-b">
                <Button variant="ghost" className="gap-3 rounded-none border-r px-4 py-8 text-2xl">
                    <FolderIcon className="size-6" />
                    CATEGORIES
                </Button>
                <Button variant="ghost" className="gap-3 rounded-none border-r px-4 py-8 text-2xl">
                    <CalendarIcon className="size-6" />
                    DATES
                </Button>
                <Button variant="ghost" className="gap-2 rounded-none border-r px-4 py-8 text-2xl">
                    <PinIcon className="size-6" />
                    LOCATIONS
                </Button>
            </section>
            {!hideTitle && (
                <section className="flex flex-col-reverse items-center lg:flex-row">
                    <p className="px-10 py-5 text-2xl md:text-3xl lg:border-r">
                        In this stream:&nbsp;
                        <span className="font-bold">{stream.description}</span>
                    </p>
                    <Heading className="px-10 py-5">{dayjs(stream.date).format('DD/MM/YYYY')}</Heading>
                </section>
            )}
            <section className="border-y lg:border-x">
                {stream.nugget_groups.map((nugget, index) => (
                    <div key={nugget.category_id} className={cn('border-b px-10 py-5', index === stream.nugget_groups.length - 1 && 'border-b-0')}>
                        <p className="text-primary text-3xl font-bold underline mb-10">{nugget.category_title}</p>
                        {nugget.nuggets.map((nugget) => (
                            <Nugget
                                key={nugget.id}
                                description={nugget.description}
                                date={dayjs(nugget.date).format('DD/MM/YYYY')}
                                location={nugget.state}
                                url={nugget.url}
                            />
                        ))}
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Stream;
