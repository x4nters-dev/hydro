<script lang="ts">
import { goto } from "$app/navigation";
import { page } from "$app/state";
import PageHeader from "$lib/components/PageHeader/PageHeader.svelte";
import PageLayout from "$lib/components/PageLayout/PageLayout.svelte";
import AddRoomModal from "$lib/features/AddRoomModal/AddRoomModal.svelte";
import RoomsTiles from "$lib/features/RoomsTiles/RoomsTiles.svelte";
import { t } from "$lib/i18n";
import type { RoomInterface } from "$lib/interfaces/room.interface";

let rooms = $derived(page.data.rooms);

function onClick(room: RoomInterface): void {
	goto(`/rooms/${room.id}`);
}
</script>

<PageLayout>
    {#snippet header()}
        <PageHeader title={$t('rooms')}>
            {#snippet actions()}
                <AddRoomModal />
            {/snippet}
        </PageHeader>
    {/snippet}
    <RoomsTiles {rooms} {onClick} />
</PageLayout>



