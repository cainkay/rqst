import { cn } from '@/lib/utils';
import axios from 'axios';
import { PlusIcon } from 'lucide-react';
import { useState, useRef } from 'react';
import CalendarIcon from './icons/calendar-icon';
import PinIcon from './icons/pin-icon';
import SaveIcon from './icons/star-icon';
import { Button } from './ui/button';
import { useGlobalStore } from '@/store/global';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

type Props = {
    description: string;
    id: number;
    date: string;
    location: string;
    url: string;
    is_saved?: boolean;
    clasName?: string;
    action?: (id: number) => void;
}

const Nugget = ({
    description,
    id,
    date,
    location,
    url,
    action,
    is_saved = false,
    clasName = '',
}: Props) => {
    const page = usePage<SharedData>();
    const { user } = page.props.auth;
    const { displayPaywall } = useGlobalStore();
    const [saved, setSaved] = useState(is_saved || false);
    const [processing, setProcessing] = useState(false);
    const [showSparkle, setShowSparkle] = useState(false);
    const saveButtonRef = useRef<HTMLButtonElement>(null);

    const toggleSave = async () => {
    console.log("🚀 ~ user:", user)

        if(!user) {
            displayPaywall(true);
            return;
        } 


        try {
            setProcessing(true);
            const response = await axios.post(`/nugget/save/${id}`, {
                _method: 'POST' // For Laravel method spoofing if needed
            });

            // If toggling from unsaved to saved, show sparkle effect
            if (!saved && response.data.is_saved) {
                setShowSparkle(true);
                // Reset sparkle effect after animation completes
                setTimeout(() => setShowSparkle(false), 1000);
            }

            if(action && !response.data.is_saved) {
                action(id);
            }
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
                <div className="relative">
                    <Button 
                        ref={saveButtonRef}
                        variant={'ghost'} 
                        onClick={toggleSave} 
                        disabled={processing} 
                        className={cn(
                            'rounded-full relative z-10 transition-all duration-300',
                            saved ? 'bg-bright-blue text-white' : ''
                        )}
                    >
                        <SaveIcon className="size-4" />
                        {saved ? 'SAVED' : 'SAVE'}
                    </Button>
                    
                    {/* Sparkle effect with Tailwind only */}
                    {showSparkle && (
                        <div className="absolute inset-0 z-0">
                            <span className="absolute -top-2 -left-2 size-2 bg-bright-blue rounded-full animate-ping opacity-75"></span>
                            <span className="absolute -top-1 -right-2 size-2 bg-bright-blue rounded-full animate-ping opacity-75 delay-75"></span>
                            <span className="absolute -bottom-2 -left-1 size-2 bg-bright-blue rounded-full animate-ping opacity-75 delay-150"></span>
                            <span className="absolute -bottom-1 -right-1 size-2 bg-bright-blue rounded-full animate-ping opacity-75 delay-300"></span>
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-8 bg-white rounded-full animate-ping opacity-30"></span>
                        </div>
                    )}
                </div>
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