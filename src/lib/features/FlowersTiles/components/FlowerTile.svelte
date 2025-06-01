<script lang="ts">
import ImageCover from "$lib/components/ImageCover/ImageCover.svelte";
import InteractiveTile from "$lib/components/InteractiveTile/InteractiveTile.svelte";
import { DEFAULT_FLOWER_IMAGE } from "$lib/consts/defaultFlowerImage.const";
import DeleteFlower from "$lib/features/DeleteFlower/DeleteFlower.svelte";
import EditFlowerModal from "$lib/features/EditFlowerModal/EditFlowerModal.svelte";
import type { FlowerInterface } from "$lib/interfaces/flower.interface";
import type { RoomInterface } from "$lib/interfaces/room.interface";

const props: {
	flower: FlowerInterface;
	rooms: RoomInterface[];
	onclick: (event: Event) => void;
} = $props();
</script>

<InteractiveTile onclick={props.onclick}>
    {#snippet header()}
        <ImageCover
            imageSrc={props.flower.image ? String(props.flower.image) : DEFAULT_FLOWER_IMAGE}
            alt={props.flower.name}
            title={props.flower.name}
        >
            {#snippet actions()}
                <EditFlowerModal flower={props.flower} rooms={props.rooms} />
                <DeleteFlower flower={props.flower} />
            {/snippet}
        </ImageCover>
    {/snippet}
</InteractiveTile>

