<script lang="ts">
import type { WateringHistoryInterface } from "$lib/interfaces/wateringHistory.interface";
import { toDateFormat } from "$lib/utils/toDateFormat.util";
import { t } from "$lib/i18n";

const props: {
	wateringHistory: WateringHistoryInterface[] | null | undefined;
} = $props();
</script>

<table class="table text-zinc-500">
    <thead>
        <tr>
            <td>#</td>
            <td>{$t('plant')}</td>
            <td>{$t('date')}</td>
            <td>{$t('wateringAmount')}</td>
        </tr>
    </thead>
    <tbody>
        {#if props.wateringHistory}
            {#each props.wateringHistory as row, index (row.id)}
                <tr>
                    <td>{index+1}</td>
                    <td>{row.flower?.name ?? row.flower?.id}</td>
                    <td>{toDateFormat(row.date)}</td>
                    <td>{row.amount}</td>
                </tr>
            {/each}
        {/if}
    </tbody>
</table>