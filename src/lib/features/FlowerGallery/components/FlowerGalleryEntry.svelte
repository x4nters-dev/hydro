<script lang="ts">
import DownloadPhotoButton from "$lib/components/DownloadPhotoButton/DownloadPhotoButton.svelte";
import FullscreenImage from "$lib/components/FullscreenImage/FullscreenImage.svelte";
import ImageCover from "$lib/components/ImageCover/ImageCover.svelte";
import InteractiveTile from "$lib/components/InteractiveTile/InteractiveTile.svelte";
import DeleteFlowerPhoto from "$lib/features/DeleteFlowerPhoto/DeleteFlowerPhoto.svelte";
import type { PhotoInterface } from "$lib/interfaces/photo.interface";
import { toDateFormat } from "$lib/utils/toDateFormat.util.js";

const props: {
	photo: PhotoInterface;
} = $props();

let url = $derived(`/photos?photoId=${props.photo.id}`);
</script>

<InteractiveTile>
    {#snippet header()}
        <ImageCover
            imageSrc={props.photo.thumbnail}
            title={toDateFormat(props.photo.date)}
            alt={String(props.photo.id)}
        >
            {#snippet actions()}
                <DownloadPhotoButton {url} />
                <FullscreenImage src={url} alt={String(props.photo.id)} />
                <DeleteFlowerPhoto photo={props.photo} />
            {/snippet}
        </ImageCover>
    {/snippet}
</InteractiveTile>
