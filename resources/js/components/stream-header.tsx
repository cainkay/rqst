import { XIcon } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';

interface Props {
    title: string;
    buttonText: string;
    searchTerm?: string;
    action: () => void;
}
const StreamHeader: React.FC<Props> = ({ title, buttonText, action }) => {
    return (
        <section className="w-full flex-1 pt-5 lg:px-10 lg:py-10">
            <p className="mb-5 text-3xl">{title}</p>
            <Button onClick={action} variant={'secondary'} className="rounded-full">
                <XIcon className="size-4" />
                {buttonText}
            </Button>
        </section>
    );
};

export default StreamHeader;
