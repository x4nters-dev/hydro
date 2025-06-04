<script lang="ts">
let {
	value = $bindable(),
	...props
}: {
	name: string;
	label?: string;
	value?: string | null;
	required?: boolean;
	onChange?: (value: string) => void;
} = $props();
</script>

<label for={props.name} class="label">
    <span class="label-text">{props.label ?? props.name}</span>
    <input 
        type="text" 
        class="input" 
        bind:value={value}
        name={props.name}
        required={props.required}
        onchange={e => props.onChange?.(e.currentTarget.value)}
    />
</label>