import { createUploadthing } from "uploadthing/next";
const f = createUploadthing();

export const ourFileRouter = {
  documentPDFs: f({ pdf: { maxFileSize: "4MB" } })
      .onUploadComplete(async ({ file }) => {
          return { fileUrl: file.url };
      }),
};

export type OurFileRouter = typeof ourFileRouter;
