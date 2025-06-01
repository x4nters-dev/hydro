<script lang="ts">
import { t } from "$lib/i18n";
import { FileUpload } from "@skeletonlabs/skeleton-svelte";
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
