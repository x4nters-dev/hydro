<script lang="ts">
import type { Snippet } from "svelte";

const props: {
	children: Snippet;
} = $props();
</script>

<div class="
    grid
    xs:grid-cols-1
    md:grid-cols-2
    xl:grid-cols-3
    gap-4
">
    {@render props.children()}
</div>