<script lang="ts">
import type { Snippet } from "svelte";

const props: {
	children: Snippet;
} = $props();
</script>

<div class="grid grid-cols-2 gap-4">
    {@render props.children()}
</div>

