<script lang="ts">
import type { Snippet } from "svelte";

const props: {
	navigation: Snippet;
	children: Snippet;
} = $props();
</script>

<div class="grid grid-cols-[auto_1fr] h-screen max-h-screen">
    <aside>
        {@render props.navigation()}
    </aside>
    <main>
        {@render props.children()}
    </main>
</div>
