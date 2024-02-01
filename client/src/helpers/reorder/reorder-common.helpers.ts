export function getDeepCopy<T>(item: T):T {
  return JSON.parse(JSON.stringify(item));
}

export function cutElementBySrartIndexAndPasteByEndIndex<T>(
  list:T[],
  startIndex:number,
  endIndex:number,
):T[] {
  const copyList = getDeepCopy(list);
  const [removed] = copyList.splice(startIndex, 1);
  copyList.splice(endIndex, 0, removed);
  return copyList;
}
