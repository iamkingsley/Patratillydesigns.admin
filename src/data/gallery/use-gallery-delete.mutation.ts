import { useMutation, useQueryClient } from "react-query";
import Gallery from "@repositories/gallery";
import { API_ENDPOINTS } from "@utils/api/endpoints";

const useDeleteGalleryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (public_id: string) => Gallery.delete(`${API_ENDPOINTS.GALLERY}/${public_id}`),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.GALLERY);
      },
    }
  );
};
export default useDeleteGalleryMutation;
