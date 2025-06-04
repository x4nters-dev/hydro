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
	allowEmpty?: boolean;
	onchange?: (value: string | number) => void;
	required?: boolean;
} = $props();
</script>

<label for={props.name} class="label">
   <span class="label-text">{props.label}</span>
    <select
        bind:value={value}
        class="select"
        name={props.name}
        required={props.required}
        onchange={e => props.onchange?.(e.currentTarget.value)}
    >
        {#if props.allowEmpty}
            <option value={null}>-</option>
        {/if}
        {@render props.children()}
    </select>
</label>
