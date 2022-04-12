import Card from "@components/common/card";
import Layout from "@components/layouts/admin";
import Search from "@components/common/search";
import ErrorMessage from "@components/ui/error-message";
import LinkButton from "@components/ui/link-button";
import Loader from "@components/ui/loader/loader";
import { SortOrder } from "@ts-types/generated";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ROUTES } from "@utils/routes";
import GalleryList from "@components/gallery/gallery-list";
import { useGalleriesQuery } from "@data/gallery/use-galleries.query";

export default function TypesPage() {
    const { t } = useTranslation();
    const [orderBy, setOrder] = useState("created_at");
    const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
    const [searchTerm, setSearchTerm] = useState("");
    const {
        data,
        isLoading: loading,
        error,
    } = useGalleriesQuery({
        text: searchTerm,
        orderBy,
        sortedBy,
    });
    console.log("galleries", data)
    if (loading) return <Loader text={t("common:text-loading")} />;
    if (error) return <ErrorMessage message={error.message} />;
    function handleSearch({ searchText }: { searchText: string }) {
        setSearchTerm(searchText);
    }

    return (
        <>
            <Card className="flex flex-col xl:flex-row items-center mb-8">
                <div className="md:w-1/4 mb-4 xl:mb-0">
                    <h1 className="text-xl font-semibold text-heading">
                        {t("common:sidebar-nav-item-galleries")}
                    </h1>
                </div>

                <div className="w-full xl:w-1/2 flex flex-col md:flex-row space-y-4 md:space-y-0 items-center ms-auto">
                    <Search onSearch={handleSearch} />

                    <LinkButton
                        href={`${ROUTES.GALLERY}/create`}
                        className="h-12 md:ms-6 w-full md:w-auto"
                    >
                        <span className="block md:hidden xl:block">
                            + {t("form:button-label-add-gallery")}
                        </span>
                        <span className="hidden md:block xl:hidden">
                            + {t("form:button-label-add")}
                        </span>
                    </LinkButton>
                </div>
            </Card>
            <GalleryList galleries={data?.data} onOrder={setOrder} onSort={setColumn} />
        </>
    );
}

TypesPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ["table", "common", "form"])),
    },
});
