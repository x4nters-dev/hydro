<script lang="ts">
const props: {
	type?: "button" | "submit" | "reset";
	label: string;
	onclick?: (event: Event) => void;
	error?: boolean;
} = $props();
</script>

<button
    type={props.type ?? 'button'}
    onclick={props.onclick}
    class="preset-tonal px-4 py-2 rounded-md"
    class:preset-tonal-error={props.error}
>
    <span class="text-md">
        {props.label}
    </span>
</button>