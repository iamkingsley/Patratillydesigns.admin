import { QueryParamsType, QueryOptionsType } from "@ts-types/custom.types";
import { mapPaginatorData, stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import gallery from "@repositories/gallery";

const fetchGalleries = async ({ queryKey }: any) => {
  const [_key, params] = queryKey;
  const {
    text,
    orderBy = "updated_at",
    sortedBy = "DESC",
  } = params as QueryOptionsType;
  const searchString = stringifySearchQuery({
    name: text,
  });
  const url = `${API_ENDPOINTS.GALLERY}?search=${searchString}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  // const { data } = await gallery.all(url);
  // return { data };
  const {
    data: { data, ...rest },
  } = await gallery.all(url);
  return { gallery: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};

const useGalleriesQuery = (options: QueryOptionsType = {}) => {
  return useQuery<any, Error>([API_ENDPOINTS.GALLERY, options], fetchGalleries, {
    keepPreviousData: true,
  });
};

export { useGalleriesQuery, fetchGalleries };
