import { writable } from "svelte/store";

interface allUIinterface{
    isOpening:boolean
}

export const allState = writable<allUIinterface>({
    isOpening:false
})