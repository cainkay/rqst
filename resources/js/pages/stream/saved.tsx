import Nugget from '@/components/nugget';
import Layout from '@/layouts/layout';
import { cn } from '@/lib/utils';
import { Nugget as NuggetType } from '@/types/stream';
import dayjs from 'dayjs';
import { useState, useRef } from 'react';

interface Props {
    nuggets: NuggetType[];
}

const StreamsSaved = ({ nuggets }: Props) => {
    const [nuggetList, setNuggetList] = useState(nuggets);
    const [animatingId, setAnimatingId] = useState<number | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleNuggetUnsave = (id: number) => {
        // Set the animating ID to trigger the animation
        setAnimatingId(id);
        
        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        
        // Wait for animation to complete before removing from state
        timeoutRef.current = setTimeout(() => {
            setNuggetList((prevNuggets) => prevNuggets.filter((nugget) => nugget.id !== id));
            setAnimatingId(null);
        }, 500); // Match this with the animation duration
    };

    return (
        <Layout>
            <main className="off-center-container py-30">
                <h1 className="mb-10 text-4xl font-bold">Saved Nuggets</h1>
                {nuggetList.length > 0 ? (
                    nuggetList.map((nugget, index) => (
                        <div 
                            key={nugget.id}
                            className={cn(
                                "transition-all duration-500 ease-in-out transform",
                                animatingId === nugget.id ? "opacity-0 -translate-x-full" : "opacity-100"
                            )}
                        >
                            <Nugget
                                clasName={cn("py-5 border-b", index !== nuggets.length - 1 && "border-t")}
                                id={nugget.id}
                                is_saved={nugget.is_saved}
                                action={handleNuggetUnsave}
                                description={nugget.description}
                                date={dayjs(nugget.date).format('DD/MM/YYYY')}
                                location={nugget.state}
                                url={nugget.url}
                            />
                        </div>
                    ))
                ) : (
                    <div className="transition-opacity duration-500 ease-in">
                        <h2 className="mb-4 text-2xl font-bold">No Nuggets Found</h2>
                        <p className="text-gray-500">It seems you haven't saved any nuggets yet.</p>
                    </div>
                )}
            </main>
        </Layout>
    );
};

export default StreamsSaved;