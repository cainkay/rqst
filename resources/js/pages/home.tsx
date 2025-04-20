import Search from '@/components/search';
import Stream from '@/components/steam';
import Layout from '@/layouts/layout';
import { SharedData } from '@/types';
import { Category, StreamGrouped as StreamType } from '@/types/stream';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    stream: StreamType;
    categories: Category[];
}
export default function Welcome({ stream, categories }: Props) {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    console.log("🚀 ~ Welcome ~ auth:", auth)

    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const handleCategorySelect = (categoryId: number) => {
        setSelectedCategories((prev) => {
            if (prev.includes(categoryId)) {
                return prev.filter((id) => id !== categoryId);
            }
            return [...prev, categoryId];
        });
    };
    return (
        <>
            <Layout>
                {auth.user && (
                    <div className="off-center-container-no-padding">
                        <Search categories={categories} selectedCategories={selectedCategories} onCategorySelect={handleCategorySelect} />
                    </div>
                )}
                <main className="off-center-container">
                    <Stream stream={stream} />
                </main>
            </Layout>
        </>
    );
}
