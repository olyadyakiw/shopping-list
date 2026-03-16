import LogoImage from '../assets/logo.png'

export default function Logo() {
    return (
        <div className="w-15 h-15 mb-6 mx-auto bg-white rounded-lg p-1">
            <img src={LogoImage} alt="logo" />
        </div>
    )
}
