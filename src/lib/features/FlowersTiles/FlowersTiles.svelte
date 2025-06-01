<script lang="ts">
import TilesGrid from "$lib/components/TilesGrid/TilesGrid.svelte";
import FlowerTile from "$lib/features/FlowersTiles/components/FlowerTile.svelte";
import type { FlowerInterface } from "$lib/interfaces/flower.interface";
import type { RoomInterface } from "$lib/interfaces/room.interface";

const props: {
	flowers: FlowerInterface[];
	rooms: RoomInterface[];
	onClick: (flower: FlowerInterface) => void;
} = $props();

const flowers = $derived(props.flowers);
const rooms = $derived(props.rooms);
</script>

<TilesGrid>
    {#each flowers as flower (flower.id)}
        <FlowerTile
            {flower}
            {rooms}
            onclick={() => props.onClick(flower)}
        />
    {/each}
</TilesGrid>