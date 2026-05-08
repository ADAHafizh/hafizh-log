import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cls(...args: ClassValue[]) {
    return twMerge(clsx(args))
}

import type { PaginateFunction } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';

import type { collections } from '@/src/content/config';
type CollectionName = keyof typeof collections;

interface PaginationOptions {
    pageSize?: number;
    sortByFn?: ((a: CollectionEntry<CollectionName>, b: CollectionEntry<CollectionName>) => number);
    filterFn?: (post: CollectionEntry<CollectionName>) => boolean;
    collection: CollectionName
}


export function createCollectionPagination(options: PaginationOptions) {
    const {
        pageSize = 10,
        sortByFn ,
        filterFn,
        collection
    } = options;

    return async ({ paginate }: { paginate: PaginateFunction }) => {
        let items = await getCollection(collection);

        if (filterFn) {
            items = items.filter(filterFn);
        }

        if (sortByFn) {
            items = items.sort(sortByFn);
        } 

        return paginate(items, { pageSize });
    };
}

