import { useMutation, useQueryClient } from "react-query";
import Gallery from "@repositories/gallery";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { toast } from "react-toastify";
import { useTranslation } from "next-i18next";


export const useUpdateGalleryMutation = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation(
        ({ variables: { id, input } }: any) => Gallery.update(`${API_ENDPOINTS.GALLERY}/${id}`, input),
        {
            onSuccess: () => {
                toast.success(t("common:successfully-updated"));
            },
            // Always refetch after error or success:
            onSettled: () => {
                queryClient.invalidateQueries(API_ENDPOINTS.GALLERY);
            },
        }
    );
};
