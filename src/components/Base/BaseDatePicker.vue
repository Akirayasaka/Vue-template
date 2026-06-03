<template>
  <div>
    <el-date-picker
      v-model="time"
      :type="useType"
      size="large"
      :value-format="typeFormat"
      :format="typeFormat"
      @change="dateChange"
      :clearable="props.clearable"
      :editable="props.editable"
      :placeholder="props.placeholder ?? '請選擇日期'"
      :disabled-date="checkDisabledDate"
      :disabled="props.disabled"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';

const props = defineProps({
  modelValue: { type: String, required: false },
  /** 能否手動清除 */
  clearable: { type: Boolean, required: false },
  /** 能否輸入文字 */
  editable: { type: Boolean, required: false },
  /** 預設顯示文字訊息 */
  placeholder: { type: String, required: false },
  /** 是否關閉 */
  disabled: { type: Boolean, required: false },

  /** 關閉起始日之前的日期 */
  d_start: { type: String, required: false },
  /** 關閉結束日之後的日期 */
  d_end: { type: String, required: false },
  /** 使用型態(預設為日期) */
  type: { type: String, required: false }
});
const emits = defineEmits(['update:modelValue', 'change']);

let time: any = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits('update:modelValue', val);
  }
});

//#region Functions
const dateChange = (val: string) => {
  val = val === null ? '' : val;
  emits('change', val);
};

const checkDisabledDate = (time: string): boolean => {
  if (props.d_start) {
    return Date.parse(props.d_start) >= Date.parse(time) + 8.64e7;
  }
  if (props.d_end) {
    return Date.parse(props.d_end) <= Date.parse(time);
  }
  return false;
};
//#endregion

const useType = computed(() => {
  return props.type ?? 'date';
});

const typeFormat = computed(() => {
  let format = '';
  switch (useType.value) {
    case 'date':
    case 'dates':
      format = 'YYYY-MM-DD';
      break;
    case 'month':
      format = 'YYYY-MM';
      break;
    case 'year':
    case 'years':
      format = 'YYYY';
      break;
    default:
      break;
  }
  return format;
});

watch(
  () => props.modelValue,
  (val) => {
    time.value = val === null ? '' : val;
  },
  { deep: true }
);
</script>

<style scoped></style>
