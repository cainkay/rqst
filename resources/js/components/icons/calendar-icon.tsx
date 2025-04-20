interface Props {
    className?: string;
}
const CalendarIcon = ({ className }: Props) => {
    return (
        <svg className={className} width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M2.07031 13.1915H33.8662V30.0274C33.8662 31.6843 32.5231 33.0274 30.8662 33.0274H5.07031C3.41346 33.0274 2.07031 31.6843 2.07031 30.0274V13.1915Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
            />
            <path
                d="M33.8662 13.1915L2.07031 13.1915L2.07031 8.80157C2.07031 7.14472 3.41346 5.80157 5.07031 5.80157L30.8662 5.80158C32.5231 5.80158 33.8662 7.14472 33.8662 8.80158L33.8662 13.1915Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
            />
            <path d="M9.39062 2.49567L9.39062 9.88556" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M26.9902 2.49567L26.9902 9.88556" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
};

export default CalendarIcon;
