<template>
  <el-dialog
    :model-value="visible"
    title="退租结算单"
    width="520px"
    @update:model-value="emit('update:visible', $event)"
  >
    <template v-if="contract && settlement">
      <el-descriptions :column="2" border size="small">
        <el-descriptions-item label="合同编号">#{{ contract.id }}（v{{ contract.version }}）</el-descriptions-item>
        <el-descriptions-item label="房源">{{ contract.community }}</el-descriptions-item>
        <el-descriptions-item label="租客">{{ contract.tenantName }}</el-descriptions-item>
        <el-descriptions-item label="月租金">¥{{ contract.monthlyRent }}</el-descriptions-item>
        <el-descriptions-item label="原租期">{{ contract.startDate }} 至 {{ contract.endDate }}（{{ settlement.plannedDays }} 天）</el-descriptions-item>
        <el-descriptions-item label="实际退租日">{{ settlement.actualEndDate }}（实住 {{ settlement.actualDays }} 天）</el-descriptions-item>
      </el-descriptions>

      <el-table :data="rows" size="small" class="amount-table">
        <el-table-column prop="label" label="项目" />
        <el-table-column prop="amount" label="金额（元）" align="right" width="140" />
      </el-table>
      <p class="note">未结租金优先从押金中抵扣；应退总额 = 应退押金 + 应退租金。</p>
    </template>
    <el-empty v-else description="该合同尚未生成结算单" />
    <template #footer>
      <el-button type="primary" @click="emit('update:visible', false)">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ContractItem, SettlementItem } from '../types/domain';

const props = defineProps<{
  visible: boolean;
  contract: ContractItem | null;
}>();

const emit = defineEmits<{
  'update:visible': [value: boolean];
}>();

const settlement = computed<SettlementItem | null>(() => props.contract?.settlement ?? null);

const rows = computed(() => {
  if (!settlement.value) return [];
  const s = settlement.value;
  return [
    { label: '已付租金（按原租期预付）', amount: s.rentPaid },
    { label: '应付租金（按实际租期折算）', amount: s.rentDue },
    { label: '未结租金（欠付）', amount: s.unsettledRent },
    { label: '应退租金（多付部分）', amount: s.rentRefund },
    { label: '押金', amount: s.deposit },
    { label: '应退押金', amount: s.depositRefund },
    { label: '应退总额', amount: s.totalRefund },
  ];
});
</script>

<style scoped>
.amount-table {
  margin-top: 12px;
}
.note {
  margin: 8px 0 0;
  font-size: 12px;
  color: #909399;
}
</style>
