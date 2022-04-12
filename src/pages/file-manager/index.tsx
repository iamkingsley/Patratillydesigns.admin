import React, { useEffect } from 'react'
import Layout from "@components/layouts/admin";
import FileList from "@components/file-manager/file-list";
import { useFilesQuery } from '@data/file-manager/use-files.query';
import useDeleteFileMutation from '@data/file-manager/use-file-delete.mutation';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { adminOnly } from '@utils/auth-utils';
import { useModalState } from '@components/ui/modal/modal.context';

export default function FileManager() {
    const { data } = useFilesQuery();
    const { data: value } = useModalState();

    const { mutate: deleteFile } = useDeleteFileMutation();

    useEffect(() => {

    }, [])

    const handleFileDelete = (public_id: string) => {
        const newPublic_id = public_id.replace(/\//g, '-');
        deleteFile(newPublic_id);
    }

    return (
        <div className="bg-white p-10">
            <FileList files={data?.data} handleFileDelete={handleFileDelete} setValue={value?.setValue ? value?.setValue : null} />
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