<script lang="ts">
import CancelSubmit from "$lib/components/CancelSubmit/CancelSubmit.svelte";
import CustomModal from "$lib/components/CustomModal/CustomModal.svelte";
import Form from "$lib/components/Form/Form.svelte";
import { t } from "$lib/i18n";
import type { PhotoInterface } from "$lib/interfaces/photo.interface";
import { Trash } from "lucide-svelte";

const props: {
	photo: PhotoInterface;
} = $props();
</script>

<CustomModal title={$t('deletePhoto')}>
    {#snippet trigger()}
        <Trash />
    {/snippet}

    {#snippet content(open, close)}
        <Form action="?/deletePhoto">
            <input type="hidden" name="photoId" value={props.photo.id}>
            <input type="hidden" name="flowerId" value={props.photo.flowerId}>

            <span>{$t('deletePlantPhotoDescription')}</span>

            {#snippet buttons()}
                <CancelSubmit onCancel={close} />
            {/snippet}
        </Form>
    {/snippet}
</CustomModal>

