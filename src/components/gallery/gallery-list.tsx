import { useState } from "react";
import { Table } from "@components/ui/table";
import { Attribute, Shop, SortOrder } from "@ts-types/generated";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import TitleWithSort from "@components/ui/title-with-sort";
import Image from "next/image";
import { siteSettings } from "@settings/site.settings";
import ActionButtons from "@components/common/action-buttons";


export type IProps = {
    attributes: Attribute[] | undefined;
    onSort: (current: any) => void;
    onOrder: (current: string) => void;
};
const GalleryList = ({ galleries, onSort, onOrder }: any) => {
    const { t } = useTranslation();
    const router = useRouter();

    const alignLeft =
        router.locale === "ar" || router.locale === "he" ? "right" : "left";
    const alignRight =
        router.locale === "ar" || router.locale === "he" ? "left" : "right";

    const [sortingObj, setSortingObj] = useState<{
        sort: SortOrder;
        column: string | null;
    }>({
        sort: SortOrder.Desc,
        column: null,
    });

    const onHeaderClick = (column: string | null) => ({
        onClick: () => {
            onSort((currentSortDirection: SortOrder) =>
                currentSortDirection === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc
            );
            onOrder(column!);

            setSortingObj({
                sort:
                    sortingObj.sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
                column: column,
            });
        },
    });

    let columns = [
        {
            title: t("table:table-item-image"),
            dataIndex: "image",
            key: "image",
            align: alignLeft,
            width: 74,
            render: (image: any) => (
                <Image
                    src={image?.thumbnail ?? siteSettings.product.placeholder}
                    layout="fixed"
                    width={42}
                    height={42}
                    className="rounded overflow-hidden"
                />
            ),
        },

        // {
        //   title: t("table:table-item-id"),
        //   dataIndex: "id",
        //   key: "id",
        //   align: "center",
        //   width: 60,
        // },
        {
            // title: t("table:table-item-title"),
            title: (
                <TitleWithSort
                    title={t("table:table-item-title")}
                    ascending={
                        sortingObj.sort === SortOrder.Asc && sortingObj.column === "name"
                    }
                    isActive={sortingObj.column === "name"}
                />
            ),
            className: "cursor-pointer",
            dataIndex: "description",
            key: "description",
            align: "center",
            onHeaderCell: () => onHeaderClick("nadescriptionme"),
            render: (description: any) => <span className="whitespace-nowrap">{description}</span>,
        },
        // {
        //   title: t("table:table-item-shop"),
        //   dataIndex: "shop",
        //   key: "shop",
        //   width: 120,
        //   align: "center",
        //   ellipsis: true,
        //   render: (shop: Shop) => (
        //     <span className="whitespace-nowrap truncate">{shop?.name}</span>
        //   ),
        // },
        // {
        //     title: t("table:table-item-values"),
        //     dataIndex: "values",
        //     key: "values",
        //     align: alignLeft,
        //     render: (values: any) => {
        //         return (
        //             <span className="whitespace-nowrap">
        //                 {values?.map((singleValues: any, index: number) => {
        //                     return index > 0
        //                         ? `, ${singleValues.value}`
        //                         : `${singleValues.value}`;
        //                 })}
        //             </span>
        //         );
        //     },
        // },
        {
            title: t("table:table-item-actions"),
            dataIndex: "id",
            key: "actions",
            align: alignRight,
            render: (id: string) => (
                <ActionButtons
                    id={id}
                    // editUrl={`${router.asPath}/${id}/edit`}
                    deleteModalView="DELETE_ATTRIBUTE"
                />
            ),
        },
    ];

    // if (router?.query?.shop) {
    //     columns = columns?.filter((column) => column?.key !== "shop");
    // }
    return (
        <div className="rounded overflow-hidden shadow mb-8">
            <Table
                // @ts-ignore
                columns={columns}
                emptyText={t("table:empty-table-data")}
                data={galleries?.data}
                rowKey="id"
                scroll={{ x: 380 }}
            />
        </div>
    );
};

export default GalleryList;
