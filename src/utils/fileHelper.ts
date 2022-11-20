export const encodeFileAsBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        var fileReader = new FileReader();

        fileReader.onload = (fileLoadedEvent) =>
            resolve(fileLoadedEvent.target?.result as string);

        fileReader.onerror = () => reject("Invalid Image");

        fileReader.readAsDataURL(file);
    });