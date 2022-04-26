import Card from "@components/common/card";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useTranslation } from "next-i18next";

const FileManagerUpload = ({ setValue, getValues, files }: any) => {
    const { openModal } = useModalAction();

    const { t } = useTranslation();

    return (
        <Card className="w-full sm:w-8/12 md:w-2/3">
            <div className="border-dashed border-2 border-border-base h-36 rounded flex flex-col justify-center items-center cursor-pointer focus:border-accent-400 focus:outline-none"
                onClick={(e: any) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openModal("FILE_MANAGER_VIEW", {
                        files,
                        setValue,
                        getValues,
                    });
                }} >
                <span className="text-accent font-semibold">
                    {t("text-upload-highlight")}
                </span>{" "}
                {t("text-upload-message")} <br />
            </div>
        </Card>
    )
};
export default FileManagerUpload;