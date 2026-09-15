<template>
  <el-dialog
    :model-value="visible"
    title="办理退租"
    width="440px"
    @update:model-value="emit('update:visible', $event)"
  >
    <template v-if="contract">
      <p class="summary">
        {{ contract.community }} · 租客 {{ contract.tenantName }} · 租期 {{ contract.startDate }} 至 {{ contract.endDate }}
      </p>
      <el-form label-width="90px">
        <el-form-item label="实际退租日">
          <el-date-picker
            v-model="actualEndDate"
            type="date"
            placeholder="选择实际退租日期"
            value-format="YYYY-MM-DD"
            :disabled-date="(day: Date) => day.getTime() > Date.now()"
            class="full"
          />
        </el-form-item>
      </el-form>
      <p class="hint">提交后按实际租期重算未结租金与应退押金，并生成结算单。</p>
    </template>
    <template #footer>
      <el-button @click="emit('update:visible', false)">取消</el-button>
      <el-button type="danger" :loading="submitting" @click="submit">确认退租并结算</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { terminateContract, ApiError } from '../api/client';
import type { ContractItem } from '../types/domain';

const props = defineProps<{
  visible: boolean;
  contract: ContractItem | null;
}>();

const emit = defineEmits<{
  'update:visible': [value: boolean];
  terminated: [contract: ContractItem];
}>();

const actualEndDate = ref('');
const submitting = ref(false);

watch(
  () => props.visible,
  (open) => {
    if (open) actualEndDate.value = '';
  },
);

async function submit() {
  if (!props.contract) return;
  if (!actualEndDate.value) {
    ElMessage.warning('请选择实际退租日');
    return;
  }
  submitting.value = true;
  try {
    const contract = await terminateContract(props.contract.id, actualEndDate.value);
    ElMessage.success(`合同 #${contract.id} 已终止，结算单已生成`);
    emit('terminated', contract);
    emit('update:visible', false);
  } catch (err) {
    ElMessage.error(err instanceof ApiError ? err.message : '退租办理失败');
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped>
.summary {
  margin: 0 0 12px;
  color: #606266;
}
.hint {
  margin: 4px 0 0;
  font-size: 12px;
  color: #909399;
}
.full {
  width: 100%;
}
</style>
