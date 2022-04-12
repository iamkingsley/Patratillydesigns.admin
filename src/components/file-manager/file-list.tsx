import React from 'react'
import Image from 'next/image'
import TrashIcon from "@components/icons/trash"
import FileManagerForm from './file-manager-form'

function FileList({ files, handleFileDelete, setValue }) {
    if (!files) {
        return <div>No files</div>
    }

    return (
        <div>
            <FileManagerForm />
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {files?.map((file) => (
                    <div className='h-40 w-40 relative border-3 border-sky-550 rounded-lg
                     hover:shadow-lg shadow-md'>
                        <Image src={file?.original} width={450} height={400} alt="" />
                        <div className="absolute top-1 right-0">
                            <TrashIcon className='text-red-700 w-5 h-5 hover:cursor-pointer'
                                onClick={() => handleFileDelete(file?.public_id)} />
                        </div>
                        {setValue &&
                            <div className="absolute top-1 left-0">
                                <input type="checkbox" className=" checked:bg-blue-500 hover:cursor-pointer"
                                    onChange={setValue ? setValue("image", file) : ""} />
                            </div>
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FileList