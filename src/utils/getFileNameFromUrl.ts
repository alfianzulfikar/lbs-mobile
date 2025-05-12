const getFileNameFromUrl = (fileUrl: string) => {
  const url = fileUrl || '';
  const regex = /[^/]+$/;
  const regexRes = url.match(regex);
  const fileName = regexRes && regexRes.length > 0 ? regexRes[0] : '';
  return fileName;
};

export default getFileNameFromUrl;
