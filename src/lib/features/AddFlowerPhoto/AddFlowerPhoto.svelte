<script lang="ts">
import CancelSubmit from "$lib/components/CancelSubmit/CancelSubmit.svelte";
import CustomModal from "$lib/components/CustomModal/CustomModal.svelte";
import Form from "$lib/components/Form/Form.svelte";
import ImageFileField from "$lib/components/ImageFileField/ImageFileField.svelte";
import { t } from "$lib/i18n";
import { Camera } from "lucide-svelte";

const props: {
	flowerId: number;
} = $props();
</script>

<CustomModal title={$t('addPhoto')}>
    {#snippet trigger()}
        <Camera />
    {/snippet}

    {#snippet content(open, close)}
        <Form action="?/addPhoto">
            <input type="hidden" name="flowerId" value={props.flowerId} />

            <ImageFileField name="file" />

            {#snippet buttons()}
                <CancelSubmit onCancel={close} />
            {/snippet}
        </Form>
    {/snippet}
</CustomModal>

