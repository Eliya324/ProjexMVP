import { createUploadthing } from "uploadthing/next";
const fileUploader = createUploadthing();

export const ourFileRouter = {
    documentPDFs: fileUploader({ pdf: { maxFileSize: "4MB" } })
        .onUploadComplete(async ({ file }) => {
            return { fileUrl: file.url };
        }),
};

export type OurFileRouter = typeof ourFileRouter;
