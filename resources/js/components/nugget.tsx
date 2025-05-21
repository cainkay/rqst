import { cn } from '@/lib/utils';
import { useGlobalStore } from '@/store/global';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import CalendarIcon from './icons/calendar-icon';
import PinIcon from './icons/pin-icon';
import SaveIcon from './icons/star-icon';
import { Button } from './ui/button';
import { Nugget as NuggetType } from '@/types/stream';
import dayjs from 'dayjs';

interface Props {
    nugget: NuggetType
    className?: string;
    action?: (id: number) => void;
}

const Nugget = ({ nugget, action, className = '' }: Props) => {
    const page = usePage<SharedData>();
    const user = page.props.auth?.user;
    const { displayPaywall } = useGlobalStore();
    const [saved, setSaved] = useState(nugget.is_saved || false);
    const [processing, setProcessing] = useState(false);
    const [showSparkle, setShowSparkle] = useState(false);
    const saveButtonRef = useRef<HTMLButtonElement>(null);

    const toggleSave = async () => {
        if (!user) {
            displayPaywall(true);
            return;
        }

        try {
            setProcessing(true);
            const response = await axios.post(`/nugget/save/${nugget.id}`);

            // If toggling from unsaved to saved, show sparkle effect
            if (!saved && response.data.is_saved) {
                setShowSparkle(true);
                // Reset sparkle effect after animation completes
                setTimeout(() => setShowSparkle(false), 1000);
            }

            if (action && !response.data.is_saved) {
                action(nugget.id);
            }
            setSaved(!saved);
        } catch (error) {
            console.error('Error saving nugget:', error);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <article className={cn('py-4', className)}>
            <p className="mb-6 font-thin">{nugget.description}</p>
            <section className="items-center gap-4 space-y-2 lg:flex lg:space-y-0">
                <p className="flex items-center gap-2">
                    <CalendarIcon className="size-4" />
                    {dayjs(nugget.date).format('HH:mm : DD/MM/YYYY')}
                </p>
                <p className="flex items-center gap-2">
                    <PinIcon className="size-4" />
                    {nugget.lga},&nbsp;{nugget.state}
                </p>
               {user && !user?.is_free_trial && <div className="relative">
                    <Button
                        ref={saveButtonRef}
                        variant={'ghost'}
                        onClick={toggleSave}
                        disabled={processing}
                        className={cn('relative  rounded-full transition-all duration-300',)}
                    >
                        
                        {saved ? <>
                        
                        <TrashIcon className="size-4" />
                        UNSAVE
                        </> : <>
                        <SaveIcon className="size-4" />
                        SAVE
                        </>}
                    </Button>

                    {/* Sparkle effect with Tailwind only */}
                    {showSparkle && (
                        <div className="absolute inset-0 z-0">
                            <span className="bg-bright-blue absolute -top-2 -left-2 size-2 animate-ping rounded-full opacity-75"></span>
                            <span className="bg-bright-blue absolute -top-1 -right-2 size-2 animate-ping rounded-full opacity-75 delay-75"></span>
                            <span className="bg-bright-blue absolute -bottom-2 -left-1 size-2 animate-ping rounded-full opacity-75 delay-150"></span>
                            <span className="bg-bright-blue absolute -right-1 -bottom-1 size-2 animate-ping rounded-full opacity-75 delay-300"></span>
                            <span className="absolute top-1/2 left-1/2 size-8 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-white opacity-30"></span>
                        </div>
                    )}
                </div>}
                <Button asChild variant="outline" className="rounded-full">
                    <a href={nugget.url} target="_blank" rel="noopener noreferrer">
                        <PlusIcon />
                        READ MORE
                    </a>
                </Button>
            </section>
        </article>
    );
};

export default Nugget;
