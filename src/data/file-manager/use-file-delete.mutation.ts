import { useMutation, useQueryClient } from "react-query";
import FileManager from "@repositories/file-manager";
import { API_ENDPOINTS } from "@utils/api/endpoints";

const useDeleteFileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (public_id: string) => FileManager.delete(`${API_ENDPOINTS.FILE_MANAGER}/${public_id}`),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.FILE_MANAGER);
      },
    }
  );
};
export default useDeleteFileMutation;
