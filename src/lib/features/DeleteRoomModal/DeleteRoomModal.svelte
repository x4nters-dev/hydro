<script lang="ts">
import type { RoomInterface } from "$lib/interfaces/room.interface";
import CustomModal from "$lib/components/CustomModal/CustomModal.svelte";
import { Trash } from "lucide-svelte";
import Form from "$lib/components/Form/Form.svelte";
import CancelSubmit from "$lib/components/CancelSubmit/CancelSubmit.svelte";
import { t } from "$lib/i18n";

const props: {
	room: RoomInterface;
} = $props();
</script>

<CustomModal title={$t('deleteRoom')}>
    {#snippet trigger()}
        <Trash />
    {/snippet}

    {#snippet content(open, close)}
        <Form action="?/deleteRoom">
            <input type="hidden" name="roomId" value={props.room.id} />
            <span>{$t('deleteRoomDescription')} {props.room.name}</span>
            {#snippet buttons()}
                <CancelSubmit onCancel={close} />
            {/snippet}
        </Form>
    {/snippet}
</CustomModal>

