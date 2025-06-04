<script lang="ts">
import DownloadImageIconButton from "$lib/components/DownloadImageIconButton/DownloadImageIconButton.svelte";
import FullscreenImage from "$lib/components/FullscreenImage/FullscreenImage.svelte";
import ImageCover from "$lib/components/ImageCover/ImageCover.svelte";
import InteractiveTile from "$lib/components/InteractiveTile/InteractiveTile.svelte";
import DeleteFlowerPhoto from "$lib/features/DeleteFlowerPhoto/DeleteFlowerPhoto.svelte";
import type { PhotoInterface } from "$lib/interfaces/photo.interface";
import { toDateFormat } from "$lib/utils/toDateFormat.util.js";

const props: {
	photo: PhotoInterface;
} = $props();
</script>

<InteractiveTile>
    {#snippet header()}
        <ImageCover
            imageSrc={props.photo.file}
            title={toDateFormat(props.photo.date)}
            alt={String(props.photo.id)}
        >
            {#snippet actions()}
                <DownloadImageIconButton file={props.photo.file} name={props.photo.filename} />
                <FullscreenImage file={props.photo.file} alt={String(props.photo.id)} />
                <DeleteFlowerPhoto photo={props.photo} />
            {/snippet}
        </ImageCover>
    {/snippet}
</InteractiveTile>
