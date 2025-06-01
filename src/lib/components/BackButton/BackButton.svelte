<script lang="ts">
import IconButton from "$lib/components/IconButton/IconButton.svelte";
import { ArrowLeft } from "lucide-svelte";

function onclick(): void {
	history.back();
}
</script>

<IconButton {onclick} >
    <ArrowLeft />
</IconButton>
