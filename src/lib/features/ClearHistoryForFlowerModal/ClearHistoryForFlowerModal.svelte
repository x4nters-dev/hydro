<script lang="ts">
import CancelSubmit from "$lib/components/CancelSubmit/CancelSubmit.svelte";
import CustomModal from "$lib/components/CustomModal/CustomModal.svelte";
import Form from "$lib/components/Form/Form.svelte";
import { t } from "$lib/i18n";
import type { FlowerInterface } from "$lib/interfaces/flower.interface";
import { Eraser } from "lucide-svelte";

const props: {
	flower: FlowerInterface;
} = $props();
</script>

<CustomModal title={$t('clearHistory')}>
    {#snippet  trigger()}
        <Eraser />
    {/snippet}

    {#snippet content(open, close)}
        <Form action="?/clearHistory">
            <span>{$t('clearHistoryDescription')}</span>
            <input type="hidden" name="flowerId" value={props.flower.id}>
            {#snippet buttons()}
                <CancelSubmit onCancel={close} />
            {/snippet}
        </Form>
    {/snippet}
</CustomModal>

