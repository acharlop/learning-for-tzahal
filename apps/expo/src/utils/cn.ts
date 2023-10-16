export function cn(...args: (undefined | null | string | boolean)[]): string {
  return args
    .flat()
    .filter((x) => typeof x === "string")
    .join(" ");
}
