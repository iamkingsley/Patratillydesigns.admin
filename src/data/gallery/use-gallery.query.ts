import { useQuery } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import gallery from '@repositories/gallery';

export const fetchGallery = async (slug: any) => {
    const { data } = await gallery.find(`${API_ENDPOINTS.GALLERY}/${slug}`);
    return data;
};

export const useGalleryQuery = (slug: any) => {
    return useQuery([API_ENDPOINTS.GALLERY, slug], () =>
        fetchGallery(slug)
    );
};
