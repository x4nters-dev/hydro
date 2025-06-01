<script lang="ts">
import ImageCover from "$lib/components/ImageCover/ImageCover.svelte";
import InteractiveTile from "$lib/components/InteractiveTile/InteractiveTile.svelte";
import { DEFAULT_ROOM_IMAGE } from "$lib/consts/defaultRoomImage.const";
import type { RoomInterface } from "$lib/interfaces/room.interface";
import DeleteRoomModal from "$lib/features/DeleteRoomModal/DeleteRoomModal.svelte";
import EditRoomModal from "$lib/features/EditRoomModal/EditRoomModal.svelte";

const props: {
	room: RoomInterface;
	onclick: (event: Event) => void;
} = $props();
</script>

<InteractiveTile onclick={props.onclick}>
    {#snippet header()}
        <ImageCover
            imageSrc={props.room.image ? String(props.room.image) : DEFAULT_ROOM_IMAGE}
            alt={props.room.name}
            title={props.room.name}
        >
            {#snippet actions()}
                <EditRoomModal room={props.room} />
                <DeleteRoomModal room={props.room} />
            {/snippet}
        </ImageCover>
    {/snippet}
</InteractiveTile>