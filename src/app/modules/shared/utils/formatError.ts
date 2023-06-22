export function formatError(errors: any) {
  const list: string[] = [];
  Object.entries(errors).forEach(([key, value]) => {
    list.push(`${key} ${value}`);
  });
  return list;
}
