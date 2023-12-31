import * as pdfjsLib from 'pdfjs-dist';

export const extractPdfText = async () => {
  const pdfFilePath = './dhl-handbuch-funktion-retoure-v7-122019.pdf';

  const loadingTask = pdfjsLib.getDocument(pdfFilePath);

  loadingTask.promise
    .then(function (doc) {
      const numPages = doc.numPages;
      console.log('Number of Pages: ' + numPages);

      let lastPromise;
      lastPromise = doc.getMetadata().then(function (data) {
        console.log('## Info');
        console.log(JSON.stringify(data.info, null, 2));
        console.log();
      });

      const loadPage = function (pageNum: number) {
        return doc.getPage(pageNum).then(function (page) {
          console.log();
          console.log('# Page ' + pageNum);
          console.log();
          return page
            .getTextContent()
            .then(function (content) {
              const strings = content.items.map(function (item) {
                if ('str' in item) {
                  return item.str;
                }
              });
              console.log(strings.join(' '));
              page.cleanup();
            });
        });
      };
      for (let i = 1; i <= numPages; i++) {
        lastPromise = lastPromise.then(loadPage.bind(null, i));
      }
      return lastPromise;
    })
    .then(
      function () {
        console.log();
        console.log('# End of Document');
      },
      function (err) {
        console.error('Error: ' + err);
      },
    );
};
