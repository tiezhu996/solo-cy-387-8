/// <reference types="../../node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { computed, onMounted, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import PropertyCard from '../components/PropertyCard.vue';
import ContractPanel from '../components/ContractPanel.vue';
import CreateContractDialog from '../components/CreateContractDialog.vue';
import TerminateContractDialog from '../components/TerminateContractDialog.vue';
import SettlementDialog from '../components/SettlementDialog.vue';
import { ApiError, cancelContract, confirmContract, createRepair, getContracts, getProperties, } from '../api/client';
const properties = ref([]);
const contracts = ref([]);
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
const presetPropertyId = ref(null);
const activeContract = ref(null);
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
    }
    catch (err) {
        ElMessage.error(err instanceof ApiError ? err.message : '数据加载失败');
    }
    finally {
        contractsLoading.value = false;
    }
}
function openCreateDialog(item) {
    presetPropertyId.value = item?.id ?? null;
    createDialogVisible.value = true;
}
async function confirm(contract) {
    try {
        await confirmContract(contract.id);
        ElMessage.success(`合同 #${contract.id} 已生效，房源转为已签约`);
        await refreshAll();
    }
    catch (err) {
        ElMessage.error(err instanceof ApiError ? err.message : '合同确认失败');
    }
}
async function cancel(contract) {
    try {
        await ElMessageBox.confirm(`确定取消合同 #${contract.id} 吗？`, '取消合同', { type: 'warning' });
    }
    catch {
        return;
    }
    try {
        await cancelContract(contract.id);
        ElMessage.success(`合同 #${contract.id} 已取消`);
        await refreshAll();
    }
    catch (err) {
        ElMessage.error(err instanceof ApiError ? err.message : '合同取消失败');
    }
}
function openTerminateDialog(contract) {
    activeContract.value = contract;
    terminateDialogVisible.value = true;
}
async function onTerminated(contract) {
    await refreshAll();
    activeContract.value = contracts.value.find((item) => item.id === contract.id) ?? contract;
    settlementDialogVisible.value = true;
}
function openSettlementDialog(contract) {
    activeContract.value = contract;
    settlementDialogVisible.value = true;
}
async function submitRepair() {
    const ticket = await createRepair({ faultType: faultType.value, description: description.value });
    notice.value = `工单 ${ticket.id} 已提交：${ticket.status}`;
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.main, __VLS_intrinsics.main)({
    ...{ class: "page" },
});
/** @type {__VLS_StyleScopedClasses['page']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "toolbar" },
});
/** @type {__VLS_StyleScopedClasses['toolbar']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elSegmented | typeof __VLS_components.ElSegmented | typeof __VLS_components['el-segmented']} */
elSegmented;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.mode),
    options: (['列表视图', '地图视图']),
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.mode),
    options: (['列表视图', '地图视图']),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "filters" },
});
/** @type {__VLS_StyleScopedClasses['filters']} */ ;
let __VLS_5;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
    modelValue: (__VLS_ctx.region),
    placeholder: "区域",
}));
const __VLS_7 = __VLS_6({
    modelValue: (__VLS_ctx.region),
    placeholder: "区域",
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
let __VLS_10;
/** @ts-ignore @type { | typeof __VLS_components.elInputNumber | typeof __VLS_components.ElInputNumber | typeof __VLS_components['el-input-number']} */
elInputNumber;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent1(__VLS_10, new __VLS_10({
    modelValue: (__VLS_ctx.maxRent),
    min: (1000),
    step: (500),
}));
const __VLS_12 = __VLS_11({
    modelValue: (__VLS_ctx.maxRent),
    min: (1000),
    step: (500),
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
let __VLS_15;
/** @ts-ignore @type { | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select'] | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select']} */
elSelect;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({
    modelValue: (__VLS_ctx.layout),
    placeholder: "户型",
}));
const __VLS_17 = __VLS_16({
    modelValue: (__VLS_ctx.layout),
    placeholder: "户型",
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
const { default: __VLS_20 } = __VLS_18.slots;
let __VLS_21;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent1(__VLS_21, new __VLS_21({
    label: "全部",
    value: "全部",
}));
const __VLS_23 = __VLS_22({
    label: "全部",
    value: "全部",
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
let __VLS_26;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent1(__VLS_26, new __VLS_26({
    label: "一室一厅",
    value: "一室一厅",
}));
const __VLS_28 = __VLS_27({
    label: "一室一厅",
    value: "一室一厅",
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
let __VLS_31;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_32 = __VLS_asFunctionalComponent1(__VLS_31, new __VLS_31({
    label: "两室一厅",
    value: "两室一厅",
}));
const __VLS_33 = __VLS_32({
    label: "两室一厅",
    value: "两室一厅",
}, ...__VLS_functionalComponentArgsRest(__VLS_32));
let __VLS_36;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
    label: "三室两厅",
    value: "三室两厅",
}));
const __VLS_38 = __VLS_37({
    label: "三室两厅",
    value: "三室两厅",
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
// @ts-ignore
[mode, region, maxRent, layout,];
var __VLS_18;
if (__VLS_ctx.mode === '地图视图') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
        ...{ class: "map-panel" },
    });
    /** @type {__VLS_StyleScopedClasses['map-panel']} */ ;
    (__VLS_ctx.filtered.length);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "grid" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
for (const [item] of __VLS_vFor((__VLS_ctx.filtered))) {
    const __VLS_41 = PropertyCard;
    // @ts-ignore
    const __VLS_42 = __VLS_asFunctionalComponent1(__VLS_41, new __VLS_41({
        ...{ 'onCreateContract': {} },
        key: (item.id),
        item: (item),
    }));
    const __VLS_43 = __VLS_42({
        ...{ 'onCreateContract': {} },
        key: (item.id),
        item: (item),
    }, ...__VLS_functionalComponentArgsRest(__VLS_42));
    let __VLS_46;
    const __VLS_47 = {
        /** @type {typeof __VLS_46.createContract} */
        onCreateContract: (__VLS_ctx.openCreateDialog),
    };
    var __VLS_44;
    var __VLS_45;
    // @ts-ignore
    [mode, filtered, filtered, openCreateDialog,];
}
const __VLS_48 = ContractPanel;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent1(__VLS_48, new __VLS_48({
    ...{ 'onCreate': {} },
    ...{ 'onConfirm': {} },
    ...{ 'onCancel': {} },
    ...{ 'onTerminate': {} },
    ...{ 'onViewSettlement': {} },
    contracts: (__VLS_ctx.contracts),
    loading: (__VLS_ctx.contractsLoading),
}));
const __VLS_50 = __VLS_49({
    ...{ 'onCreate': {} },
    ...{ 'onConfirm': {} },
    ...{ 'onCancel': {} },
    ...{ 'onTerminate': {} },
    ...{ 'onViewSettlement': {} },
    contracts: (__VLS_ctx.contracts),
    loading: (__VLS_ctx.contractsLoading),
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
let __VLS_53;
const __VLS_54 = {
    /** @type {typeof __VLS_53.create} */
    onCreate: (...[$event]) => {
        return (__VLS_ctx.openCreateDialog());
        // @ts-ignore
        [openCreateDialog, contracts, contractsLoading,];
    },
};
const __VLS_55 = {
    /** @type {typeof __VLS_53.confirm} */
    onConfirm: (__VLS_ctx.confirm),
};
const __VLS_56 = {
    /** @type {typeof __VLS_53.cancel} */
    onCancel: (__VLS_ctx.cancel),
};
const __VLS_57 = {
    /** @type {typeof __VLS_53.terminate} */
    onTerminate: (__VLS_ctx.openTerminateDialog),
};
const __VLS_58 = {
    /** @type {typeof __VLS_53.viewSettlement} */
    onViewSettlement: (__VLS_ctx.openSettlementDialog),
};
var __VLS_51;
var __VLS_52;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "repair" },
});
/** @type {__VLS_StyleScopedClasses['repair']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
let __VLS_59;
/** @ts-ignore @type { | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select'] | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select']} */
elSelect;
// @ts-ignore
const __VLS_60 = __VLS_asFunctionalComponent1(__VLS_59, new __VLS_59({
    modelValue: (__VLS_ctx.faultType),
}));
const __VLS_61 = __VLS_60({
    modelValue: (__VLS_ctx.faultType),
}, ...__VLS_functionalComponentArgsRest(__VLS_60));
const { default: __VLS_64 } = __VLS_62.slots;
let __VLS_65;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_66 = __VLS_asFunctionalComponent1(__VLS_65, new __VLS_65({
    label: "水电",
    value: "水电",
}));
const __VLS_67 = __VLS_66({
    label: "水电",
    value: "水电",
}, ...__VLS_functionalComponentArgsRest(__VLS_66));
let __VLS_70;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_71 = __VLS_asFunctionalComponent1(__VLS_70, new __VLS_70({
    label: "门锁",
    value: "门锁",
}));
const __VLS_72 = __VLS_71({
    label: "门锁",
    value: "门锁",
}, ...__VLS_functionalComponentArgsRest(__VLS_71));
let __VLS_75;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_76 = __VLS_asFunctionalComponent1(__VLS_75, new __VLS_75({
    label: "管道",
    value: "管道",
}));
const __VLS_77 = __VLS_76({
    label: "管道",
    value: "管道",
}, ...__VLS_functionalComponentArgsRest(__VLS_76));
let __VLS_80;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_81 = __VLS_asFunctionalComponent1(__VLS_80, new __VLS_80({
    label: "家电",
    value: "家电",
}));
const __VLS_82 = __VLS_81({
    label: "家电",
    value: "家电",
}, ...__VLS_functionalComponentArgsRest(__VLS_81));
let __VLS_85;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_86 = __VLS_asFunctionalComponent1(__VLS_85, new __VLS_85({
    label: "其他",
    value: "其他",
}));
const __VLS_87 = __VLS_86({
    label: "其他",
    value: "其他",
}, ...__VLS_functionalComponentArgsRest(__VLS_86));
// @ts-ignore
[confirm, cancel, openTerminateDialog, openSettlementDialog, faultType,];
var __VLS_62;
let __VLS_90;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_91 = __VLS_asFunctionalComponent1(__VLS_90, new __VLS_90({
    modelValue: (__VLS_ctx.description),
    placeholder: "描述故障情况",
}));
const __VLS_92 = __VLS_91({
    modelValue: (__VLS_ctx.description),
    placeholder: "描述故障情况",
}, ...__VLS_functionalComponentArgsRest(__VLS_91));
let __VLS_95;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_96 = __VLS_asFunctionalComponent1(__VLS_95, new __VLS_95({
    ...{ 'onClick': {} },
    type: "success",
}));
const __VLS_97 = __VLS_96({
    ...{ 'onClick': {} },
    type: "success",
}, ...__VLS_functionalComponentArgsRest(__VLS_96));
let __VLS_100;
const __VLS_101 = {
    /** @type {typeof __VLS_100.click} */
    onClick: (__VLS_ctx.submitRepair),
};
const { default: __VLS_102 } = __VLS_98.slots;
// @ts-ignore
[description, submitRepair,];
var __VLS_98;
var __VLS_99;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.notice);
const __VLS_103 = CreateContractDialog;
// @ts-ignore
const __VLS_104 = __VLS_asFunctionalComponent1(__VLS_103, new __VLS_103({
    ...{ 'onCreated': {} },
    visible: (__VLS_ctx.createDialogVisible),
    properties: (__VLS_ctx.properties),
    presetPropertyId: (__VLS_ctx.presetPropertyId),
}));
const __VLS_105 = __VLS_104({
    ...{ 'onCreated': {} },
    visible: (__VLS_ctx.createDialogVisible),
    properties: (__VLS_ctx.properties),
    presetPropertyId: (__VLS_ctx.presetPropertyId),
}, ...__VLS_functionalComponentArgsRest(__VLS_104));
let __VLS_108;
const __VLS_109 = {
    /** @type {typeof __VLS_108.created} */
    onCreated: (__VLS_ctx.refreshAll),
};
var __VLS_106;
var __VLS_107;
const __VLS_110 = TerminateContractDialog;
// @ts-ignore
const __VLS_111 = __VLS_asFunctionalComponent1(__VLS_110, new __VLS_110({
    ...{ 'onTerminated': {} },
    visible: (__VLS_ctx.terminateDialogVisible),
    contract: (__VLS_ctx.activeContract),
}));
const __VLS_112 = __VLS_111({
    ...{ 'onTerminated': {} },
    visible: (__VLS_ctx.terminateDialogVisible),
    contract: (__VLS_ctx.activeContract),
}, ...__VLS_functionalComponentArgsRest(__VLS_111));
let __VLS_115;
const __VLS_116 = {
    /** @type {typeof __VLS_115.terminated} */
    onTerminated: (__VLS_ctx.onTerminated),
};
var __VLS_113;
var __VLS_114;
const __VLS_117 = SettlementDialog;
// @ts-ignore
const __VLS_118 = __VLS_asFunctionalComponent1(__VLS_117, new __VLS_117({
    visible: (__VLS_ctx.settlementDialogVisible),
    contract: (__VLS_ctx.activeContract),
}));
const __VLS_119 = __VLS_118({
    visible: (__VLS_ctx.settlementDialogVisible),
    contract: (__VLS_ctx.activeContract),
}, ...__VLS_functionalComponentArgsRest(__VLS_118));
// @ts-ignore
[notice, createDialogVisible, properties, presetPropertyId, refreshAll, terminateDialogVisible, activeContract, activeContract, onTerminated, settlementDialogVisible,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
