import Card from "@components/common/card";
import Description from "@components/ui/description";
import FileInput from "@components/ui/file-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { AttachmentInput } from "@ts-types/generated";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";

type FormValues = {
    image: AttachmentInput;
}
const defaultValues = {
    image: "",
};

type IProps = {
    initialValues?: AttachmentInput | null;
    file: any
};

const FileManagerForm = () => {
    // console.log("file", file)
    const { t } = useTranslation();

    const {
        register,
        handleSubmit,
        control,
        watch,
        setError,
        formState: { errors },
    } = useForm();

    const onSubmit = async (values: FormValues) => {
        const input = {
            image: {
                thumbnail: values?.image?.thumbnail,
                original: values?.image?.original,
                id: values?.image?.id,
            },
        }


    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
                <Description
                    title={t("form:input-label-image")}
                    details={t("form:coupon-image-helper-text")}
                    className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
                />

                <Card className="w-full sm:w-8/12 md:w-2/3">
                    <FileInput name="image" control={control} multiple={false} />
                </Card>
            </div>
        </form>

    )
}
export default FileManagerForm;