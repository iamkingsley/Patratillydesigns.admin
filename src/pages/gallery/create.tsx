import Layout from "@components/layouts/admin";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import CreateOrUpdateGalleryForm from "@components/gallery/gallery-form";

export default function CreateGalleryPage() {
    const { t } = useTranslation();
    return (
        <>
            <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
                <h1 className="text-lg font-semibold text-heading">
                    {t("form:form-title-create-gallery")}
                </h1>
            </div>
            <CreateOrUpdateGalleryForm />
        </>
    );
}
CreateGalleryPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ["form", "common"])),
    },
});
