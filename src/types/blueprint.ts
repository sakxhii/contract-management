export type FieldType = "text" | "number" | "date" | "signature" | "checkbox" | "dropdown" | "textarea";

export interface Field {
  id: string;
  type: FieldType;
  label: string;
  position: {
    x: number;
    y: number;
  };
}

export interface Blueprint {
  id: string;
  name: string;
  fields: Field[];
}
