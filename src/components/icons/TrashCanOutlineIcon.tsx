type SvgProps = {
    width?: string
    height?: string
    fill?: string
    className?: string
}

export default function TrashCanOutlineIcon({
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
            <path d="M9.375 3.59326V4.48215H5V6.25993H5.875V17.8155C5.875 18.287 6.05937 18.7392 6.38756 19.0726C6.71575 19.406 7.16087 19.5933 7.625 19.5933H16.375C16.8391 19.5933 17.2842 19.406 17.6124 19.0726C17.9406 18.7392 18.125 18.287 18.125 17.8155V6.25993H19V4.48215H14.625V3.59326H9.375ZM7.625 6.25993H16.375V17.8155H7.625V6.25993ZM9.375 8.03771V16.0377H11.125V8.03771H9.375ZM12.875 8.03771V16.0377H14.625V8.03771H12.875Z" />
        </svg>
    )
}
