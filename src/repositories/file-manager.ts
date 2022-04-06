import { AttachmentInput } from "@ts-types/generated";
import Base from "./base";

class FileManager extends Base<AttachmentInput, AttachmentInput> {
    getFiles = (url: string) => {
        return this.http(url, "get");
    };

    deleteFile = (url: string) => {
        return this.http(url, "delete");
    };
}

export default new FileManager();
