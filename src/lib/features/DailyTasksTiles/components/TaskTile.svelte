<script lang="ts">
import Detail from "$lib/components/Detail/Detail.svelte";
import DetailsGrid from "$lib/components/DetailsGrid/DetailsGrid.svelte";
import IconButton from "$lib/components/IconButton/IconButton.svelte";
import ImageCover from "$lib/components/ImageCover/ImageCover.svelte";
import InteractiveTile from "$lib/components/InteractiveTile/InteractiveTile.svelte";
import { DEFAULT_FLOWER_IMAGE } from "$lib/consts/defaultFlowerImage.const";
import { t } from "$lib/i18n";
import type { DailyTaskInterface } from "$lib/interfaces/dailyTask.interface";
import { toDateFormat } from "$lib/utils/toDateFormat.util";
import {
	CalendarCheck,
	CalendarSync,
	Check,
	Fingerprint,
	GlassWater,
	LandPlot,
	ThermometerSnowflake,
	ThermometerSun,
} from "lucide-svelte";

const props: {
	task: DailyTaskInterface;
	onclick: (event: Event) => void;
	onDone: () => void;
} = $props();

function onDone(event: Event): void {
	event.stopPropagation();
	props.onDone();
}
</script>

<InteractiveTile onclick={props.onclick}>
    {#snippet header()}
        <ImageCover
            imageSrc={props.task.flower.image ?? DEFAULT_FLOWER_IMAGE}
            alt={props.task.flower.name || String(props.task.flower.id)}
            title={props.task.flower.name || String(props.task.flower.id)}
            greyscale={props.task.done}
        >
            {#snippet actions()}
                {#if !props.task.done}
                    <IconButton disabled={props.task.done} onclick={onDone}>
                        <Check />
                    </IconButton>
                {/if}
            {/snippet}
        </ImageCover>
    {/snippet}

    {#if !props.task.done}
        <DetailsGrid>
            <Detail value={props.task.flower.id}>
                {#snippet icon()}
                    <Fingerprint />
                {/snippet}
            </Detail>

            <Detail value={toDateFormat(props.task.watering.lastWateringData)}>
                {#snippet icon()}
                    <CalendarCheck />
                {/snippet}
            </Detail>

            <Detail value={props.task.watering.amount}>
                {#snippet icon()}
                    <GlassWater />
                {/snippet}
            </Detail>

            <Detail value={props.task.watering.frequency}>
                {#snippet icon()}
                    <CalendarSync />
                {/snippet}
            </Detail>

            <Detail value={$t(String(props.task.conditions.soilType))}>
                {#snippet icon()}
                    <LandPlot />
                {/snippet}
            </Detail>

            <Detail value={props.task.conditions.minTemperature}>
                {#snippet icon()}
                    <ThermometerSnowflake />
                {/snippet}
            </Detail>

            <Detail value={props.task.conditions.maxTemperature}>
                {#snippet icon()}
                    <ThermometerSun />
                {/snippet}
            </Detail>
        </DetailsGrid>
    {/if}
</InteractiveTile>
