"use client"

import { useCallback } from "react";
import { useMutation, UseMutationOptions } from "react-query";
import { toast } from "sonner";
import { ApiInfo, ApiType } from "./api-types";
import http from "./http";
import { ApiInfoInterface, IError, MutationAttr } from "@/lib/type";
interface IRes {
  data: {
    message: string;
  };
}

export const post = (path: string, input: unknown) => {
  return http.post(path, input);
};

export const get = async (path: string) => {
  return await http.get(path);
};

export const put = async (path: string, input: unknown) => {
  const { data } = await http.put(path, input);
  return data;
};
export const patch = async (path: string, input: unknown) => {
  return http.patch(path, input);
};

export const deleteFunc = async (path: string, payload: unknown) => {
  const { data } = await http.delete(path, { data: payload });
  return data;
};

const useCallMutation = <T,>(
  mutation: ApiType,
  options?:
    | Omit<
        UseMutationOptions<unknown, IError, MutationAttr<T>, unknown>,
        "mutationFn"
      >
    | undefined
) => {
  const info: ApiInfoInterface = ApiInfo[mutation];

  const mutationFn = useCallback(
    (variables: MutationAttr<T>) => {
      const { method } = info;
      let path = info.path;
      let request;
      if (variables.SLUG) {
        const SLUG = variables.SLUG;
        Object.keys(variables.SLUG).forEach((key: string) => {
          const regex = new RegExp(`:${key}`, "g");
          path = path.replace(regex, SLUG[key]);
        });
      }

      switch (method) {
        case "GET":
          request = get(path);
          break;
        case "POST":
          request = post(path, variables.body);
          break;
        case "PUT":
          request = put(path, variables.body);
          break;
        case "PATCH":
          request = patch(path, variables.body);
          break;
        case "DELETE":
          if (Array.isArray(variables.body)) {
            // Handle multiple IDs
            // Assuming the API expects a batch delete at a specific endpoint
            request = Promise.all(
              variables.body.map((id) => deleteFunc(path, id))
            );
          } else {
            // Handle single ID
            request = deleteFunc(path, variables.body);
          }
          break;
      }

      // @ts-ignore
      return request
        .then((res: IRes) => {
          toast.success("SuccessFul!");
          return res.data;
        })
        .catch((error) => {
          throw error;
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [info, mutation]
  );

  return useMutation(mutationFn, options);
};

export default useCallMutation;
