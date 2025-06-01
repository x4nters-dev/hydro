<script lang="ts">
import Detail from "$lib/components/Detail/Detail.svelte";
import DetailsGrid from "$lib/components/DetailsGrid/DetailsGrid.svelte";
import ImageCover from "$lib/components/ImageCover/ImageCover.svelte";
import Subtitle from "$lib/components/Subtitle/Subtitle.svelte";
import { DEFAULT_FLOWER_IMAGE } from "$lib/consts/defaultFlowerImage.const";
import WateringHistoryTable from "$lib/features/WateringHistoryTable/WateringHistoryTable.svelte";
import type { FlowerInterface } from "$lib/interfaces/flower.interface";
import { toDateFormat } from "$lib/utils/toDateFormat.util";
import {
	CalendarCheck,
	CalendarSync,
	Fingerprint,
	GlassWater,
	LandPlot,
	SquareSquare,
	ThermometerSnowflake,
	ThermometerSun,
} from "lucide-svelte";
import DeleteFlower from "$lib/features/DeleteFlower/DeleteFlower.svelte";
import EditFlowerModal from "$lib/features/EditFlowerModal/EditFlowerModal.svelte";
import type { RoomInterface } from "$lib/interfaces/room.interface";
import { t } from "$lib/i18n";
import ClearHistoryForFlowerModal from "$lib/features/ClearHistoryForFlowerModal/ClearHistoryForFlowerModal.svelte";

const props: {
	flower: FlowerInterface;
	rooms: RoomInterface[];
} = $props();
</script>

<ImageCover
    imageSrc={props.flower.image ?? DEFAULT_FLOWER_IMAGE}
    title={props.flower.name ?? props.flower.id}
    alt={String(props.flower.name ?? props.flower.id)}
    compact
>
    {#snippet actions()}
        <ClearHistoryForFlowerModal flower={props.flower} />
        <EditFlowerModal flower={props.flower} rooms={props.rooms} />
        <DeleteFlower flower={props.flower} />
    {/snippet}
</ImageCover>

<div class="p-4">
    <DetailsGrid>
        <Detail value={props.flower.id}>
            {#snippet icon()}
                <Fingerprint />
            {/snippet}
        </Detail>

        <Detail value={toDateFormat(props.flower.wateringHistory?.[0]?.date)}>
            {#snippet icon()}
                <CalendarCheck />
            {/snippet}
        </Detail>

        <Detail value={props.flower.watering?.amount}>
            {#snippet icon()}
                <GlassWater />
            {/snippet}
        </Detail>

        <Detail value={props.flower.watering?.frequency}>
            {#snippet icon()}
                <CalendarSync />
            {/snippet}
        </Detail>

        <Detail value={$t(props.flower.conditions?.soilType)}>
            {#snippet icon()}
                <LandPlot />
            {/snippet}
        </Detail>

        <Detail value={props.flower.conditions?.minTemperature}>
            {#snippet icon()}
                <ThermometerSnowflake />
            {/snippet}
        </Detail>

        <Detail value={props.flower.conditions?.maxTemperature}>
            {#snippet icon()}
                <ThermometerSun />
            {/snippet}
        </Detail>

        <Detail value={props.flower.room?.name}>
            {#snippet icon()}
            	<SquareSquare />
            {/snippet}
        </Detail>
    </DetailsGrid>
</div>

<div class="p-4 flex flex-col gap-4">
    <Subtitle text={$t('history')} />
    <WateringHistoryTable wateringHistory={props.flower.wateringHistory} />
</div>
