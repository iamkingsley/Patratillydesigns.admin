import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import gallery from "@repositories/gallery";
import { toast } from "react-toastify";
import { useTranslation } from "next-i18next";
import router from "next/router";
import { ROUTES } from "@utils/routes";

export interface ICategoryCreateVariables {
    variables: { input: any };
}

export const useCreateGalleryMutation = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();
    return useMutation(
        ({ variables: { input } }: any) =>
            gallery.create(API_ENDPOINTS.GALLERY, input),
        {
            onSuccess: () => {
                toast.success(t("common:successfully-created"));
                router.push(ROUTES.GALLERY);
            },
            // Always refetch after error or success:
            onSettled: () => {
                queryClient.invalidateQueries(API_ENDPOINTS.GALLERY);
            },
        }
    );
};
