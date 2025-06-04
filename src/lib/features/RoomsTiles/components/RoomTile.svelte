<script lang="ts">
import { goto } from "$app/navigation";
import Detail from "$lib/components/Detail/Detail.svelte";
import DetailsGrid from "$lib/components/DetailsGrid/DetailsGrid.svelte";
import ImageCover from "$lib/components/ImageCover/ImageCover.svelte";
import InteractiveTile from "$lib/components/InteractiveTile/InteractiveTile.svelte";
import DeleteRoomModal from "$lib/features/DeleteRoomModal/DeleteRoomModal.svelte";
import EditRoomModal from "$lib/features/EditRoomModal/EditRoomModal.svelte";
import type { RoomInterface } from "$lib/interfaces/room.interface";
import { Flower } from "lucide-svelte";

const props: {
	room: RoomInterface;
} = $props();

function onclick(event: Event): void {
	event.stopPropagation();
	goto(`/rooms/${props.room.id}`);
}
</script>

<InteractiveTile {onclick}>
    {#snippet header()}
        <ImageCover
            imageSrc={props.room.image}
            alt={props.room.name ?? String(props.room.id)}
            title={props.room.name ?? String(props.room.id)}
        >
            {#snippet actions()}
                <EditRoomModal room={props.room} />
                <DeleteRoomModal room={props.room} />
            {/snippet}
        </ImageCover>
    {/snippet}

    <DetailsGrid>
        <Detail value={props.room.flowers.length}>
            {#snippet icon()}
                <Flower />
            {/snippet}
        </Detail>
    </DetailsGrid>
</InteractiveTile>