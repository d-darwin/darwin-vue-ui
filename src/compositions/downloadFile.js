/** core **/
import { nextTick } from "vue";

/** compositions **/
import consoleWarn from "../utils/consoleWarn";

/**
 *
 * @returns {{downloadFile: (function(*=): Promise<void>)}}
 */
export default function useDownloadFile() {
  const downloadFile = async fileData => {
    if (fileData.name) {
      let fileBlob = null;

      if (fileData.link) {
        // it's specially constructed object with file link: download file from the network first
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
      } else {
        // it's just uploaded to browser file
        fileBlob = new Blob([fileData]);
      }

      if (fileBlob) {
        const fileURL = window.URL.createObjectURL(fileBlob);
        const fileLink = document.createElement("a");

        fileLink.href = fileURL;
        fileLink.setAttribute("download", fileData.name);
        document.body.appendChild(fileLink);

        fileLink.click();

        await nextTick(() => {
          document.body.removeChild(fileLink);
        });
      }
    }
  };

  return {
    downloadFile
  };
}
