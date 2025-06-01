<script lang="ts">
import { Modal } from "@skeletonlabs/skeleton-svelte";
import type { Snippet } from "svelte";
import IconButton from "$lib/components/IconButton/IconButton.svelte";
import { X } from "lucide-svelte";

const props: {
	title: string;
	content: Snippet<[boolean, () => void]>;
	trigger: Snippet;
} = $props();

let open = $state(false);

function close(): void {
	open = false;
}
</script>

<Modal
    {open}
    onOpenChange={e => open = e.open}
    triggerBase="btn-icon preset-tonal"
    contentBase="card bg-surface-100-900 p-4 space-y-4 shadow-xl"
    backdropClasses="backdrop-blur-sm"
    onclick={e => e.stopPropagation()}
>
    {#snippet trigger()}
        {@render props.trigger()}
    {/snippet}
    {#snippet content()}
        <header class="flex items-center justify-between">
            <span class="h3">{props.title}</span>
            <IconButton onclick={() => open = false}>
                <X />
            </IconButton>
        </header>

        <main class="
            max-h-[calc(100vh-100px)]
            overflow-auto
            grid grid-cols gap-4
        ">
            {@render props.content(open, close)}
        </main>
    {/snippet}
</Modal>

