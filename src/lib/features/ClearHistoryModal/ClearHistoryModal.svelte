<script lang="ts">
import CustomModal from "$lib/components/CustomModal/CustomModal.svelte";
import { Eraser } from "lucide-svelte";
import Form from "$lib/components/Form/Form.svelte";
import CancelSubmit from "$lib/components/CancelSubmit/CancelSubmit.svelte";
import { t } from "$lib/i18n";
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