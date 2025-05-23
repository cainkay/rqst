interface Props{
    className?: string;
}
const StarIcon = ({className} : Props) => {
    return (
        <svg 
        
        className={className}
        width="23" height="28" viewBox="0 0 23 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M1.59326 1.65845V27.2407L11.5448 19.6195L21.5933 27.2407V1.65845H1.59326Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
            <path
                d="M10.6075 6.13263C10.9315 5.26628 12.1569 5.26628 12.4808 6.13263L13.2898 8.29608C13.4303 8.67192 13.7819 8.92737 14.1828 8.94488L16.4904 9.04571C17.4144 9.08609 17.7931 10.2515 17.0692 10.8273L15.2617 12.2653C14.9476 12.5151 14.8134 12.9284 14.9206 13.3151L15.5377 15.5408C15.7849 16.4321 14.7935 17.1524 14.0222 16.6419L12.0961 15.3672C11.7615 15.1457 11.3269 15.1457 10.9923 15.3672L9.06616 16.6419C8.29486 17.1524 7.30347 16.4321 7.55061 15.5408L8.16779 13.3151C8.27501 12.9284 8.14071 12.5151 7.82669 12.2653L6.01912 10.8273C5.29528 10.2515 5.67395 9.08609 6.598 9.04571L8.90555 8.94488C9.30643 8.92737 9.65802 8.67192 9.79855 8.29608L10.6075 6.13263Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default StarIcon;
