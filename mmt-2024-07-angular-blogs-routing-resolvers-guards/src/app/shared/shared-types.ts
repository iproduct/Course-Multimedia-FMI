export type IdType = string;

export interface Identifiable<K> {
    id: K;
}


export interface EntityConstructor<E> {
  new (...args:any): E;
  className: string;
}

export type Optional<V> = V | undefined;

export type StringDict = { [key: string]: string };
