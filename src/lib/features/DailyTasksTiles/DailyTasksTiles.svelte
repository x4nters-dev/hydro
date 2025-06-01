<script lang="ts">
import TilesGrid from "$lib/components/TilesGrid/TilesGrid.svelte";
import TaskTile from "$lib/features/DailyTasksTiles/components/TaskTile.svelte";
import type { DailyTaskInterface } from "$lib/interfaces/dailyTask.interface";

const props: {
	tasks: DailyTaskInterface[];
	onDone: (task: DailyTaskInterface) => void;
	onClick: (task: DailyTaskInterface) => void;
} = $props();
</script>

<TilesGrid>
    {#each props.tasks as task (task.id)}
        <TaskTile
            {task}
            onDone={() => props.onDone(task)}
            onclick={() => props.onClick(task)}
        />
    {/each}
</TilesGrid>
