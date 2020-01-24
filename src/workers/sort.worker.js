export default () => {
  const get = (object, keys, defaultVal) => {
    keys = Array.isArray(keys) ? keys : keys.split('.');
    object = object[keys[0]];
    if (object && keys.length > 1) {
      return get(object, keys.slice(1));
    }
    return object === undefined ? defaultVal : object;
  };

  const sortOnField = field => direction => (a, b) =>
    direction
      ? get(a, field)?.localeCompare?.(get(b, field))
      : get(b, field)?.localeCompare?.(get(a, field));

  const sortFunctions = {
    vendor: sortOnField('vendor.name'),
    flavor: sortOnField('flavor.name'),
    ingredient: sortOnField('ingredient.name'),
    category: sortOnField('ingredient.category')
  };

  const defaultSort = (a, b) =>
    sortOnField('vendor', true)(a, b) ||
    sortOnField('flavor', true)(a, b) ||
    sortOnField('ingredient.name', true)(a, b);

  self.addEventListener(
    'message',
    ({ data: { results, column, direction } }) => {
      const newResults = results.slice(0);

      if (!column) {
        newResults.sort(defaultSort);
      } else {
        newResults.sort(sortFunctions[column](direction));
      }

      postMessage(newResults);
    }
  );
};
