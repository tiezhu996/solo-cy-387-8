<template>
  <el-card shadow="hover" class="property-card">
    <template #header>
      <div class="card-header">
        <strong>{{ item.community }}</strong>
        <el-tag :type="statusTagType">{{ item.status }}</el-tag>
      </div>
    </template>
    <p>{{ item.region }} · {{ item.layout }} · {{ item.area }}㎡</p>
    <p class="rent">¥{{ item.rent }}/月，押金 ¥{{ item.deposit }}</p>
    <div class="facility-list">
      <el-tag v-for="facility in item.facilities" :key="facility" size="small">{{ facility }}</el-tag>
    </div>
    <div class="actions">
      <el-button type="primary" class="action-btn">预约看房</el-button>
      <el-button
        type="warning"
        plain
        class="action-btn"
        :disabled="item.status === '已签约'"
        @click="emit('create-contract', item)"
      >
        发起合同
      </el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PropertyItem } from '../types/domain';

const props = defineProps<{ item: PropertyItem }>();

const emit = defineEmits<{
  'create-contract': [item: PropertyItem];
}>();

const statusTagType = computed(() => {
  const map: Record<string, 'primary' | 'success' | 'warning'> = {
    待出租: 'success',
    已预约: 'warning',
    已签约: 'primary',
  };
  return map[props.item.status] ?? 'primary';
});
</script>

<style scoped>
.actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}
.action-btn {
  flex: 1;
  margin-left: 0;
}
</style>
