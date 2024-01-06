export const parseFileNameExt = (filename: string) => {
  const fileNameSplitExt = filename.split('.');
  return { fileName: fileNameSplitExt[0], ext: fileNameSplitExt[1] };
};
