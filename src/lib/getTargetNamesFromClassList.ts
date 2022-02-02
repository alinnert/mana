import { targetClassNamePrefix } from './getTargetElements';

export function getTargetNamesFromClassList(classList: DOMTokenList): string[] {
  return Array.from(classList)
    .filter((className) => className.startsWith(targetClassNamePrefix))
    .map((className) => className.replace(/^@/, ''));
}
