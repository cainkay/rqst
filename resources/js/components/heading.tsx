import clsx from 'clsx';

interface Props {
    children: React.ReactNode;
    className?: string;
    dark?: boolean;
}
const Heading = ({ children, className, dark }: Props) => {
    return (
        <p className={clsx(`text-background text-3xl lg:text-5xl xl:text-7xl`, dark ? 'text-outline-light text-black' : 'text-outline text-background', className)}>
            {children}
        </p>
    );
};

export default Heading;
