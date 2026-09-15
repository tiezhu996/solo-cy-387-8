<template>
  <el-dialog
    :model-value="visible"
    title="发起合同（房东）"
    width="520px"
    @update:model-value="emit('update:visible', $event)"
    @open="resetForm"
  >
    <el-form label-width="90px">
      <el-form-item label="房源">
        <el-select v-model="form.propertyId" placeholder="选择待出租/已预约房源" class="full" @change="applyPropertyDefaults">
          <el-option
            v-for="item in eligibleProperties"
            :key="item.id"
            :value="item.id"
            :label="`${item.community} · ${item.layout} · ¥${item.rent}/月（${item.status}）`"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="租客姓名">
        <el-input v-model="form.tenantName" placeholder="租客姓名" />
      </el-form-item>
      <el-form-item label="租客电话">
        <el-input v-model="form.tenantPhone" placeholder="联系电话" />
      </el-form-item>
      <el-form-item label="租期">
        <el-date-picker
          v-model="leaseRange"
          type="daterange"
          range-separator="至"
          start-placeholder="起租日期"
          end-placeholder="到期日期"
          value-format="YYYY-MM-DD"
          class="full"
        />
      </el-form-item>
      <el-form-item label="月租金">
        <el-input-number v-model="form.monthlyRent" :min="1" :step="100" class="full" />
      </el-form-item>
      <el-form-item label="押金">
        <el-input-number v-model="form.deposit" :min="0" :step="100" class="full" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="emit('update:visible', false)">取消</el-button>
      <el-button type="primary" :loading="submitting" @click="submit">提交，待租客确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { createContract, ApiError } from '../api/client';
import type { ContractItem, PropertyItem } from '../types/domain';

const props = defineProps<{
  visible: boolean;
  properties: PropertyItem[];
  presetPropertyId: number | null;
}>();

const emit = defineEmits<{
  'update:visible': [value: boolean];
  created: [contract: ContractItem];
}>();

const submitting = ref(false);
const leaseRange = ref<[string, string] | null>(null);
const form = reactive({
  propertyId: null as number | null,
  tenantName: '',
  tenantPhone: '',
  monthlyRent: 3000,
  deposit: 3000,
});

const eligibleProperties = computed(() =>
  props.properties.filter((item) => item.status !== '已签约'),
);

function applyPropertyDefaults() {
  const selected = props.properties.find((item) => item.id === form.propertyId);
  if (selected) {
    form.monthlyRent = selected.rent;
    form.deposit = selected.deposit;
  }
}

function resetForm() {
  form.propertyId = props.presetPropertyId ?? eligibleProperties.value[0]?.id ?? null;
  form.tenantName = '';
  form.tenantPhone = '';
  leaseRange.value = null;
  applyPropertyDefaults();
}

async function submit() {
  if (!form.propertyId) {
    ElMessage.warning('请选择房源');
    return;
  }
  if (!form.tenantName.trim()) {
    ElMessage.warning('请填写租客姓名');
    return;
  }
  if (!leaseRange.value) {
    ElMessage.warning('请选择租期');
    return;
  }
  submitting.value = true;
  try {
    const contract = await createContract({
      propertyId: form.propertyId,
      tenantName: form.tenantName.trim(),
      tenantPhone: form.tenantPhone.trim(),
      startDate: leaseRange.value[0],
      endDate: leaseRange.value[1],
      monthlyRent: form.monthlyRent,
      deposit: form.deposit,
    });
    ElMessage.success(`合同 #${contract.id} 已创建，等待租客确认`);
    emit('created', contract);
    emit('update:visible', false);
  } catch (err) {
    ElMessage.error(err instanceof ApiError ? err.message : '合同创建失败');
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped>
.full {
  width: 100%;
}
</style>
