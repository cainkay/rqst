import Stream from '@/components/steam';
import Layout from '@/layouts/layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <>
            <Layout>
                <main className="off-center-container">
                    <Stream />
                </main>
            </Layout>
        </>
    );
}
