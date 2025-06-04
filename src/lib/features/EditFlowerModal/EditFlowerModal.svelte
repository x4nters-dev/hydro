<script lang="ts">
import CancelSubmit from "$lib/components/CancelSubmit/CancelSubmit.svelte";
import CustomModal from "$lib/components/CustomModal/CustomModal.svelte";
import Form from "$lib/components/Form/Form.svelte";
import ImageFileField from "$lib/components/ImageFileField/ImageFileField.svelte";
import NumberInput from "$lib/components/NumberInput/NumberInput.svelte";
import Select from "$lib/components/Select/Select.svelte";
import TextInput from "$lib/components/TextInput/TextInput.svelte";
import { SoilTypeEnum } from "$lib/enums/soilType.enum";
import { t } from "$lib/i18n";
import type { FlowerInterface } from "$lib/interfaces/flower.interface";
import type { RoomInterface } from "$lib/interfaces/room.interface";
import { Edit } from "lucide-svelte";

const props: {
	flower: FlowerInterface;
	rooms: RoomInterface[];
} = $props();
</script>

<CustomModal title={$t('editPlant')}>
    {#snippet trigger()}
        <Edit />
    {/snippet}

    {#snippet  content(open, close)}
        <Form action="?/editFlower">
            <input type="hidden" name="flowerId" value={props.flower.id} />

            <TextInput
                name="name"
                label={$t('name')}
                value={props.flower.name}
            />

            <Select label={$t('room')} name="roomId" value={props.flower.roomId} allowEmpty>
                {#each props.rooms as room}
                    <option value={room.id}>{room.name}</option>
                {/each}
            </Select>

            <NumberInput
                label={$t('wateringFrequency')}
                name="watering[frequency]"
                value={props.flower.watering.frequency}
            />

            <NumberInput
                label={$t('wateringAmount')}
                name="watering[amount]"
                value={props.flower.watering.amount}
            />

            <NumberInput
                label={$t('minTemperature')}
                name="conditions[minTemperature]"
                value={props.flower.conditions.minTemperature}
            />

            <NumberInput
                label={$t('maxTemperature')}
                name="conditions[maxTemperature]"
                value={props.flower.conditions.maxTemperature}
            />

            <Select
                label={$t('soilType')}
                name="conditions[soilType]"
                value={props.flower.conditions.soilType}
            >
                {#each Object.values(SoilTypeEnum) as soilType}
                    <option value={soilType}>{$t(soilType)}</option>
                {/each}
            </Select>

            {#snippet buttons()}
                <CancelSubmit onCancel={close} />
            {/snippet}
        </Form>
    {/snippet}
</CustomModal>