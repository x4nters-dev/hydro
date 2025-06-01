<script lang="ts">
import type { Snippet } from "svelte";

const props: {
	disabled?: boolean;
	children: Snippet;
	onclick?: (event: Event) => void;
} = $props();
</script>

<button
    class="btn-icon preset-tonal"
    disabled={props.disabled}
    onclick={props.onclick}
>
    {@render props.children()}
</button>