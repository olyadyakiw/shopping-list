import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { toast } from 'sonner'
import BaseButton from '@/ui/BaseButton'
import TrashCanOutlineIcon from '@/components/icons/TrashCanOutlineIcon'
import { useProducts } from '../hooks/useProducts'
import { useDeleteProduct } from '../hooks/useDeleteProduct'

type Props = {
    open: boolean
    onClose: () => void
}

export default function ConfirmDeleteProductsModal({ open, onClose }: Props) {
    const { products } = useProducts()
    const { isCreating, deleteProductAsync } = useDeleteProduct()

    async function handleDeleteAll() {
        await Promise.all(products.map(product => deleteProductAsync(product.id)))
        onClose()
        toast.success('Products are deleted')
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-90 sm:px-7.5 sm:py-6 bg-light-grey gap-4" showCloseButton={false}>
                <DialogHeader>
                    <div className="flex items-center gap-1">
                        <TrashCanOutlineIcon fill="var(--color-red)" width="36" height="36" />
                        <DialogTitle className="text-2xl font-semibold">Delete product</DialogTitle>
                    </div>
                </DialogHeader>
                <p>Are you sure you want delete all products? This action is irreversible.</p>
                <div className="flex gap-2 justify-between mt-4">
                    <BaseButton
                        className="bg-red text-light-red hover:bg-red/80 max-w-37 w-full"
                        type="button"
                        onClick={handleDeleteAll}
                    >
                        {isCreating ? 'Deleting...' : 'Delete'}
                    </BaseButton>
                    <BaseButton
                        onClick={e => {
                            e.preventDefault()
                            onClose()
                        }}
                        className="bg-black hover:bg-black/80 text-white max-w-37 w-full"
                        type="button"
                    >
                        Cancel
                    </BaseButton>
                </div>
            </DialogContent>
        </Dialog>
    )
}
