
import { useQuery } from "react-query";
import FileManager from "@repositories/file-manager";
import { API_ENDPOINTS } from "@utils/api/endpoints";

const fetchGallery = async () => {
    const url = `${API_ENDPOINTS.GALLERY}`;
    const {
        data, ...rest
    } = await FileManager.getFiles(url);
    return { data, ...rest };
};

const useGalleryQuery = () => {
    return useQuery<any, Error>([API_ENDPOINTS.GALLERY], fetchGallery, {
        keepPreviousData: true,
    });
};

export { useGalleryQuery, fetchGallery };
