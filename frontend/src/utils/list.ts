export function updateInList<Item>(
  list: Item[], oldItem: Item, newItemFields: Partial<Item>,
): Item[] {
  return list.map((item) => item === oldItem ? ({ ...item, ...newItemFields }) : item)
}

export function prependToList<Item>(list: Item[], item: Item): Item[] {
  return [ item ].concat(list)
}

export function excludeFromList<Item>(list: Item[], item: Item): Item[] {
  return list.filter((w) => w !== item)
}
