import { type RouteLocationNormalizedLoadedGeneric } from 'vue-router';

export interface GSK_ROUTE {
  name: string;
  params: {
    [key: string]: string | string[];
  };
}

/**
 * This function generates route to new path keeping all the parameters
 * same as the current route except the ones that are supplied
 *
 * @param {Route} route - The current route object
 * @param {string} pathName - The name of the new path
 * @param {Object} params - The parameters to be replaced in the new path
 * @return {Route} - The new route object
 *
 */

export const generateRoute = (
  route: RouteLocationNormalizedLoadedGeneric,
  pathName: string,
  params: { [key: string]: string | string[] } = {},
): GSK_ROUTE => {
  // All existing params
  const existingParams = { ...route.params };
  const newRoute: GSK_ROUTE = { name: pathName, params: {} };
  // Loop through the existing params and add them to the new route
  for (const key in existingParams) {
    if (existingParams[key]) {
      newRoute.params[key] = existingParams[key];
    }
  }
  // Loop through the params and add them to the new route
  for (const key in params) {
    if (params[key]) {
      newRoute.params[key] = params[key];
    }
  }
  // Add the path to the new route
  return newRoute;
};
