// =============================================
// FILE: src/lib/uploadthing.ts
// DESCRIPTION: Uploadthing FileRouter configuration
// =============================================

import { createUploadthing, UploadThingError } from "uploadthing/server";
import type { FileRouter } from "uploadthing/server";
import { verifyAuth, generateFileName } from "./auth";

const f = createUploadthing();

/**
 * FileRouter for BestiePals photo uploads
 */
export const uploadRouter = {
  /**
   * Profile photo uploader
   * - Max 1MB (after client-side compression)
   * - JPEG/PNG only
   * - Requires authentication
   * - Generates unique filenames
   */
  profilePhotoUploader: f({
    image: {
      maxFileSize: "1MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req, files }) => {
      // Verify user authentication
      const user = await verifyAuth(req);
      if (!user) {
        throw new UploadThingError("Unauthorized - Please log in");
      }

      // Validate file types (additional server-side validation)
      const file = files[0];
      if (!file) {
        throw new UploadThingError("No file provided");
      }

      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        throw new UploadThingError("Only JPEG and PNG images are allowed");
      }

      // Generate unique filename
      const fileName = generateFileName(user.id, file.name);

      console.log(`[UploadThing] Profile photo upload initiated for user ${user.id}`);

      // Return metadata for onUploadComplete
      return {
        userId: user.id,
        userEmail: user.email,
        originalFileName: file.name,
        generatedFileName: fileName,
      };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      console.log(`[UploadThing] Upload complete for user ${metadata.userId}`);
      console.log(`[UploadThing] File URL: ${file.url}`);
      console.log(`[UploadThing] File size: ${file.size} bytes`);

      // TODO: Update user profile in Supabase with new avatar_url
      // This could be done here or handled by the client after upload

      // Return data to client
      return {
        uploadedBy: metadata.userId,
        fileName: metadata.generatedFileName,
        fileUrl: file.url,
        fileSize: file.size,
      };
    }),

  /**
   * Avatar deletion endpoint (for cleanup)
   */
  avatarDeleter: f({
    image: {
      maxFileSize: "1MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const user = await verifyAuth(req);
      if (!user) {
        throw new UploadThingError("Unauthorized - Please log in");
      }

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata }) => {
      console.log(`[UploadThing] Avatar deletion for user ${metadata.userId}`);
      return { deletedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
