<script lang="ts">
import type { Snippet } from "svelte";

const props: {
	header?: Snippet;
	children?: Snippet;
	disablePadding?: boolean;
} = $props();
</script>

<div class="grid grid-rows-[auto_1fr] max-h-screen">
    {#if props.header}
        <header>
            {@render props.header()}
        </header>
    {/if}
    {#if props.children}
        <main class="overflow-auto" class:p-4={!props.disablePadding}>
            {@render props.children()}
        </main>
    {/if}
</div>
