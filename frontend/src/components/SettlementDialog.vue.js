/// <reference types="../../node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { computed } from 'vue';
const props = defineProps();
const emit = defineEmits();
const settlement = computed(() => props.contract?.settlement ?? null);
const rows = computed(() => {
    if (!settlement.value)
        return [];
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
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog'] | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog']} */
elDialog;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.visible),
    title: "退租结算单",
    width: "520px",
}));
const __VLS_2 = __VLS_1({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.visible),
    title: "退租结算单",
    width: "520px",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = {
    /** @type {typeof __VLS_5.'update:modelValue'} */
    'onUpdate:modelValue': (...[$event]) => {
        return (__VLS_ctx.emit('update:visible', $event));
        // @ts-ignore
        [visible, emit,];
    },
};
var __VLS_7;
const { default: __VLS_8 } = __VLS_3.slots;
if (__VLS_ctx.contract && __VLS_ctx.settlement) {
    let __VLS_9;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptions | typeof __VLS_components.ElDescriptions | typeof __VLS_components['el-descriptions'] | typeof __VLS_components.elDescriptions | typeof __VLS_components.ElDescriptions | typeof __VLS_components['el-descriptions']} */
    elDescriptions;
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent1(__VLS_9, new __VLS_9({
        column: (2),
        border: true,
        size: "small",
    }));
    const __VLS_11 = __VLS_10({
        column: (2),
        border: true,
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_10));
    const { default: __VLS_14 } = __VLS_12.slots;
    let __VLS_15;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({
        label: "合同编号",
    }));
    const __VLS_17 = __VLS_16({
        label: "合同编号",
    }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    const { default: __VLS_20 } = __VLS_18.slots;
    (__VLS_ctx.contract.id);
    (__VLS_ctx.contract.version);
    // @ts-ignore
    [contract, contract, contract, settlement,];
    var __VLS_18;
    let __VLS_21;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent1(__VLS_21, new __VLS_21({
        label: "房源",
    }));
    const __VLS_23 = __VLS_22({
        label: "房源",
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    const { default: __VLS_26 } = __VLS_24.slots;
    (__VLS_ctx.contract.community);
    // @ts-ignore
    [contract,];
    var __VLS_24;
    let __VLS_27;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_28 = __VLS_asFunctionalComponent1(__VLS_27, new __VLS_27({
        label: "租客",
    }));
    const __VLS_29 = __VLS_28({
        label: "租客",
    }, ...__VLS_functionalComponentArgsRest(__VLS_28));
    const { default: __VLS_32 } = __VLS_30.slots;
    (__VLS_ctx.contract.tenantName);
    // @ts-ignore
    [contract,];
    var __VLS_30;
    let __VLS_33;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_34 = __VLS_asFunctionalComponent1(__VLS_33, new __VLS_33({
        label: "月租金",
    }));
    const __VLS_35 = __VLS_34({
        label: "月租金",
    }, ...__VLS_functionalComponentArgsRest(__VLS_34));
    const { default: __VLS_38 } = __VLS_36.slots;
    (__VLS_ctx.contract.monthlyRent);
    // @ts-ignore
    [contract,];
    var __VLS_36;
    let __VLS_39;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_40 = __VLS_asFunctionalComponent1(__VLS_39, new __VLS_39({
        label: "原租期",
    }));
    const __VLS_41 = __VLS_40({
        label: "原租期",
    }, ...__VLS_functionalComponentArgsRest(__VLS_40));
    const { default: __VLS_44 } = __VLS_42.slots;
    (__VLS_ctx.contract.startDate);
    (__VLS_ctx.contract.endDate);
    (__VLS_ctx.settlement.plannedDays);
    // @ts-ignore
    [contract, contract, settlement,];
    var __VLS_42;
    let __VLS_45;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_46 = __VLS_asFunctionalComponent1(__VLS_45, new __VLS_45({
        label: "实际退租日",
    }));
    const __VLS_47 = __VLS_46({
        label: "实际退租日",
    }, ...__VLS_functionalComponentArgsRest(__VLS_46));
    const { default: __VLS_50 } = __VLS_48.slots;
    (__VLS_ctx.settlement.actualEndDate);
    (__VLS_ctx.settlement.actualDays);
    // @ts-ignore
    [settlement, settlement,];
    var __VLS_48;
    // @ts-ignore
    [];
    var __VLS_12;
    let __VLS_51;
    /** @ts-ignore @type { | typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components['el-table'] | typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components['el-table']} */
    elTable;
    // @ts-ignore
    const __VLS_52 = __VLS_asFunctionalComponent1(__VLS_51, new __VLS_51({
        data: (__VLS_ctx.rows),
        size: "small",
        ...{ class: "amount-table" },
    }));
    const __VLS_53 = __VLS_52({
        data: (__VLS_ctx.rows),
        size: "small",
        ...{ class: "amount-table" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_52));
    /** @type {__VLS_StyleScopedClasses['amount-table']} */ ;
    const { default: __VLS_56 } = __VLS_54.slots;
    let __VLS_57;
    /** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
    elTableColumn;
    // @ts-ignore
    const __VLS_58 = __VLS_asFunctionalComponent1(__VLS_57, new __VLS_57({
        prop: "label",
        label: "项目",
    }));
    const __VLS_59 = __VLS_58({
        prop: "label",
        label: "项目",
    }, ...__VLS_functionalComponentArgsRest(__VLS_58));
    let __VLS_62;
    /** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
    elTableColumn;
    // @ts-ignore
    const __VLS_63 = __VLS_asFunctionalComponent1(__VLS_62, new __VLS_62({
        prop: "amount",
        label: "金额（元）",
        align: "right",
        width: "140",
    }));
    const __VLS_64 = __VLS_63({
        prop: "amount",
        label: "金额（元）",
        align: "right",
        width: "140",
    }, ...__VLS_functionalComponentArgsRest(__VLS_63));
    // @ts-ignore
    [rows,];
    var __VLS_54;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "note" },
    });
    /** @type {__VLS_StyleScopedClasses['note']} */ ;
}
else {
    let __VLS_67;
    /** @ts-ignore @type { | typeof __VLS_components.elEmpty | typeof __VLS_components.ElEmpty | typeof __VLS_components['el-empty']} */
    elEmpty;
    // @ts-ignore
    const __VLS_68 = __VLS_asFunctionalComponent1(__VLS_67, new __VLS_67({
        description: "该合同尚未生成结算单",
    }));
    const __VLS_69 = __VLS_68({
        description: "该合同尚未生成结算单",
    }, ...__VLS_functionalComponentArgsRest(__VLS_68));
}
{
    const { footer: __VLS_72 } = __VLS_3.slots;
    let __VLS_73;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_74 = __VLS_asFunctionalComponent1(__VLS_73, new __VLS_73({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_75 = __VLS_74({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_74));
    let __VLS_78;
    const __VLS_79 = {
        /** @type {typeof __VLS_78.click} */
        onClick: (...[$event]) => {
            return (__VLS_ctx.emit('update:visible', false));
            // @ts-ignore
            [emit,];
        },
    };
    const { default: __VLS_80 } = __VLS_76.slots;
    // @ts-ignore
    [];
    var __VLS_76;
    var __VLS_77;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_3;
var __VLS_4;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
