<script lang="ts">
import { page } from "$app/state";
import PageHeader from "$lib/components/PageHeader/PageHeader.svelte";
import PageLayout from "$lib/components/PageLayout/PageLayout.svelte";
import WateringHistoryTable from "$lib/features/WateringHistoryTable/WateringHistoryTable.svelte";
import ClearHistoryModal from "$lib/features/ClearHistoryModal/ClearHistoryModal.svelte";
import { t } from "$lib/i18n";

let wateringHistory = $derived(page.data.wateringHistory);
</script>

<PageLayout>
    {#snippet header()}
        <PageHeader title={$t('history')}>
            {#snippet actions()}
                <ClearHistoryModal />
            {/snippet}
        </PageHeader>
    {/snippet}
    <WateringHistoryTable {wateringHistory} />
</PageLayout>

