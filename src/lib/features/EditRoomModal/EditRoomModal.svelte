<script lang="ts">
import type { RoomInterface } from "$lib/interfaces/room.interface";
import CustomModal from "$lib/components/CustomModal/CustomModal.svelte";
import { Edit } from "lucide-svelte";
import Form from "$lib/components/Form/Form.svelte";
import TextInput from "$lib/components/TextInput/TextInput.svelte";
import ImageFileField from "$lib/components/ImageFileField/ImageFileField.svelte";
import CancelSubmit from "$lib/components/CancelSubmit/CancelSubmit.svelte";
import { t } from "$lib/i18n";

const props: {
	room: RoomInterface;
} = $props();
</script>

<CustomModal title={$t('editRoom')}>
    {#snippet trigger()}
        <Edit />
    {/snippet}

    {#snippet content(open, close)}
        <Form action="?/editRoom">
            <input type="hidden" name="roomId" value={props.room.id} />

            <TextInput
                name="name"
                label={$t('name')}
                value={props.room.name ?? ''}
            />

            <ImageFileField />

            {#snippet buttons()}
                <CancelSubmit onCancel={close} />
            {/snippet}
        </Form>
    {/snippet}
</CustomModal>