<script lang="ts">
import { goto } from "$app/navigation";
import Detail from "$lib/components/Detail/Detail.svelte";
import DetailsGrid from "$lib/components/DetailsGrid/DetailsGrid.svelte";
import ImageCover from "$lib/components/ImageCover/ImageCover.svelte";
import InteractiveTile from "$lib/components/InteractiveTile/InteractiveTile.svelte";
import DeleteFlower from "$lib/features/DeleteFlower/DeleteFlower.svelte";
import EditFlowerModal from "$lib/features/EditFlowerModal/EditFlowerModal.svelte";
import { t } from "$lib/i18n";
import type { FlowerInterface } from "$lib/interfaces/flower.interface";
import type { RoomInterface } from "$lib/interfaces/room.interface";
import { toDateFormat } from "$lib/utils/toDateFormat.util";
import {
	CalendarCheck,
	CalendarSync,
	Fingerprint,
	GlassWater,
	LandPlot,
	ThermometerSnowflake,
	ThermometerSun,
} from "lucide-svelte";

const props: {
	flower: FlowerInterface;
	rooms: RoomInterface[];
} = $props();

function onclick(event: Event): void {
	event.stopPropagation();
	goto(`/flowers/${props.flower.id}`);
}
</script>

<InteractiveTile {onclick}>
    {#snippet header()}
        <ImageCover
            imageSrc={props.flower.image}
            alt={props.flower.name ?? String(props.flower.id)}
            title={props.flower.name ?? String(props.flower.id)}
        >
            {#snippet actions()}
                <EditFlowerModal flower={props.flower} rooms={props.rooms} />
                <DeleteFlower flower={props.flower} />
            {/snippet}
        </ImageCover>
    {/snippet}

    <DetailsGrid>
        <Detail value={props.flower.id}>
            {#snippet icon()}
                <Fingerprint />
            {/snippet}
        </Detail>

        <Detail value={toDateFormat(props.flower.wateringHistory.at(0)?.date ?? null)}>
            {#snippet icon()}
                <CalendarCheck />
            {/snippet}
        </Detail>

        <Detail value={props.flower.watering.amount}>
            {#snippet icon()}
                <GlassWater />
            {/snippet}
        </Detail>

        <Detail value={props.flower.watering.frequency}>
            {#snippet icon()}
                <CalendarSync />
            {/snippet}
        </Detail>

        <Detail value={$t(String(props.flower.conditions.soilType))}>
            {#snippet icon()}
                <LandPlot />
            {/snippet}
        </Detail>

        <Detail value={props.flower.conditions.minTemperature}>
            {#snippet icon()}
                <ThermometerSnowflake />
            {/snippet}
        </Detail>

        <Detail value={props.flower.conditions.maxTemperature}>
            {#snippet icon()}
                <ThermometerSun />
            {/snippet}
        </Detail>
    </DetailsGrid>
</InteractiveTile>

