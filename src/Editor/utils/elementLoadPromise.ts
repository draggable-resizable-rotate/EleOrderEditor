// file => HtmlImage
export async function imageResourcePromise(url: string): Promise<HTMLImageElement> {
  return new Promise((fulfill, reject) => {
    const imageElement = document.createElement('img');

    imageElement.onload = function () {
      fulfill(imageElement);
    };
    // 不支持的直接加载的图片类型
    imageElement.onerror = function () {
      reject();
    };
    imageElement.src = url;
  });
}



export function createDataUrlAsync(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      resolve(e?.target?.result as string);
    };
  });
}
