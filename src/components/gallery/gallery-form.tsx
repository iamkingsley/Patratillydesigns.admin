import Card from "@components/common/card";
import Description from "@components/ui/description";
import FileInput from "@components/ui/file-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { AttachmentInput } from "@ts-types/generated";
import { adminOnly } from "@utils/auth-utils";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useForm } from "react-hook-form";
import Layout from "@components/layouts/admin";
import TextArea from "@components/ui/text-area";
import Button from "@components/ui/button";
import { useCreateGalleryMutation } from "@data/gallery/use-gallery-create.mutation";


type FormValues = {
    image: AttachmentInput;
    description: string;
}
const defaultValues = {
    image: "",
    description: ""
};

type IProps = {
    initialValues?: AttachmentInput | null;
    file: any
};

const CreateOrUpdateGalleryForm = () => {

    const { t } = useTranslation();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({});

    const { mutate: createGallery, isLoading: loading } =
        useCreateGalleryMutation();

    const onSubmit = async (values: FormValues) => {
        const input = {
            description: values?.description,
            image: {
                thumbnail: values?.image?.thumbnail,
                original: values?.image?.original,
                id: values?.image?.id,
                _id: values?.image?._id,
            },
        }
        createGallery({
            variables: {
                input,
            },
        });
    }



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
                <Description
                    title={t("form:input-label-image")}
                    details={t("form:gallery-image-helper-text")}
                    className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
                />

                <Card className="w-full sm:w-8/12 md:w-2/3">
                    <FileInput name="image" control={control} multiple={false} />
                </Card>

                <Description
                    title={t("form:input-label-description")}
                    details={t("form:gallery-form-info-help-text")}
                    className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
                />

                <Card className="w-full sm:w-8/12 md:w-2/3 mt-10">
                    <TextArea
                        label={t("form:input-label-details")}
                        {...register("description")}
                        variant="outline"
                        className="mb-5"
                    />
                </Card>

            </div>
            <div className="mb-4 text-end">
                <Button> Create</Button>
            </div>
        </form>

    )
}
export default CreateOrUpdateGalleryForm;
// GalleryForm.authenticate = {
//     permissions: adminOnly,
// };
// GalleryForm.Layout = Layout

// export const getStaticProps = async ({ locale }: any) => ({
//     props: {
//         ...(await serverSideTranslations(locale, ["table", "common", "form"])),
//     },
// });