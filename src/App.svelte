<script lang="ts">
    import { onMount } from "svelte";
    import Main from "./lib/main/main.svelte";
    import { keydown } from './lib/utilities/nui';
    onMount(()=>{
        window.addEventListener("keydown",keydown);
        return ()=>{
            window.removeEventListener("keydown",keydown);
        }
    })
</script>

<Main/>