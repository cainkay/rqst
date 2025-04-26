import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import Layout from './layout';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children }: AppLayoutProps) => <Layout>{children}</Layout>;
