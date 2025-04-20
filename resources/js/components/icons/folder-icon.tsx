interface Props {
    className?: string;
}
const FolderIcon = ({ className }: Props) => {
    return (
        <svg className={className} width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M2.20898 6.95712V29.9024C2.20898 31.5912 3.29478 32.7976 5.76773 32.7976H29.9544C32.8496 32.7976 33.1511 31.0485 33.1511 29.0581V12.4109C33.1511 10.1189 31.7036 8.61096 29.1703 8.61096H16.8151V6.53491C16.8151 4.30322 16.1514 3.27777 13.739 3.27777H5.76773C3.47551 3.27777 2.20898 4.00164 2.20898 6.95712Z"
                stroke="currentColor"
                stroke-width="2"
            />
        </svg>
    );
};

export default FolderIcon;
