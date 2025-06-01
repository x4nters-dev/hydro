<script lang="ts">
import { goto } from "$app/navigation";
import { page } from "$app/state";
import PageHeader from "$lib/components/PageHeader/PageHeader.svelte";
import PageLayout from "$lib/components/PageLayout/PageLayout.svelte";
import Subtitle from "$lib/components/Subtitle/Subtitle.svelte";
import DailyTasksTiles from "$lib/features/DailyTasksTiles/DailyTasksTiles.svelte";
import { t } from "$lib/i18n";
import type { DailyTaskInterface } from "$lib/interfaces/dailyTask.interface";
import { invalidateServerPage } from "$lib/utils/invalidateServerPage.util";
import { putTaskDone } from "./utils/putTaskDone.request";

const todoTasks = $derived(page.data.tasks.filter((t) => !t.done));
const doneTasks = $derived(page.data.tasks.filter((t) => t.done));

function onClick(task: DailyTaskInterface): void {
	goto(`/flowers/${task.flower.id}`);
}

async function onDone(task: DailyTaskInterface): Promise<void> {
	await putTaskDone({ task });
	await invalidateServerPage();
}
</script>

<PageLayout>
    {#snippet header()}
        <PageHeader title={$t('today')} />
    {/snippet}
    <div class="flex flex-col gap-4">
        <Subtitle text={$t('todos')} />
        <DailyTasksTiles tasks={todoTasks} {onDone} {onClick} />
        <Subtitle text={$t('done')} />
        <DailyTasksTiles tasks={doneTasks} {onDone} {onClick} />
    </div>
</PageLayout>
