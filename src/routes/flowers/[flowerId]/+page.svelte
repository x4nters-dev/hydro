<script lang="ts">
import { page } from "$app/state";
import PageHeader from "$lib/components/PageHeader/PageHeader.svelte";
import PageLayout from "$lib/components/PageLayout/PageLayout.svelte";
import FlowerDetails from "$lib/features/FlowerDetails/FlowerDetails.svelte";
import { t } from "$lib/i18n";

const { flower, rooms } = page.data;
</script>

<PageLayout disablePadding>
    {#snippet header()}
        <PageHeader title={$t('plants')} showBackButton />
    {/snippet}
    <FlowerDetails {flower} {rooms} />
</PageLayout>

