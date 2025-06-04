<script lang="ts">
import CustomModal from "$lib/components/CustomModal/CustomModal.svelte";
import { t } from "$lib/i18n";
import { Fullscreen } from "lucide-svelte";

const props: {
	file: string;
	alt: string;
} = $props();
</script>

<CustomModal title={$t('photo')}>
    {#snippet trigger()}
        <Fullscreen />
    {/snippet}

    {#snippet content(open, close)}
        <img src={props.file} alt={props.alt} />
    {/snippet}
</CustomModal>