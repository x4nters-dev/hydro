<script lang="ts">
import { page } from "$app/state";
import PageHeader from "$lib/components/PageHeader/PageHeader.svelte";
import PageLayout from "$lib/components/PageLayout/PageLayout.svelte";
import AddFlowerModal from "$lib/features/AddFlowerModal/AddFlowerModal.svelte";
import FlowersTiles from "$lib/features/FlowersTiles/FlowersTiles.svelte";
import { t } from "$lib/i18n";

const flowers = $derived(page.data.flowers);
const rooms = $derived(page.data.rooms);
</script>

<PageLayout>
    {#snippet header()}
        <PageHeader title={$t('plants')}>
            {#snippet actions()}
                <AddFlowerModal {rooms} />
            {/snippet}
        </PageHeader>
    {/snippet}
    <FlowersTiles {flowers} {rooms} />
</PageLayout>