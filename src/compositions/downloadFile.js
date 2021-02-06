import consoleWarn from "../utils/consoleWarn";

export default function useDownloadFile() {
  const downloadFile = async fileData => {
    if (fileData.name) {
      let fileBlob = null;

      if (fileData.link) {
        // download file from the network
        try {
          const response = await fetch(fileData.link);
          if (!response.ok) {
            consoleWarn(
              `Network response wasn't OK for link "${fileData.link}".`,
              response
            );

            fileBlob = await response.blob();
          }
        } catch (e) {
          consoleWarn(`Can't download fie from link "${fileData.link}".`, e);
        }
      } else if (fileData.file) {
        // just uploaded to browser file
        fileBlob = new Blob([fileData.file]);
      }

      if (fileBlob) {
        const fileURL = window.URL.createObjectURL(fileBlob);
        const fileLink = document.createElement("a");

        fileLink.href = fileURL;
        fileLink.setAttribute("download", fileData.name);
        document.body.appendChild(fileLink);

        fileLink.click();

        // TODO: destroy link element after file download finishes
      }
    }
  };

  return {
    downloadFile
  };
}
