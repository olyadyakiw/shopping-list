type SvgProps = {
    width?: string
    height?: string
    fill?: string
    className?: string
}

export default function FileEditsOutlineIcon({
    width = '24',
    height = '24',
    fill = 'currentColor',
    className,
}: SvgProps) {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M9.65374 17.3075H6.55125V5.11707H11.9806V8.9266H15.8587V11.2885L17.41 9.76469V8.16469L12.7562 3.59326H6.55125C5.69806 3.59326 5 4.27898 5 5.11707V17.3075C5 18.1456 5.69806 18.8314 6.55125 18.8314H9.65374V17.3075ZM17.5651 11.9742C17.6427 11.9742 17.7978 12.0504 17.8753 12.1266L18.8837 13.1171C19.0388 13.2695 19.0388 13.5742 18.8837 13.7266L18.108 14.4885L16.4792 12.8885L17.2548 12.1266C17.3324 12.0504 17.41 11.9742 17.5651 11.9742ZM17.5651 14.9456L12.8338 19.5933H11.205V17.9933L15.9363 13.3456L17.5651 14.9456Z" />
        </svg>
    )
}
