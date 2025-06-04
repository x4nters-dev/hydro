<script lang="ts">
import IconButton from "$lib/components/IconButton/IconButton.svelte";
import { ArrowLeft } from "lucide-svelte";
</script>

<IconButton onclick={() => history.back()} >
    <ArrowLeft />
</IconButton>
