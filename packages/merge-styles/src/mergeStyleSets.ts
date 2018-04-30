import { extractStyleParts } from './extractStyleParts';
import { concatStyleSets } from './concatStyleSets';
import { IStyle } from './IStyle';
import { styleToRegistration, applyRegistration } from './styleToClassName';

/**
 * Allows you to pass in 1 or more sets of areas which will return a merged
 * set of classes.
 *
 * @public
 */
export function mergeStyleSets<K extends string>(
  ...cssSets: ({[P in K]?: IStyle } | null | undefined)[]
): {[P in K]: string} {
  // tslint:disable-next-line:no-any
  const classNameSet: any = {};
  const classMap: { [key: string]: string } = {};

  let cssSet = cssSets[0];

  if (cssSet) {
    if (cssSets.length > 1) {
      cssSet = concatStyleSets(...cssSets);
    }

    const registrations = [];

    for (const prop in cssSet) {
      if (cssSet.hasOwnProperty(prop)) {
        const args: IStyle = cssSet[prop];

        // tslint:disable-next-line:no-any
        const { classes, objects } = extractStyleParts(args as any);
        const registration = styleToRegistration({ displayName: prop }, objects);

        registrations.push(registration);

        if (registration) {
          classMap[prop] = registration.className;
          classNameSet[prop] = classes.concat([registration.className]).join(' ');
        }
      }
    }

    for (const registration of registrations) {
      if (registration) {
        applyRegistration(registration, classMap);
      }
    }
  }

  return classNameSet;
}
