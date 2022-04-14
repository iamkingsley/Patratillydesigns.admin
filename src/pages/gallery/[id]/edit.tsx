import Layout from "@components/layouts/admin";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import CreateOrUpdateGalleryForm from "@components/gallery/gallery-form";
import Loader from "@components/ui/loader/loader";
import ErrorMessage from "@components/ui/error-message";
import { useRouter } from "next/router";
import { useGalleryQuery } from "@data/gallery/use-gallery.query";

export default function UpdateGalleryPage() {
    const { t } = useTranslation();
    const { query } = useRouter();
    const { data, isLoading: loading, error } = useGalleryQuery(query.id);

    if (loading) return <Loader text={t("common:text-loading")} />;
    if (error) return <ErrorMessage message={error?.message as string} />;
    return (
        <>
            <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
                <h1 className="text-lg font-semibold text-heading">
                    {t("form:form-title-create-gallery")}
                </h1>
            </div>
            <CreateOrUpdateGalleryForm initialValues={data?.data} />
        </>
    );
}
UpdateGalleryPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ["common", "form"])),
    },
});
