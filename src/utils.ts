const optional = <T extends string | number | boolean | null | undefined>(
  name: string,
  fallback: T
): string | T => process.env[name] || fallback;

const required = (name: string, valueOnly:boolean = false): string | object => {
  if (!process.env[name]?.trim()) {
    throw new Parse.Error(Parse.Error.SCRIPT_FAILED, "Missing required env variable: " + name);
  }
  return process.env[name];
};

const persists = (name: string): boolean => {
  return process.env[name] && process.env[name].length > 0;
};

export { optional, required, persists };
