export const addFunction = (name, list) => {
    let tempList = [...list, {name: name, favourite: false}];
    return tempList;
}

export const deleteFunction = (name, list) => {
    let tempList = [...list].filter(listItem=> listItem.name !== name);
    return tempList;
}

export const favFunction = (item, list) => {
    let tempList = list.map(listItem => listItem.name === item.name ? {...listItem, favourite: !item.favourite} : listItem);
    return tempList;
}