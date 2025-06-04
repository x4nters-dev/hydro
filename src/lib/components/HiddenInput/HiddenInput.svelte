<script lang="ts">
const props: {
	name: string;
	value: unknown;
} = $props();
</script>

<input type="hidden" name={props.name} value={props.value}>

