<script lang="ts">
import TilesGrid from "$lib/components/TilesGrid/TilesGrid.svelte";
import RoomTile from "$lib/features/RoomsTiles/components/RoomTile.svelte";
import type { RoomInterface } from "$lib/interfaces/room.interface";

const props: {
	rooms: RoomInterface[];
} = $props();
</script>

<TilesGrid>
    {#each props.rooms as room (room.id)}
        <RoomTile {room} />
    {/each}
</TilesGrid>