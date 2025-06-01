<script lang="ts">
import { page } from "$app/state";
import PageHeader from "$lib/components/PageHeader/PageHeader.svelte";
import PageLayout from "$lib/components/PageLayout/PageLayout.svelte";
import RoomDetails from "$lib/features/RoomDetails/RoomDetails.svelte";
import { t } from "$lib/i18n";

let room = $derived(page.data.room);
</script>

<PageLayout disablePadding>
    {#snippet header()}
        <PageHeader title={$t('rooms')} showBackButton />
    {/snippet}
    <RoomDetails {room} />
</PageLayout>
