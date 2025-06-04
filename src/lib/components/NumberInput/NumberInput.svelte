<script lang="ts">
let {
	value = $bindable(),
	...props
}: {
	label: string;
	name: string;
	step?: number;
	min?: number;
	max?: number;
	value?: number | null;
	onchange?: (value: number) => void;
} = $props();
</script>

<label for={props.name} class="label">
    <span class="label-text">{props.label}</span>
    <input
        type="number"
        step={props.step}
        min={props.min}
        max={props.max}
        bind:value={value}
        name={props.name}
        onchange={e => props.onchange?.(Number(e.currentTarget.value))}
        class="input"
    />
</label>
