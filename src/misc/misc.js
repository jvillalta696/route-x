export const replaceNullWithUndefined = (obj) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (value === null) {
        obj[key] = undefined;
      }
    });
  };