<script lang="ts">
import { t } from "$lib/i18n";
import type { WateringHistoryInterface } from "$lib/interfaces/wateringHistory.interface";
import { toDateFormat } from "$lib/utils/toDateFormat.util";

const props: {
	wateringHistory: WateringHistoryInterface[];
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
                    <td>{row.flowerName ?? row.flowerId}</td>
                    <td>{toDateFormat(row.date)}</td>
                    <td>{row.amount}</td>
                </tr>
            {/each}
        {/if}
    </tbody>
</table>