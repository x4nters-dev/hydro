<script lang="ts">
import CancelSubmit from "$lib/components/CancelSubmit/CancelSubmit.svelte";
import CustomModal from "$lib/components/CustomModal/CustomModal.svelte";
import Form from "$lib/components/Form/Form.svelte";
import { t } from "$lib/i18n";
import type { FlowerInterface } from "$lib/interfaces/flower.interface";
import { Trash } from "lucide-svelte";

const props: {
	flower: FlowerInterface;
} = $props();

const flower = $derived(props.flower);
</script>

<CustomModal title={$t('deletePlant')}>
    {#snippet trigger()}
        <Trash />
    {/snippet}

    {#snippet content(open, close)}
        <Form action="?/deleteFlower">
            <input type="hidden" name="flowerId" value={flower.id} />

            <span>{$t('deletePlantDescription')} {flower.name}</span>

            {#snippet buttons()}
                <CancelSubmit onCancel={close} />
            {/snippet}
        </Form>
    {/snippet}
</CustomModal>