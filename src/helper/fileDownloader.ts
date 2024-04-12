import { supabase } from "@/utils/supabase";
import { StorageError } from "@supabase/storage-js";

async function handleDownload({
  filePath,
  fileName,
}: {
  filePath?: string;
  fileName?: string;
}): Promise<void> {
  try {
    if (!filePath) {
      throw new Error("File Path is missing");
    }

    const [bucket, folder, file] = filePath.split("/");
    // console.log(bucket, folder, file);

    const { data, error }: { data: Blob | null; error: StorageError | null } =
      await supabase.storage.from(bucket).download(`${folder}/${file}`);

    if (error) {
      throw new Error(error.message);
    }
    // console.log("data", data);

    let fileExtension;
    switch (data?.type) {
      case "application/pdf":
        fileExtension = "pdf";
        break;
    }
    // console.log(fileExtension);

    const dataUrl = window.URL.createObjectURL(data!);
    const link = document.createElement("a");
    link.href = dataUrl;

    link.download = `${fileName}.${fileExtension}`;

    link.click();

    setTimeout(() => {
      window.URL.revokeObjectURL(dataUrl);
    }, 0);
  } catch (error) {
    console.error(error);
  }
}

export default handleDownload;
