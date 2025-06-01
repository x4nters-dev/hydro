<script lang="ts">
import "../app.css";
import MainLayout from "$lib/components/MainLayout/MainLayout.svelte";
import NavigationPanel from "$lib/features/NavigationPanel/NavigationPanel.svelte";
import type { Snippet } from "svelte";

const props: {
	children: Snippet;
} = $props();
</script>

<MainLayout>
    {#snippet navigation()}
        <NavigationPanel />
    {/snippet}
    {@render props.children()}
</MainLayout>