import { Link } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import CalendarIcon from './icons/calendar-icon';
import PinIcon from './icons/pin-icon';
import SaveIcon from './icons/star-icon';
import { Button } from './ui/button';
interface Props {
    description: string;
    date: string;
    location: string;
    url: string;
}

const Nugget = ({ description, date, location, url }: Props) => {
    return (
        <article>
            <p className="mb-6 font-thin">{description}</p>
            <section className="flex items-center gap-4">
                <p className="flex items-center gap-2">
                    <CalendarIcon className="size-4" />
                    {date}
                </p>
                <p className="flex items-center gap-2">
                    <PinIcon className="size-4" />
                    {location}
                </p>
                <Button variant={'ghost'}>
                    <SaveIcon className="size-4" />
                    SAVE
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        <PlusIcon />
                        READ MORE
                    </a>
                </Button>
            </section>
        </article>
    );
};

export default Nugget;
