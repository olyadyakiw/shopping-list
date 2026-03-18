import { CiSquarePlus } from 'react-icons/ci'

export default function AddNewProduct() {
    return (
        <button className="flex gap-2 items-center mb-4 cursor-pointer">
            <CiSquarePlus className="size-6" />
            Add new product
        </button>
    )
}
