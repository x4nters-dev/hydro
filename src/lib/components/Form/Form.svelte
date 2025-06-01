<script lang="ts">
import type { Snippet } from "svelte";

const props: {
	action: string;
	children: Snippet;
	buttons: Snippet;
} = $props();
</script>

<form
    action={props.action}
    method="POST"
    enctype="multipart/form-data"
    class="grid gap-4"
>
    <div class="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
        {@render props.children()}
    </div>
    {@render props.buttons()}
</form>

