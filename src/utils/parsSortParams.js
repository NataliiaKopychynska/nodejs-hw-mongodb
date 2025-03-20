function parsSortBy(value) {
  if (typeof value === 'undefined') {
    return '_id';
  }
  const keys = ['_id', 'name', 'email', 'isFavourite', 'contactType'];
  if (keys.includes(value) !== true) {
    return '_id';
  }
  return value;
}

function parseSortOrder(value) {
  if (typeof value === 'undefined') {
    return 'asc';
  }
  if (!['asc', 'desc'].includes(value)) {
    return 'asc';
  }
  return value;
}

export function parsSortParams(query) {
  const { sortBy, sortOrder } = query;

  const parsedSortBy = parsSortBy(sortBy);
  const parseOrderBy = parseSortOrder(sortOrder);
  console.log({ sortBy, sortOrder });

  return {
    sortBy: parsedSortBy,
    sortOrder: parseOrderBy,
  };
}
