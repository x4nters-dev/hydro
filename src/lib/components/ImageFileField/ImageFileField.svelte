<script lang="ts">
import { t } from "$lib/i18n";
import { FileUpload } from "@skeletonlabs/skeleton-svelte";

const props: {
	name: string;
} = $props();
</script>

<label for="image" class="label">
    <span class="label-text">{$t('photo')}</span>
    <FileUpload
        name={props.name}
        accept="image/*"
        maxFiles={1}
        classes="w-full"
        label={$t('imageFieldDescription')}
    />
</label>
