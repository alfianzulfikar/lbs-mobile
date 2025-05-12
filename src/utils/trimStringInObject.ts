const removeMultipleSpace = (item: any) => {
  if (typeof item == 'string') {
    return item.split(' ').filter(Boolean).join(' ');
  }
  return item;
};

export default function trimStringInObject(req: any) {
  let newBody = Array.isArray(req) ? [...req] : {...req};
  Object.keys(req).forEach(key => {
    if (
      Array.isArray(req[key]) ||
      (typeof req[key] == 'object' && req[key] == Object(req[key]))
    ) {
      newBody[key] = trimStringInObject(req[key]);
    } else {
      let newValue = typeof req[key] == 'string' ? req[key].trim() : req[key];
      newValue =
        typeof newValue == 'string' ? removeMultipleSpace(newValue) : newValue;

      newBody[key] = newValue;
    }
  });
  return newBody;
}
