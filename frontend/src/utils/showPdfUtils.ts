export const showFile = (blobData: Blob) => {
  // Adapted from: https://blog.jayway.com/2017/07/13/open-pdf-downloaded-api-javascript/
  const fileName = 'contract.pdf';

  const newBlob = new Blob([blobData], { type: 'application/pdf' });

  const newWindow = window.open('', 'contract', 'width=800,height=1200');
  if (!isNil(newWindow)) {
    setTimeout(() => {
      const dataUrl = window.URL.createObjectURL(newBlob);
      const title = newWindow.document.createElement('title');
      const iframe = newWindow.document.createElement('iframe');

      title.appendChild(document.createTextNode('contract'));
      newWindow.document.head.appendChild(title);

      iframe.setAttribute('src', dataUrl);
      iframe.setAttribute('width', '100%');
      iframe.setAttribute('height', '100%');

      newWindow.document.body.appendChild(iframe);

      setTimeout(() => {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(dataUrl);
      }, 100);
    }, 100);
  } else {
    alert('To display reports, please disable any pop-blockers for this page and try again.');
  }
};
function isNil(value: any): value is null | undefined {
  return value === null || value === undefined;
}
