import { Row } from "@tanstack/react-table";
import { ChangeEventHandler } from "react";
import { Schema } from "zod";

export type QueryPayload = {
    all?: boolean; // Specify 'all' as boolean
    [key: string]: boolean | string | number | undefined; // Allow multiple types for other keys
  };
  export type QueryKey = [string, QueryPayload] | [string];
  export type ApiMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  export interface ApiInfoInterface {
    server?: "apiUrl";
    method: ApiMethods;
    path: string;
    params?: { [key: string]: boolean };
  }

  export interface MutationAttr<T,> {
    body?: T; 
    SLUG?: Record<string, string>; 
    SECOND_SLUG?: Record<string, string>; // Same for SECOND_SLUG
  }
  export interface IErrorMessage {
    message: string;
  }
  export interface IError {
    response: {
      request: {
        responseURL: string;
      };
      status: number;
      data: {
        errors: string[];
        message: string;
      };
    };
  }
  export type ColumnCell ={
    id: string;
     "Country Name": string;
     Age: number; 
     Gender: string;
      "Insurance Type": string;
       City: string
    ; }[]

    export interface ColumnDef<T, V> {
      toggleSorting(arg0: boolean): void;
      getIsSorted(): unknown;
      accessorKey: keyof T | (string & {}) | ((row: T) => V);
      header: string;
      cell?: ({ row }: { row: Row<T> }) => React.ReactNode;
    }
    export type FormSchemaType ={
        first_name: string,
        last_name: string,
        dob:  string,
        country: string,
        state: string,
        city:  string,
        smoker: string,
        smoking_frequency: string,
        home_owner:  string,
        property_type: string,
        home_value: string,
        has_security_system: string,
        security_system_type: string,
        fire_safety: string,
        street:  string,
        zip_code:  string,
        roadside_assistance:  string,
        desired_coverage: string,
        insurance_history: string,
        license_suspensions:string,
        accident_count: string,
        insurance_coverage: string,
        car_owner: string,
        car_model: string,
        car_year: string,
        car_usage: string,
        accidents_last_5_year: string,
      }[];