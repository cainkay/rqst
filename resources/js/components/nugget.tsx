import { PlusIcon } from 'lucide-react';
import CalendarIcon from './icons/calendar-icon';
import PinIcon from './icons/pin-icon';
import SaveIcon from './icons/star-icon';
import { Button } from './ui/button';
import axios from 'axios';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useForm } from '@inertiajs/react';

type Props = {
    description: string;
    id: number;
    date: string;
    location: string;
    url: string;
    is_saved?: boolean;
    clasName?: string;
    view?: boolean
}

const Nugget = ({
    description,
    id,
    date,
    location,
    url,
    view,
    is_saved = false,
    clasName = '',
}: Props) => {
    const [saved, setSaved] = useState(is_saved || false);
    const [processing, setProcessing] = useState(false);
    const {processing : saving, post} = useForm<Props>({
        description,
        id,
        date,
        location,
        url,
    });

    const toggleSave = async () => {
        setProcessing(true);
        try {
            if(view) {
                // Use Inertia to handle the save action
                post(`/nugget/save/${id}`, {
                    preserveState: true,
                    preserveScroll: true,
                });
                return;
            } else {
                  // Use axios directly instead of Inertia
                await axios.post(`/nugget/save/${id}`, {
                    _method: 'POST' // For Laravel method spoofing if needed
                });
            }
          
            
            // Update local state on success
            setSaved(!saved);
        } catch (error) {
            console.error('Error saving nugget:', error);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <article className={clasName}>
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
                <Button 
                    variant={'ghost'} 
                    onClick={toggleSave} 
                    disabled={processing} 
                    className={cn('rounded-full', saved ? 'bg-bright-blue text-white' : '')}
                >
                    <SaveIcon className="size-4" />
                    {saved ? 'SAVED' : 'SAVE'}
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