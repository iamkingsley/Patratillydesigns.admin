import Card from "@components/common/card";
import Description from "@components/ui/description";
import FileInput from "@components/ui/file-input";
import { AttachmentInput } from "@ts-types/generated";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import TextArea from "@components/ui/text-area";
import Button from "@components/ui/button";
import { useCreateGalleryMutation } from "@data/gallery/use-gallery-create.mutation";
import router from "next/router";
import { useUpdateGalleryMutation } from "@data/gallery/use-gallery-update";


type FormValues = {
    image: AttachmentInput;
    description: string;
}
const defaultValues = {
    image: "",
    description: ""
};



const CreateOrUpdateGalleryForm = ({ initialValues }: any) => {

    const { t } = useTranslation();

    const {
        setError,
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormValues>({
        shouldUnregister: true,
        defaultValues: initialValues ? initialValues : defaultValues,
    });

    const { mutate: createGallery, isLoading: creating } =
        useCreateGalleryMutation();
    const { mutate: updateGallery, isLoading: updating } =
        useUpdateGalleryMutation();

    const onSubmit = async (values: FormValues) => {
        const input = {
            description: values?.description,
            ...(values?.image ? { image: values?.image } : { image: initialValues.image }),
        }
        if (initialValues) {
            updateGallery(
                {
                    variables: {
                        id: initialValues.slug,
                        input: input
                    },
                },
                {
                    onError: (error: any) => {
                        Object.keys(error?.response?.data).forEach((field: any) => {
                            setError(field, {
                                type: "manual",
                                message: error?.response?.data[field][0],
                            });
                        });
                    },
                }
            );
        } else {
            createGallery({
                variables: {
                    input,
                },
            });
        }
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
                {initialValues && (
                    <Button
                        variant="outline"
                        onClick={router.back}
                        className="me-4"
                        type="button"
                    >
                        {t("form:button-label-back")}
                    </Button>
                )}
                <Button loading={updating || creating}>
                    {initialValues
                        ? t("form:button-label-update-gallery")
                        : t("form:button-label-add-gallery")}
                </Button>
            </div>
        </form>

    )
}
export default CreateOrUpdateGalleryForm;