<template>
  <section class="contract-panel">
    <div class="panel-header">
      <div>
        <h2>合同管理</h2>
        <p>房东发起合同，租客确认后生效；退租自动生成结算单。</p>
      </div>
      <el-button type="primary" @click="emit('create')">发起合同</el-button>
    </div>

    <el-table :data="contracts" v-loading="loading" empty-text="暂无合同，点击右上角发起">
      <el-table-column label="合同" width="90">
        <template #default="{ row }">#{{ row.id }}<el-tag size="small" effect="plain" class="version-tag">v{{ row.version }}</el-tag></template>
      </el-table-column>
      <el-table-column label="房源" min-width="140">
        <template #default="{ row }">
          {{ row.community }}
          <el-tag size="small" :type="propertyTagType(row.propertyStatus)">{{ row.propertyStatus }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="tenantName" label="租客" width="90" />
      <el-table-column label="租期" min-width="180">
        <template #default="{ row }">
          {{ row.startDate }} 至 {{ row.endDate }}
          <div v-if="row.actualEndDate" class="actual-end">实退 {{ row.actualEndDate }}</div>
        </template>
      </el-table-column>
      <el-table-column label="租金/押金" width="130">
        <template #default="{ row }">¥{{ row.monthlyRent }}/月<br />押 ¥{{ row.deposit }}</template>
      </el-table-column>
      <el-table-column label="状态" width="90">
        <template #default="{ row }">
          <el-tag :type="contractTagType(row.status)">{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="结算" min-width="120">
        <template #default="{ row }">
          <template v-if="row.settlement">
            <div>未结租金 ¥{{ row.settlement.unsettledRent }}</div>
            <div>应退总额 ¥{{ row.settlement.totalRefund }}</div>
          </template>
          <span v-else class="muted">—</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220" fixed="right">
        <template #default="{ row }">
          <el-button v-if="row.status === '待确认'" size="small" type="success" @click="emit('confirm', row)">租客确认</el-button>
          <el-button v-if="row.status === '待确认'" size="small" @click="emit('cancel', row)">取消</el-button>
          <el-button v-if="row.status === '已生效'" size="small" type="danger" @click="emit('terminate', row)">办理退租</el-button>
          <el-button v-if="row.settlement" size="small" type="primary" plain @click="emit('view-settlement', row)">结算单</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script setup lang="ts">
import type { ContractItem } from '../types/domain';

type TagType = 'primary' | 'success' | 'info' | 'warning' | 'danger';

defineProps<{
  contracts: ContractItem[];
  loading: boolean;
}>();

const emit = defineEmits<{
  create: [];
  confirm: [contract: ContractItem];
  cancel: [contract: ContractItem];
  terminate: [contract: ContractItem];
  'view-settlement': [contract: ContractItem];
}>();

function contractTagType(status: string): TagType {
  const map: Record<string, TagType> = {
    待确认: 'warning',
    已生效: 'success',
    已终止: 'info',
    已取消: 'danger',
  };
  return map[status] ?? 'info';
}

function propertyTagType(status: string): TagType {
  const map: Record<string, TagType> = {
    待出租: 'success',
    已预约: 'warning',
    已签约: 'primary',
  };
  return map[status] ?? 'info';
}
</script>

<style scoped>
.contract-panel {
  margin-top: 32px;
}
.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.panel-header h2 {
  margin: 0;
}
.panel-header p {
  margin: 4px 0 0;
  color: #909399;
  font-size: 13px;
}
.version-tag {
  margin-left: 4px;
}
.actual-end {
  font-size: 12px;
  color: #f56c6c;
}
.muted {
  color: #c0c4cc;
}
</style>
