<script lang="ts">
import type { Snippet } from "svelte";

const props: {
	icon: Snippet;
	value: string | number | null | undefined;
} = $props();
</script>

<div class="flex gap-4 items-center text-zinc-500">
    <div>
        {@render props.icon()}
    </div>
    <span>{props.value}</span>
</div>
