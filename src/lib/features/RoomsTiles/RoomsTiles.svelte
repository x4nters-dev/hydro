<script lang="ts">
import TilesGrid from "$lib/components/TilesGrid/TilesGrid.svelte";
import RoomTile from "$lib/features/RoomsTiles/components/RoomTile.svelte";
import type { RoomInterface } from "$lib/interfaces/room.interface";

const props: {
	rooms: RoomInterface[];
	onClick: (room: RoomInterface) => void;
} = $props();
</script>

<TilesGrid>
    {#each props.rooms as room (room.id)}
        <RoomTile {room} onclick={() => props.onClick(room)}/>
    {/each}
</TilesGrid>