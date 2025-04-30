import { QueryKey } from "@/lib/type";


export const replaceKey = (queryKey: QueryKey) => {
  const [_key, _params] = queryKey;

  const replacedKey = _params
    ? Object.keys(_params).reduce((key, prop) => {
        return key.replace(new RegExp(`{${prop}}`, "g"),String(_params[prop]));
      }, _key)
    : _key;

  return replacedKey;
};
