import Input from "@components/ui/input";
import { useFieldArray, useForm } from "react-hook-form";
import Button from "@components/ui/button";
import Description from "@components/ui/description";
import Card from "@components/common/card";
import { useRouter } from "next/router";
import { getIcon } from "@utils/get-icon";
import Label from "@components/ui/label";
import * as typeIcons from "@components/icons/type";
import { AttachmentInput, Type, TypeSettingsInput } from "@ts-types/generated";
import { useCreateTypeMutation } from "@data/type/use-type-create.mutation";
import { useUpdateTypeMutation } from "@data/type/use-type-update.mutation";
import { typeIconList } from "./group-icons";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { typeValidationSchema } from "./group-validation-schema";
import SelectInput from "@components/ui/select-input";
import FileInput from "@components/ui/file-input";
import Title from "@components/ui/title";
import Alert from "@components/ui/alert";
import TextArea from "@components/ui/text-area";
import RadioCard from "@components/ui/radio-card/radio-card";
import Checkbox from "@components/ui/checkbox/checkbox";

export const updatedIcons = typeIconList.map((item: any) => {
  item.label = (
    <div className="flex space-s-5 items-center">
      <span className="flex w-5 h-5 items-center justify-center">
        {getIcon({
          iconList: typeIcons,
          iconName: item.value,
          className: "max-h-full max-w-full",
        })}
      </span>
      <span>{item.label}</span>
    </div>
  );
  return item;
});

const layoutTypes = [
  {
    label: "Classic",
    value: "classic",
    img: "/image/layout-classic.png",
  },
  {
    label: "Modern",
    value: "modern",
    img: "/image/layout-modern.png",
  },
  {
    label: "Standard",
    value: "standard",
    img: "/image/layout-standard.png",
  },
  {
    label: "Minimal",
    value: "minimal",
    img: "/image/layout-minimal.png",
  },
];
const productCards = [
  {
    label: "Helium",
    value: "helium",
    img: "/image/card-helium.png",
  },
  {
    label: "Neon",
    value: "neon",
    img: "/image/card-neon.png",
  },
  {
    label: "Argon",
    value: "argon",
    img: "/image/card-argon.png",
  },
  {
    label: "Krypton",
    value: "krypton",
    img: "/image/card-krypton.png",
  },
  {
    label: "Xenon",
    value: "xenon",
    img: "/image/card-xenon.png",
  },
];

type BannerInput = {
  title: string;
  description: string;
  image: AttachmentInput;
};

type FormValues = {
  name?: string | null;
  icon?: any;
  promotional_sliders: AttachmentInput[];
  banners: BannerInput[];
  settings: TypeSettingsInput;
};

