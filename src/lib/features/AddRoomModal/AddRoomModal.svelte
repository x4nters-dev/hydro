<script lang="ts">
import { Plus } from "lucide-svelte";
import CustomModal from "$lib/components/CustomModal/CustomModal.svelte";
import Form from "$lib/components/Form/Form.svelte";
import TextInput from "$lib/components/TextInput/TextInput.svelte";
import CancelSubmit from "$lib/components/CancelSubmit/CancelSubmit.svelte";
import ImageFileField from "$lib/components/ImageFileField/ImageFileField.svelte";
import { t } from "$lib/i18n";
</script>

<CustomModal title={$t('addRoom')}>
    {#snippet trigger()}
        <Plus />
    {/snippet}

    {#snippet content(open, close)}
        <Form action="?/addRoom">
            <TextInput name="name" label={$t('name')} required />
            <ImageFileField />
            {#snippet buttons()}
                <CancelSubmit onCancel={close} />
            {/snippet}
        </Form>
    {/snippet}
</CustomModal>
