import FolderIcon from '@/components/icons/folder-icon';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Category } from '@/types/stream';
import { useForm } from '@inertiajs/react';
import React, { FormEventHandler } from 'react';

interface Props {
    categories: number[];
    app_categories: Category[];
}

const UserCategories: React.FC<Props> = ({ categories, app_categories }) => {
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        categories: categories,
    });

    const handleCategorySelect = (categoryId: number) => {
        if (data.categories.includes(categoryId)) {
            setData(
                'categories',
                data.categories.filter((id: number) => id !== categoryId),
            );
        } else {
            setData('categories', [...data.categories, categoryId]);
        }
    };
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('category.patch'), {
            preserveScroll: true,
        });
    };

    return (
        <section className="text-background mt-10 space-y-10">
            <h3 className="text-2xl font-bold uppercase">email notification preferences</h3>

            <p>Select the categories you&apos;d like to receive email notifications about.</p>

            <form className="flex flex-wrap gap-4">
                <Button
                    onClick={() => setData('categories', [])}
                    variant="secondary"
                    type="button"
                    className={cn(
                        'gap-3 rounded-full text-left uppercase',
                        data.categories.length === 0 ? 'bg-bright-blue text-background' : 'bg-white text-black',
                    )}
                >
                    <FolderIcon className="size-6" />
                    All categories
                </Button>
                {app_categories.map((category) => (
                    <Button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        variant="secondary"
                        type="button"
                        className={cn(
                            'gap-3 rounded-full bg-white text-left uppercase',
                            data.categories.includes(category.id) && 'bg-bright-blue text-background',
                        )}
                    >
                        <FolderIcon className={cn('size-6', data.categories.includes(category.id) && 'fill-background')} />
                        {category.title}
                    </Button>
                ))}

                <Button
                    type="submit"
                    variant="secondary"
                    className="bg-bright-blue text-background rounded-full uppercase"
                    onClick={submit}
                    disabled={processing}
                >
                    SUBMIT
                </Button>
            </form>
        </section>
    );
};

export default UserCategories;
