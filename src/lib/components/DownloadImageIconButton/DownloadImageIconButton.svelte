<script lang="ts">
import IconButton from "$lib/components/IconButton/IconButton.svelte";
import { Download } from "lucide-svelte";

const props: {
	/**
	 * Image file encoded with base64 (as data url)
	 * Disabled if null
	 * [required]
	 */
	file: string | null;

	/**
	 * Downloaded file name
	 * Disabled if null
	 * [required]
	 */
	name: string | null;
} = $props();

function onclick(): void {
	if (!props.file || !props.name) throw Error("No file or filename");

	const link = document.createElement("a");
	link.href = props.file;
	link.download = props.name;
	link.click();
}
</script>

<IconButton {onclick} disabled={!props.file}>
    <Download />
</IconButton>
