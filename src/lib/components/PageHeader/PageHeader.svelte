<script lang="ts">
import BackButton from "$lib/components/BackButton/BackButton.svelte";
import type { Snippet } from "svelte";

const props: {
	title?: string;
	showBackButton?: boolean;
	actions?: Snippet;
} = $props();
</script>

<div class="flex item-center justify-between p-4">
    <div class="flex items-center gap-4">
        {#if props.showBackButton}
            <BackButton />
        {/if}
        <span class="h2">
            {props.title}
        </span>
    </div>

    <div class="flex gap-4 items-center">
        {#if props.actions}
            {@render props.actions()}
        {/if}
    </div>
</div>
