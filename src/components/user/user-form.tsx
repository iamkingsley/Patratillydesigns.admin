import Button from "@components/ui/button";
import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import { useForm } from "react-hook-form";
import Card from "@components/common/card";
import Description from "@components/ui/description";
import { useCreateUserMutation } from "@data/user/use-user-create.mutation";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { customerValidationSchema } from "./user-validation-schema";

type FormValues = {
  name: string;
  email: string;
  password: string;
  measurement: {
    bustName: string;
    waistName: string;
    hipName: string;
    shoulderWaistName: string;
    shoulderNippleName: string;
    shoulderUnderBustName: string;
    blouseLengthName: string;
    fullLengthName: string;
    dressLegthName: string;
    slitLengthName: string;
    acrossBackName: string;
    acrossChestName: string;
    aroundArmName: string;
    sleeveLengthName: string;
    shirtLenghtName: string;
  }

};

const defaultValues = {
  email: "",
  password: "",
};

const CustomerCreateForm = () => {
  const { t } = useTranslation();
  const { mutate: registerUser, isLoading: loading } = useCreateUserMutation();

  const {
    register,
    handleSubmit,
    setError,

    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(customerValidationSchema),
  });

  async function onSubmit({
     name, 
     email, 
     password,
     measurement,
     }: FormValues) {
    registerUser(
      {
        variables: {
          name,
          email,
          password,
          measurement
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
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t("form:form-title-information")}
          details={t("form:customer-form-info-help-text")}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t("form:input-label-name")}
            {...register("name")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.name?.message!)}
          />
          <Input
            label={t("form:input-label-email")}
            {...register("email")}
            type="email"
            variant="outline"
            className="mb-4"
            error={t(errors.email?.message!)}
          />
          <PasswordInput
            label={t("form:input-label-password")}
            {...register("password")}
            error={t(errors.password?.message!)}
            variant="outline"
            className="mb-4"
          />
        </Card>
        
      </div>
      <div className="flex flex-wrap my-5 sm:my-8">
         <Description
          title={t("form:form-title-measurement")}
          details={t("form:customer-form-info-help-text")}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />
      <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t("form:input-bust-name")}
            {...register("measurement.bustName")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.measurement?.bustName?.message!)}
          />
          <Input
            label={t("form:input-waist-name")}
            {...register("measurement.waistName")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.measurement?.waistName?.message!)}
          />
            <Input
            label={t("form:input-hip-name")}
            {...register("measurement.hipName")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.measurement?.hipName?.message!)}
          />
           <Input
            label={t("form:input-shoulder-waist-name")}
            {...register("measurement.shoulderWaistName")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.measurement?.shoulderWaistName?.message!)}
          />
           <Input
            label={t("form:input-shoulder-to-nipple-name")}
            {...register("measurement.shoulderNippleName")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.measurement?.shoulderNippleName?.message!)}
          />
           <Input
            label={t("form:input-shoulder-to-under-bust-name")}
            {...register("measurement.shoulderUnderBustName")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.measurement?.shoulderUnderBustName?.message!)}
          />
           <Input
            label={t("form:input-blouse-length-name")}
            {...register("measurement.blouseLengthName")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.measurement?.blouseLengthName?.message!)}
          />
           <Input
            label={t("form:input-shirt-lenght-name")}
            {...register("measurement.shirtLenghtName")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.measurement?.shirtLenghtName?.message!)}
          />
           <Input
            label={t("form:input-full-length-name")}
            {...register("measurement.fullLengthName")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.measurement?.fullLengthName?.message!)}
          />
           <Input
            label={t("form:input-dress-length-name")}
            {...register("measurement.dressLegthName")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.measurement?.dressLegthName?.message!)}
          />
           <Input
            label={t("form:input-slit-length-name")}
            {...register("measurement.slitLengthName")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.measurement?.slitLengthName?.message!)}
          />
           <Input
            label={t("form:input-across-back-name")}
            {...register("measurement.acrossBackName")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.measurement?.acrossBackName?.message!)}
          />
           <Input
            label={t("form:input-across-chest-name")}
            {...register("measurement.acrossChestName")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.measurement?.acrossChestName?.message!)}
          />
           <Input
            label={t("form:input-around-arm-name")}
            {...register("measurement.aroundArmName")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.measurement?.aroundArmName?.message!)}
          />
           <Input
            label={t("form:input-sleeve-length-name")}
            {...register("measurement.sleeveLengthName")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.measurement?.sleeveLengthName?.message!)}
          /> 
        </Card>
      </div>

      <div className="mb-4 text-end">
        <Button loading={loading} disabled={loading}>
          {t("form:button-label-create-customer")}
        </Button>
      </div>
    </form>
  );
};

export default CustomerCreateForm;
