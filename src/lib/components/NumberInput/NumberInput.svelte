<script lang="ts">
let {
	value = $bindable(),
	...props
}: {
	placeholder?: string;
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
        placeholder={props.placeholder}
        bind:value={value}
        name={props.name}
        onchange={e => props.onchange?.(e.target.value)}
        class="input"
    />
</label>
