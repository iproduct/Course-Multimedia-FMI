export type IdType = string | undefined;

export interface Identifiable {
    id: IdType;
}

export interface ResourceType<T> extends Function {
  typeId: string;
  new(...args: any[]): T;
}

