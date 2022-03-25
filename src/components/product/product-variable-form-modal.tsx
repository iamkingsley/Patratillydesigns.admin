import Input from "@components/ui/input";
import { useFieldArray, useForm } from "react-hook-form";
import Button from "@components/ui/button";
import Card from "@components/common/card";
import Label from "@components/ui/label";
import Title from "@components/ui/title";

import Checkbox from "@components/ui/checkbox/checkbox";
import SelectInput from "@components/ui/select-input";
import { useEffect } from "react";
import { Product } from "@ts-types/generated";
import { useTranslation } from "next-i18next";
import { useAttributesQuery } from "@data/attributes/use-attributes.query";
import { useModalAction, useModalState } from "@components/ui/modal/modal.context";

type IProps = {
  initialValues?: Product | null;
  shopId: string | undefined;
};

export default function ProductVariableForm() {
  const { t } = useTranslation();
  const { data, isLoading } = useAttributesQuery({
    // shop_id: initialValues ? Number(initialValues.shop_id) : Number(shopId),
  });
  const {
    register,
    control,
    watch,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // This field array will keep all the attribute dropdown fields
  const { fields, append, remove } = useFieldArray({
    shouldUnregister: true,
    control,
    name: "variations",
  });

  const {
    data:_data
  } = useModalState();
  const { closeModal } = useModalAction();

  const { initialValues } = _data;
  const attributes = data?.attributes;

  useEffect(() => {
    console.log('_data: ', _data)
    append({ attribute: "", value: [] });
    // if (_data) {
    //   append({
    //     attribute: _data.initialValues.variations[0].attribute,
    //     value: _data.initialValues.variations[0].attribute.value 
    //   })
    // } else {
    //   append({ attribute: "", value: [] });
    // }
  }, [_data])

  // sanitize values before sending
  const onSubmit = (values) => {
    const _variations = initialValues?.variations ? 
      initialValues?.variations.concat(values.variations)
        : values.variations;
        _data.setValue('variations', _variations)

    const _options = [{
      title: _variations[0]?.value[0]?.value,
      ...values.variation_options,
      options: [{ 
        name: values.variations[0]?.attribute?.name,
        value: values.variations[0]?.value[0]?.meta 
      }]
    }]
    const _variation_options = initialValues?.variation_options ? 
      initialValues?.variation_options.concat(_options) 
        : _options;

    _data.setValue('variation_options', _variation_options)

    closeModal();
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Card className="w-full p-0 md:p-0">
          <div className="border-t border-dashed border-border-200 mb-5 md:mb-8">
            <Title className="text-lg uppercase text-center px-5 md:px-8 mb-0 mt-8">
              {t("form:form-title-options")}
            </Title>
            <div>
              {fields?.map((field: any, index: number) => {
                return (
                  <div key={index} className="border-b border-dashed border-border-200 last:border-0 p-5 md:p-8">
                    <div className="flex items-center justify-between">
                      <Title className="mb-0">
                        {t("form:form-title-options")}
                      </Title>
                    </div>

                    <div className="grid grid-cols-fit gap-5">
                      <div className="mt-5">
                        <Label>{t("form:input-label-attribute-name")}*</Label>
                        <SelectInput
                          name={`variations[${index}].attribute`}
                          control={control}
                          defaultValue={field.attribute}
                          getOptionLabel={(option: any) => option.name}
                          getOptionValue={(option: any) => option.id}
                          options={attributes}
                          isLoading={isLoading}
                          rules={{
                            required: t("common:text-status-required"),
                          }}
                        />
                      </div>

                      <div className="mt-5 col-span-2">
                        <Label>{t("form:input-label-attribute-value")}*</Label>
                        <SelectInput
                          isMulti
                          name={`variations[${index}].value`}
                          control={control}
                          defaultValue={field.value}
                          getOptionLabel={(option) =>
                            option.value
                          }
                          getOptionValue={(option) =>
                            option.id
                          }
                          options={
                            watch(`variations[${index}].attribute`)?.values
                          }
                          rules={{
                            required: t("common:text-status-required"),
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {!!fields?.length && (
              <div className="border-t border-dashed border-border-200 pt-5 md:pt-8 mt-5 md:mt-8">
                <div
                  className="border-b last:border-0 border-dashed border-border-200 p-5 md:p-8 md:last:pb-0 mb-5 last:mb-8 mt-5"
                >
                  <input {...register("id")} type="hidden" />

                  <div className="grid grid-cols-2 gap-5">
                    <Input
                      label={`${t("form:input-label-price")}*`}
                      type="number"
                      {...register("variation_options.price")}
                      required
                      error={t(errors.price?.message)}
                      variant="outline"
                      className="mb-5"
                    />
                    <Input
                      label={t("form:input-label-sale-price")}
                      type="number"
                      {...register("variation_options.sale_price")}
                      required
                      error={t(errors.sale_price?.message)}
                      variant="outline"
                      className="mb-5"
                    />
                    <Input
                      label={`${t("form:input-label-sku")}*`}
                      {...register("variation_options.sku")}
                      required
                      error={t(errors.sku?.message)}
                      variant="outline"
                      className="mb-5"
                    />
                    <Input
                      label={`${t("form:input-label-quantity")}*`}
                      type="number"
                      {...register("variation_options.quantity")}
                      required
                      error={t(errors.quantity?.message)}
                      variant="outline"
                      className="mb-5"
                    />
                  </div>
                  <div className="mb-5 mt-5">
                    <Checkbox
                      {...register("variation_options.is_disable")}
                      error={t(errors.is_disable?.message)}
                      label={t("form:input-label-disable-variant")}
                    />
                  </div>
                </div>
                <div className="mb-4 text-end pr-5">
                  <Button
                    variant="outline"
                    onClick={closeModal}
                    className="me-4"
                    type="button"
                  >
                    {t("form:button-label-back")}
                  </Button>
                  <Button>
                    {_data
                      ? t("form:button-label-update-product")
                      : t("form:button-label-add-product")}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </form>
  );
}
