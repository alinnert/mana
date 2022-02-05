import { targetClassNamePrefix } from './getTargetElements';

/**
 * Extracts all target names from a classList (`DOMTokenList`).
 * @param classList A `DOMTokenList` to extract target names from.
 * @returns A list of target names.
 */
export function getTargetNamesFromClassList(classList: DOMTokenList): string[] {
  return Array.from(classList)
    .filter((className) => className.startsWith(targetClassNamePrefix))
    .map((className) => className.replace(/^@/, ''));
}
