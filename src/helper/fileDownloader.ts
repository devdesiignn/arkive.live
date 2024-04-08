async function handleDownload({
  filePath,
  fileName,
}: {
  filePath?: string;
  fileName?: string;
}) {
  try {
    if (!filePath) {
      throw new Error("File Path is missing");
    }

    const response = await fetch(filePath);
    // console.log(response);

    const blob = await response.blob();
    // console.log(blob);

    let fileExtension;

    switch (blob.type) {
      case "application/pdf":
        fileExtension = "pdf";
        break;
    }

    // console.log(fileExtension);

    // const parts = response.url.split(".");
    // const fileExtension = response.url.slice(-3);
    // const fileExtension = parts[parts.length - 1];

    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;

    link.download = `${fileName}.${fileExtension}`;

    link.click();

    setTimeout(() => {
      window.URL.revokeObjectURL(blobUrl);
    }, 0);
  } catch (error) {
    console.error(error);
  }
}

export default handleDownload;
