import Input from "@components/ui/input";
import {
  Control,
  FieldErrors,
  useForm,
  useFormState,
  useWatch,
} from "react-hook-form";
import Button from "@components/ui/button";
import TextArea from "@components/ui/text-area";
import Label from "@components/ui/label";
import Card from "@components/common/card";
import Description from "@components/ui/description";
import * as categoriesIcon from "@components/icons/category";
import { getIcon } from "@utils/get-icon";
import { useRouter } from "next/router";
import ValidationError from "@components/ui/form-validation-error";
import { useEffect } from "react";
import { Category } from "@ts-types/generated";
import { useTypesQuery } from "@data/type/use-types.query";
import { useCategoriesQuery } from "@data/category/use-categories.query";
import { useUpdateCategoryMutation } from "@data/category/use-category-update.mutation";
import { useCreateCategoryMutation } from "@data/category/use-category-create.mutation";
import { categoryIcons } from "./category-icons";
import { useTranslation } from "next-i18next";
import FileInput from "@components/ui/file-input";
import SelectInput from "@components/ui/select-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { categoryValidationSchema } from "./category-validation-schema";
import Checkbox from "@components/ui/checkbox/checkbox";
import FileManagerUpload from "@components/file-manager/file-manager-upload";
import { useFilesQuery } from "@data/file-manager/use-files.query";

export const updatedIcons = categoryIcons.map((item: any) => {
  item.label = (
    <div className="flex space-s-5 items-center">
      <span className="flex w-5 h-5 items-center justify-center">
        {getIcon({
          iconList: categoriesIcon,
          iconName: item.value,
          className: "max-h-full max-w-full",
        })}
      </span>
      <span>{item.label}</span>
    </div>
  );
  return item;
});

function SelectTypes({
  control,
  errors,
}: {
  control: Control<FormValues>;
  errors: FieldErrors;
}) {
  const { t } = useTranslation();
  const { data, isLoading } = useTypesQuery();
  return (
    <div className="mb-5">
      <Label>{t("form:input-label-types")}</Label>
      <SelectInput
        name="type"
        control={control}
        getOptionLabel={(option: any) => option.name}
        getOptionValue={(option: any) => option.slug}
        options={data?.types!}
        isLoading={isLoading}
      />
      <ValidationError message={t(errors.type?.message)} />
    </div>
  );
}

function SelectCategories({
  control,
  setValue,
}: {
  control: Control<FormValues>;
  setValue: any;
}) {
  const { t } = useTranslation();
  const type = useWatch({
    control,
    name: "type",
  });
  const { dirtyFields } = useFormState({
    control,
  });
  useEffect(() => {
    if (type?.slug && dirtyFields?.type) {
      setValue("parent", []);
    }
  }, [type?.slug]);
  const { data, isLoading: loading } = useCategoriesQuery({
    limit: 999,
    type: type?.slug,
  });
  return (
    <div>
      <Label>{t("form:input-label-parent-category")}</Label>
      <SelectInput
        name="parent"
        control={control}
        getOptionLabel={(option: any) => option.name}
        getOptionValue={(option: any) => option.id}
        options={data?.categories?.data!}
        isClearable={true}
        isLoading={loading}
      />
    </div>
  );
}

type FormValues = {
  name: string;
  details: string;
  parent: any;
  image: any;
  icon: any;
  type: any;
  is_featured: boolean;
};

const defaultValues = {
  image: "",
  name: "",
  details: "",
  parent: "",
  icon: "",
  type: "",
  is_featured: false,
};

type IProps = {
  initialValues?: Category | null;
};
export default function CreateOrUpdateCategoriesForm({
  initialValues,
}: IProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const { data } = useFilesQuery();
  const files = data?.data

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,

    formState: { errors },
  } = useForm<FormValues>({
    // shouldUnregister: true,
    //@ts-ignore
    defaultValues: initialValues
      ? {
        ...initialValues,
        icon: initialValues?.icon
          ? categoryIcons.find(
            (singleIcon) => singleIcon.value === initialValues?.icon!
          )
          : "",
      }
      : defaultValues,
    resolver: yupResolver(categoryValidationSchema),
  });

  const { mutate: createCategory, isLoading: creating } =
    useCreateCategoryMutation();
  const { mutate: updateCategory, isLoading: updating } =
    useUpdateCategoryMutation();

  const onSubmit = async (values: FormValues) => {
    const input = {
      name: values.name,
      details: values.details,
      image: {
        thumbnail: values?.image?.thumbnail,
        original: values?.image?.original,
        _id: values?.image?._id,
        id: values?.image?.id,
      },
      is_featured: values.is_featured,
      icon: values.icon?.value || "",
      parent: values.parent?._id,
      parent_id: values.parent?.id,
      type_id: values.type?.id,
    };
    if (initialValues) {
      updateCategory({
        variables: {
          id: initialValues?.slug,
          input: {
            ...input,
          },
        },
      });
    } else {
      createCategory({
        variables: {
          input,
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        <Description
          title={t("form:input-label-image")}
          details={t("form:category-image-helper-text")}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />


        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div className="border-dashed border-2 border-border-base h-36 rounded flex flex-col justify-center items-center cursor-pointer focus:border-accent-400 focus:outline-none"
            onClick={(e: any) => {
              e.preventDefault();
              e.stopPropagation();
              openModal("FILE_MANAGER_VIEW", {
                files: files,
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
      </div>

      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t("form:input-label-description")}
          details={`${initialValues
            ? t("form:item-description-edit")
            : t("form:item-description-add")
            } ${t("form:category-description-helper-text")}`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8 "
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t("form:input-label-name")}
            {...register("name")}
            error={t(errors.name?.message!)}
            variant="outline"
            className="mb-5"
          />

          <TextArea
            label={t("form:input-label-details")}
            {...register("details")}
            variant="outline"
            className="mb-5"
          />

          <div className="mb-5">
            <Label>{t("form:input-label-select-icon")}</Label>
            <SelectInput
              name="icon"
              control={control}
              options={updatedIcons}
              isClearable={true}
            />
          </div>
          {/* <SelectTypes control={control} errors={errors} /> */}
          <SelectCategories control={control} setValue={setValue} />
          <div className="mt-5">
            <Label>{t("form:input-label-featured-category")}</Label>
            <Checkbox
              {...register("is_featured")}
              error={t(errors.is_featured?.message!)}
              label={t("form:input-label-featured-category-note")}
            />
          </div>
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

        <Button loading={creating || updating}>
          {initialValues
            ? t("form:button-label-update-category")
            : t("form:button-label-add-category")}
        </Button>
      </div>
    </form>
  );
}
