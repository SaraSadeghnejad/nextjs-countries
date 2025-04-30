import { ApiInfoInterface } from "@/lib/type";

export type ApiType = "SubmitForm"

export const ApiInfo: { [key in ApiType]: ApiInfoInterface } = {
    SubmitForm: {
    method: "POST",
    path: "/api/insurance/forms/submit"
  },
};
