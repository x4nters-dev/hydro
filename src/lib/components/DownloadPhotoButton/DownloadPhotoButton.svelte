<script lang="ts">
import IconButton from "$lib/components/IconButton/IconButton.svelte";
import { saveResponseAsFile } from "$lib/utils/saveResponseAsFile.util";
import { Download } from "lucide-svelte";

const props: {
	url: string | null;
} = $props();

async function onclick(): Promise<void> {
	if (!props.url) return;

	const response = await fetch(props.url);
	await saveResponseAsFile(response);
}
</script>

<IconButton {onclick} disabled={!props.url}>
    <Download />
</IconButton>
