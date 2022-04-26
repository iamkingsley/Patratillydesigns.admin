import ConfirmationCard from "@components/common/confirmation-card";
import {
    useModalAction,
    useModalState,
} from "@components/ui/modal/modal.context";
import useDeleteGalleryMutation from "@data/gallery/use-gallery-delete.mutation";

const GalleryDeleteView = () => {
    const { mutate: deleteGallery, isLoading: loading } =
        useDeleteGalleryMutation();
    const { data } = useModalState();
    const { closeModal } = useModalAction();
    async function handleDelete() {
        deleteGallery(data);
        closeModal();
    }
    return (
        <ConfirmationCard
            onCancel={closeModal}
            onDelete={handleDelete}
            deleteBtnLoading={loading}
        />
    );
};

export default GalleryDeleteView;
