<script lang="ts">
import ImageCover from "$lib/components/ImageCover/ImageCover.svelte";
import Subtitle from "$lib/components/Subtitle/Subtitle.svelte";
import DeleteRoomModal from "$lib/features/DeleteRoomModal/DeleteRoomModal.svelte";
import EditRoomModal from "$lib/features/EditRoomModal/EditRoomModal.svelte";
import FlowersTiles from "$lib/features/FlowersTiles/FlowersTiles.svelte";
import { t } from "$lib/i18n";
import type { RoomInterface } from "$lib/interfaces/room.interface";

const props: {
	room: RoomInterface;
} = $props();
</script>

<ImageCover
    imageSrc={props.room.image}
    title={props.room.name ?? String(props.room.id)}
    alt={props.room.name ?? String(props.room.id)}
    compact
>
    {#snippet actions()}
        <EditRoomModal room={props.room} />
        <DeleteRoomModal room={props.room} />
    {/snippet}
</ImageCover>

<div class="p-4">
    <Subtitle text={$t('plants')} />
    <FlowersTiles flowers={props.room.flowers} rooms={[]} />
</div>
