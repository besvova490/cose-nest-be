import { union, filter, isEmpty, isEqual } from 'lodash';

type TObjectArg = Record<string, unknown>;

export function mapSameValues(
  sourceObject: TObjectArg,
  updatedObject: TObjectArg,
) {
  const allKeys = union(Object.keys(sourceObject), Object.keys(updatedObject));

  const differentKeys = filter(
    allKeys,
    (key) => !isEqual(sourceObject[key], updatedObject[key]),
  );

  const difference = differentKeys.reduce(
    (acc, key) => ({
      ...acc,
      [key]: sourceObject[key],
    }),
    {},
  );

  if (isEmpty(difference)) {
    return null;
  }

  return difference;
}
