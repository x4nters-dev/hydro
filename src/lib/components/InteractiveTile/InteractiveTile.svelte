<script lang="ts">
import type { Snippet } from "svelte";

const props: {
	header?: Snippet;
	children?: Snippet;
	onclick?: (event: Event) => void;
} = $props();
</script>

<div
    class="card card-hover preset-tonal rounded-xl flex flex-col overflow-hidden"
    role="button"
    onclick={props.onclick}
    tabindex="0"
    onkeydown={e => e.key === 'Enter' && props.onclick?.(e)}
>
    {#if props.header}
        <header>
            {@render props.header()}
        </header>
    {/if}

    {#if props.children}
        <main class="p-4">
            {@render props.children()}
        </main>
    {/if}
</div>

