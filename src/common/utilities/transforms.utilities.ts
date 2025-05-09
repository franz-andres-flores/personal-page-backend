export const toBoolean = (value: string): boolean => {
  return value.toString() === 'true' || value.toString() === '1';
}