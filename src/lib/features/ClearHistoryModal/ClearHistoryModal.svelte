<script lang="ts">
import CancelSubmit from "$lib/components/CancelSubmit/CancelSubmit.svelte";
import CustomModal from "$lib/components/CustomModal/CustomModal.svelte";
import Form from "$lib/components/Form/Form.svelte";
import { t } from "$lib/i18n";
import { Eraser } from "lucide-svelte";
</script>

<CustomModal title={$t('clearHistory')}>
    {#snippet trigger()}
        <Eraser />
    {/snippet}

    {#snippet content(open, close)}
        <Form action="?/clearHistory">
            <span>{$t('clearHistoryDescription')}</span>
            {#snippet buttons()}
                <CancelSubmit onCancel={close} />
            {/snippet}
        </Form>
    {/snippet}
</CustomModal>