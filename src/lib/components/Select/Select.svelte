<script lang="ts">
import type { Snippet } from "svelte";

let {
	value = $bindable(),
	...props
}: {
	label: string;
	name: string;
	value?: string | number | null;
	children: Snippet;
	onchange?: (value: string | number) => void;
} = $props();
</script>

<label for={props.name} class="label">
   <span class="label-text">{props.label}</span>
    <select
        bind:value={value}
        class="select"
        name={props.name}
        onchange={e => props.onchange?.(e.currentTarget.value)}
    >
        {@render props.children()}
    </select>
</label>
