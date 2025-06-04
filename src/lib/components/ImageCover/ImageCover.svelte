<script lang="ts">
import type { Snippet } from "svelte";

const props: {
	imageSrc: string | null;
	alt: string;
	title: string;
	actions?: Snippet;
	compact?: boolean;
	greyscale?: boolean;
} = $props();
</script>

<div
    class={`relative w-full overflow-hidden aspect-[16/9] ${props.compact ? 'md:h-1/2' : ''}`}
    class:grayscale={props.greyscale}
>
    {#if props.imageSrc}
        <img
            src={props.imageSrc}
            alt={props.alt}
            class="absolute inset-0 w-full h-full object-cover mask-alpha mask-b-from-0"
        />
    {/if}

    <div class="absolute bottom-0 left-0 right-0 p-4 flex justify-between gap-4 items-center">
        {#if props.title}
            <span class="h4">{props.title}</span>
        {/if}

        {#if props.actions}
            <div
                role="button"
                tabindex="0"
                class="flex gap-4"
                onclick={e => e.stopPropagation()}
                onkeydown={e => e.key === 'Enter' && e.stopPropagation()}
            >
                {@render props.actions()}
            </div>
        {/if}
    </div>
</div>