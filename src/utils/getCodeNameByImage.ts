const getCodeNameByImage = (image: File): string => {
  const fileExt = image.name.split(".").pop();
  const fileName = `${Math.random()}.${fileExt}`;

  return fileName;
};

export default getCodeNameByImage;
