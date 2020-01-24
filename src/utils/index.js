const getSlug = slug => slug.replace(/\s+/g, '-').toLowerCase();

const getFlavorSlug = flavor =>
  getSlug(`/flavor/${flavor.vendor} ${flavor.name}`);

const getIngredientSlug = ingredient =>
  getSlug(`/ingredient/${ingredient.name}`);

const getVendorSlug = vendor =>
  getSlug(`/vendor/${vendor.code} ${vendor.name}`);

const getCategoryVariant = category => {
  let badgeVariant;

  switch (category) {
    case 'Avoid':
      badgeVariant = 'danger';
      break;
    case 'Caution':
      badgeVariant = 'warning';
      break;
    default:
      badgeVariant = 'info';
      break;
  }

  return badgeVariant;
};

const createWebWorker = worker => {
  const code = worker.toString();
  const blob = new Blob([`(${code})()`]);

  return new Worker(URL.createObjectURL(blob));
};

module.exports = {
  createWebWorker,
  getFlavorSlug,
  getIngredientSlug,
  getVendorSlug,
  getCategoryVariant
};
