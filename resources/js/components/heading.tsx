interface Props{
    children: React.ReactNode;
    className?: string
}
const Heading = ({children, className} : Props) => {
  return (
    <p className={`text-background text-3xl lg:text-5xl xl:text-7xl text-outline ${className}`}>
        {children}
    </p>
  )
}

export default Heading