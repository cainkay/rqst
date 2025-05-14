interface Props {
    className?: string;
}
const MinusIcon = ({ className }: Props) => {
    return (
        <svg className={className} width="40" height="29" viewBox="0 0 40 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M36.7806 12.5049H2.33528C1.0464 12.5049 0 13.5513 0 14.8402C0 16.129 1.0464 17.1754 2.33528 17.1754H36.7806C38.0695 17.1754 39.1159 16.129 39.1159 14.8402C39.1159 13.5509 38.0695 12.5049 36.7806 12.5049Z"
                fill="currentColor"
            />
        </svg>
    );
};

export default MinusIcon;
