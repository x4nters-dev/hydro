<script lang="ts">
import CustomButton from "$lib/components/CustomButton/CustomButton.svelte";
import { t } from "$lib/i18n";

const props: {
	onCancel?: (event: Event) => void;
	onSubmit?: (event: Event) => void;
} = $props();
</script>

<div class="flex gap-4 justify-end">
    <CustomButton label={$t('cancel')} onclick={props.onCancel} />
    <CustomButton label={$t('save')} type="submit" onclick={props.onSubmit} />
</div>