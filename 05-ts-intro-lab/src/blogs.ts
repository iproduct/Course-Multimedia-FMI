import { Indentifiable } from './shared-types.js';
export interface Blog extends Indentifiable{
    title: string;
    text: string;
    tags: Array<string>;
    imageUrl: string;
}