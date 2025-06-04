<script lang="ts">
import TilesGrid from "$lib/components/TilesGrid/TilesGrid.svelte";
import FlowerGalleryEntry from "$lib/features/FlowerGallery/components/FlowerGalleryEntry.svelte";
import type { PhotoInterface } from "$lib/interfaces/photo.interface";

const props: {
	photos: PhotoInterface[];
} = $props();
</script>


<TilesGrid>
    {#each props.photos as photo (photo.id)}
        <FlowerGalleryEntry {photo}  />
    {/each}
</TilesGrid>
