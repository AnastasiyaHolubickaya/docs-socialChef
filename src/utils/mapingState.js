export const updateMass = (items, itemsId,propName, property ) => {
  return  items.map(u => {
        if (u[propName] === itemsId) {
            return {...u, ...property}
        }
        return u;
    })
};

