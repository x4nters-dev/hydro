<script lang="ts">
import { FileUpload } from "@skeletonlabs/skeleton-svelte";
import { t } from "$lib/i18n";
</script>

<label for="image" class="label">
    <span class="label-text">{$t('photo')}</span>
    <FileUpload
        name="image"
        accept="image/*"
        maxFiles={1}
        classes="w-full"
        label={$t('imageFieldDescription')}
    />
</label>
