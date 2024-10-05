const getLocalStorageItem = () => {
  const lsItem = localStorage.getItem("auth");

  if (lsItem) {
    const item = JSON.parse(lsItem);
    return item;    
  } else {
    return null;
  }
};

export default getLocalStorageItem;