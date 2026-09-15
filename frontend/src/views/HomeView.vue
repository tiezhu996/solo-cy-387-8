<template>
  <main class="page">
    <section class="toolbar">
      <div>
        <h1>RentFind 租房平台</h1>
        <p>房源搜索、预约看房、合同管理和物业报修集中处理。</p>
      </div>
      <el-segmented v-model="mode" :options="['列表视图', '地图视图']" />
    </section>

    <section class="filters">
      <el-input v-model="region" placeholder="区域" />
      <el-input-number v-model="maxRent" :min="1000" :step="500" />
      <el-select v-model="layout" placeholder="户型">
        <el-option label="全部" value="全部" />
        <el-option label="一室一厅" value="一室一厅" />
        <el-option label="两室一厅" value="两室一厅" />
        <el-option label="三室两厅" value="三室两厅" />
      </el-select>
    </section>

    <section v-if="mode === '地图视图'" class="map-panel">高德地图区域：按经纬度展示房源点位，当前示例加载 {{ filtered.length }} 套房源。</section>
    <section class="grid">
      <PropertyCard
        v-for="item in filtered"
        :key="item.id"
        :item="item"
        @create-contract="openCreateDialog"
      />
    </section>

    <ContractPanel
      :contracts="contracts"
      :loading="contractsLoading"
      @create="openCreateDialog()"
      @confirm="confirm"
      @cancel="cancel"
      @terminate="openTerminateDialog"
      @view-settlement="openSettlementDialog"
    />

    <section class="repair">
      <h2>物业报修</h2>
      <el-select v-model="faultType">
        <el-option label="水电" value="水电" />
        <el-option label="门锁" value="门锁" />
        <el-option label="管道" value="管道" />
        <el-option label="家电" value="家电" />
        <el-option label="其他" value="其他" />
      </el-select>
      <el-input v-model="description" placeholder="描述故障情况" />
      <el-button type="success" @click="submitRepair">提交工单</el-button>
      <span>{{ notice }}</span>
    </section>

    <CreateContractDialog
      v-model:visible="createDialogVisible"
      :properties="properties"
      :preset-property-id="presetPropertyId"
      @created="refreshAll"
    />
    <TerminateContractDialog
      v-model:visible="terminateDialogVisible"
      :contract="activeContract"
      @terminated="onTerminated"
    />
    <SettlementDialog
      v-model:visible="settlementDialogVisible"
      :contract="activeContract"
    />
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import PropertyCard from '../components/PropertyCard.vue';
import ContractPanel from '../components/ContractPanel.vue';
import CreateContractDialog from '../components/CreateContractDialog.vue';
import TerminateContractDialog from '../components/TerminateContractDialog.vue';
import SettlementDialog from '../components/SettlementDialog.vue';
import {
  ApiError,
  cancelContract,
  confirmContract,
  createRepair,
  getContracts,
  getProperties,
} from '../api/client';
import type { ContractItem, PropertyItem } from '../types/domain';

const properties = ref<PropertyItem[]>([]);
const contracts = ref<ContractItem[]>([]);
const contractsLoading = ref(false);
const mode = ref('列表视图');
const region = ref('');
const maxRent = ref(7000);
const layout = ref('全部');
const faultType = ref('水电');
const description = ref('');
const notice = ref('等待提交');

const createDialogVisible = ref(false);
const terminateDialogVisible = ref(false);
const settlementDialogVisible = ref(false);
const presetPropertyId = ref<number | null>(null);
const activeContract = ref<ContractItem | null>(null);

onMounted(refreshAll);

const filtered = computed(() => properties.value.filter((item) => {
  const hitRegion = !region.value || item.region.includes(region.value);
  const hitRent = item.rent <= maxRent.value;
  const hitLayout = layout.value === '全部' || item.layout === layout.value;
  return hitRegion && hitRent && hitLayout;
}));

async function refreshAll() {
  contractsLoading.value = true;
  try {
    const [propertyList, contractList] = await Promise.all([getProperties(), getContracts()]);
    properties.value = propertyList;
    contracts.value = contractList;
  } catch (err) {
    ElMessage.error(err instanceof ApiError ? err.message : '数据加载失败');
  } finally {
    contractsLoading.value = false;
  }
}

function openCreateDialog(item?: PropertyItem) {
  presetPropertyId.value = item?.id ?? null;
  createDialogVisible.value = true;
}

async function confirm(contract: ContractItem) {
  try {
    await confirmContract(contract.id);
    ElMessage.success(`合同 #${contract.id} 已生效，房源转为已签约`);
    await refreshAll();
  } catch (err) {
    ElMessage.error(err instanceof ApiError ? err.message : '合同确认失败');
  }
}

async function cancel(contract: ContractItem) {
  try {
    await ElMessageBox.confirm(`确定取消合同 #${contract.id} 吗？`, '取消合同', { type: 'warning' });
  } catch {
    return;
  }
  try {
    await cancelContract(contract.id);
    ElMessage.success(`合同 #${contract.id} 已取消`);
    await refreshAll();
  } catch (err) {
    ElMessage.error(err instanceof ApiError ? err.message : '合同取消失败');
  }
}

function openTerminateDialog(contract: ContractItem) {
  activeContract.value = contract;
  terminateDialogVisible.value = true;
}

async function onTerminated(contract: ContractItem) {
  await refreshAll();
  activeContract.value = contracts.value.find((item) => item.id === contract.id) ?? contract;
  settlementDialogVisible.value = true;
}

function openSettlementDialog(contract: ContractItem) {
  activeContract.value = contract;
  settlementDialogVisible.value = true;
}

async function submitRepair() {
  const ticket = await createRepair({ faultType: faultType.value, description: description.value });
  notice.value = `工单 ${ticket.id} 已提交：${ticket.status}`;
}
</script>