type IProps = {
  initialValues?: Type | null;
};
export default function CreateOrUpdateTypeForm({ initialValues }: IProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    shouldUnregister: true,
    resolver: yupResolver(typeValidationSchema),
    // @ts-ignore
    defaultValues: {
      ...initialValues,
      settings: {
        ...initialValues?.settings,
        layoutType: initialValues?.settings?.layoutType
          ? initialValues?.settings?.layoutType
          : layoutTypes[0].value,
        productCard: initialValues?.settings?.productCard
          ? initialValues?.settings?.productCard
          : productCards[0].value,
      },
      icon: initialValues?.icon
        ? typeIconList.find(
            (singleIcon) => singleIcon.value === initialValues?.icon
          )
        : "",
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "banners",
  });
  const layoutType = watch("settings.layoutType");

  const { mutate: createType, isLoading: creating } = useCreateTypeMutation();
  const { mutate: updateType, isLoading: updating } = useUpdateTypeMutation();
  const onSubmit = async (values: FormValues) => {
    const input = {
      name: values.name!,
      icon: values.icon?.value,
      settings: {
        isHome: values?.settings?.isHome,
        productCard: values?.settings?.productCard,
        layoutType: values?.settings?.layoutType,
      },
      promotional_sliders: values.promotional_sliders?.map(
        ({ thumbnail, original, id }: any) => ({
          thumbnail,
          original,
          id,
        })
      ),
      banners: values?.banners?.map((banner) => ({
        ...banner,
        image: {
          id: banner?.image?.id,
          thumbnail: banner?.image?.thumbnail,
          original: banner?.image?.original,
        },
      })),
    };
    if (!initialValues) {
      createType({
        variables: {
          input,
        },
      });
    } else {
      updateType({
        variables: {
          id: initialValues.id!,
          input,
        },
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t("form:item-description")}
          details={`${
            initialValues
              ? t("form:item-description-update")
              : t("form:item-description-add")
          } ${t("form:type-description-help-text")}`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t("form:input-label-name")}
            {...register("name")}
            error={t(errors.name?.message!)}
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
        </Card>
      </div>

      <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        <Description
          title={t("form:group-settings")}
          details={t("form:group-settings-help-text")}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Checkbox
            {...register("settings.isHome")}
            error={t(errors.settings?.isHome?.message!)}
            label={t("form:input-label-is-home")}
            className="mb-5"
          />
          <div className="mb-10">
            <Label className="mb-5">{t("form:input-label-layout-type")}</Label>

            <div className="grid grid-cols-3 gap-5">
              {layoutTypes?.map((layout, index) => {
                return (
                  <RadioCard
                    key={index}
                    {...register("settings.layoutType")}
                    label={t(layout.label)}
                    value={layout.value}
                    src={layout.img}
                    id={layout?.value}
                  />
                );
              })}
            </div>
          </div>
          <div className="mb-5">
            <Label className="mb-5">
              {t("form:input-label-product-card-type")}
            </Label>

            <div className="grid grid-cols-3 gap-5">
              {productCards?.map((productCard, index) => {
                return (
                  <RadioCard
                    key={`product-card-${index}`}
                    {...register("settings.productCard")}
                    label={t(productCard.label)}
                    value={productCard.value}
                    src={productCard.img}
                    id={`product-card-${index}`}
                  />
                );
              })}
            </div>
          </div>
        </Card>
      </div>

      {layoutType === "classic" ? (
        <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
          <Description
            title={t("form:promotional-slider")}
            details={t("form:promotional-slider-help-text")}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />
          <Card className="w-full sm:w-8/12 md:w-2/3">
            <FileInput name="promotional_sliders" control={control} />
          </Card>
        </div>
      ) : null}

      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t("common:text-banner")}
          details={t("form:banner-slider-help-text")}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div>
            {fields.map((item: any & { id: string }, index: number) => (
              <div
                className="border-b border-dashed border-border-200 last:border-0 py-5 md:py-8 first:pt-0"
                key={item.id}
              >
                <div className="flex items-center justify-between mb-5">
                  <Title className="mb-0">
                    {t("common:text-banner")} {index + 1}
                  </Title>
                  <button
                    onClick={() => {
                      remove(index);
                    }}
                    type="button"
                    className="text-sm text-red-500 hover:text-red-700 transition-colors duration-200 focus:outline-none sm:mt-4 sm:col-span-1"
                  >
                    {t("form:button-label-remove")}
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-5">
                  <Input
                    label={t("form:input-title")}
                    variant="outline"
                    {...register(`banners.${index}.title` as const)}
                    defaultValue={item?.title!} // make sure to set up defaultValue
                    error={t(errors.banners?.[index]?.title?.message!)}
                  />
                  <TextArea
                    label={t("form:input-description")}
                    variant="outline"
                    {...register(`banners.${index}.description` as const)}
                    defaultValue={item.description!} // make sure to set up defaultValue
                  />
                </div>

                <div className="w-full mt-5">
                  <Title>{t("form:input-gallery")}</Title>
                  <FileInput
                    name={`banners.${index}.image`}
                    control={control}
                    multiple={false}
                  />
                </div>
              </div>
            ))}
          </div>

          <Button
            type="button"
            onClick={() => append({ title: "", description: "", image: {} })}
            className="w-full sm:w-auto"
          >
            {t("form:button-label-add-banner")}
          </Button>

          {errors?.banners?.message ? (
            <Alert
              message={t(errors?.banners?.message)}
              variant="error"
              className="mt-5"
            />
          ) : null}
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
            ? t("form:button-label-update-group")
            : t("form:button-label-add-group")}
        </Button>
      </div>
    </form>
  );
}
