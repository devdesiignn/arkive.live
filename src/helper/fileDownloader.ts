async function handleDownload({
  filePath,
  fileName,
}: {
  filePath: string;
  fileName: string;
}) {
  try {
    const response = await fetch(filePath);
    const blob = await response.blob();

    const fileExtension = response.url.slice(-3);

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
