import { Colors } from '@ht6/react-ui/dist/styles';
const transformColor = (color: string) =>
  color.replaceAll(/-.{1}/g, (str) => str.charAt(1).toUpperCase());

export function colorClassName(color: Colors, prefix: string = '') {
  return `${prefix ? prefix + '-' : ''}${color}`.replaceAll(/-.{1}/g, (str) =>
    str.charAt(1).toUpperCase()
  );
}
