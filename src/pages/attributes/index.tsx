import Card from "@components/common/card";
import Layout from "@components/layouts/admin";
import AttributeList from "@components/attribute/attribute-list";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useAttributesQuery } from "@data/attributes/use-attributes.query";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SortOrder } from "@ts-types/generated";
import { useState } from "react";
import LinkButton from "@components/ui/link-button";
import { ROUTES } from "@utils/routes";
import Search from "@components/common/search";
import TypeFilter from "@components/category/type-filter";

export default function AttributePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const [orderBy, setOrder] = useState("created_at");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  const {
    data,
    isLoading: loading,
    error,
  } = useAttributesQuery({ orderBy, sortedBy });

  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
    setPage(1);
  }
  // function handlePagination(current: any) {
  //   setPage(current);
  // }
  return (
    <>
      <Card className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="md:w-1/4 mb-4 md:mb-0">
          <h1 className="text-xl font-semibold text-heading">
            {t("common:sidebar-nav-item-attributes")}
          </h1>
        </div>

        <div className="flex flex-col md:flex-row items-center w-full md:w-3/4 xl:w-2/4 ms-auto">
          <LinkButton
            href={`/attributes/create`}
            className="h-12 mt-5 md:mt-0 md:ms-auto w-full md:w-auto"
          >
            <span>
              + {t("form:button-label-add")} {t("common:attribute")}
            </span>
          </LinkButton>
        </div>
      </Card>
      <AttributeList
        attributes={data?.attributes as any}
        onOrder={setOrder}
        onSort={setColumn}
      />
    </>
  );
}

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["table", "common", "form"])),
  },
});

AttributePage.Layout = Layout;
