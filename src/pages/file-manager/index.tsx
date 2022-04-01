import React from 'react'
import Layout from "@components/layouts/admin";
import FileList from "@components/file-manager/file-list";
import { useFilesQuery } from '@data/file-manager/use-files.query';
import useDeleteFileMutation from '@data/file-manager/use-file-delete.mutation';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { adminOnly } from '@utils/auth-utils';

export default function FileManager() {
    const { data } = useFilesQuery();

    const { mutate: deleteFile } = useDeleteFileMutation();

    const handleFileDelete = (public_id: string) => {
        const newPublic_id = transform(public_id)
        deleteFile(newPublic_id);
    }

    const transform = (public_id: string) => {
        return public_id.replace(/\//g, '-');
    }
    return (
        <div>
            <FileList files={data?.data} handleFileDelete={handleFileDelete} />
        </div>
    )
}

FileManager.authenticate = {
    permissions: adminOnly,
};
FileManager.Layout = Layout

export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ["table", "common", "form"])),
    },
});