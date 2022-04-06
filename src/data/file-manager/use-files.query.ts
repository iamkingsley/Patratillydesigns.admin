
import { useQuery } from "react-query";
import FileManager from "@repositories/file-manager";
import { API_ENDPOINTS } from "@utils/api/endpoints";

const fetchFiles = async () => {
    const url = `${API_ENDPOINTS.FILE_MANAGER}`;
    const {
        data, ...rest
    } = await FileManager.getFiles(url);
    return { data, ...rest };
};

const useFilesQuery = () => {
    return useQuery<any, Error>([API_ENDPOINTS.FILE_MANAGER], fetchFiles, {
        keepPreviousData: true,
    });
};

export { useFilesQuery, fetchFiles };
