import { supabase } from "@/config/supabaseConfig";
import { StorageError } from "@supabase/storage-js";
import { v4 as uuidv4 } from "uuid";

interface UploadResponse {
  status: boolean;
  data?: { path?: string; id?: string; fullPath?: string };
  error?: StorageError;
}

export async function uploadFile(file: File | null): Promise<UploadResponse> {
  if (file !== null) {
    try {
      const { data, error } = await supabase.storage
        .from("research-projects-bucket")
        .upload(`documents/${uuidv4()}.pdf`, file);

      if (error !== null) {
        // Handle error
        throw new Error(`Upload Error: ${error.message}`);
      } else if (data !== null) {
        // Handle success
        return { status: true, data };
      } else {
        // Handle unexpected response
        throw new Error(`Unexpected response from Supabase storage`);
      }
    } catch (error) {
      return {
        status: false,
        error:
          error instanceof StorageError
            ? error
            : new StorageError("Unknown error occurred"),
      };
    }
  } else {
    return {
      status: false,
      error: new StorageError("No file provided for upload"),
    };
  }
}

// Data: {path: 'documents/1b744d14-5d78-49ac-9180-67539c57e5cb.pdf', id: '7b8fed9f-ba07-4369-9bb7-a574102d959d', fullPath: 'research-projects-bucket/documents/1b744d14-5d78-49ac-9180-67539c57e5cb.pdf'}
