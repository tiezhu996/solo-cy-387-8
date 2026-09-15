/// <reference types="../../node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { terminateContract, ApiError } from '../api/client';
const props = defineProps();
const emit = defineEmits();
const actualEndDate = ref('');
const submitting = ref(false);
watch(() => props.visible, (open) => {
    if (open)
        actualEndDate.value = '';
});
async function submit() {
    if (!props.contract)
        return;
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
    }
    catch (err) {
        ElMessage.error(err instanceof ApiError ? err.message : '退租办理失败');
    }
    finally {
        submitting.value = false;
    }
}
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
    title: "办理退租",
    width: "440px",
}));
const __VLS_2 = __VLS_1({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.visible),
    title: "办理退租",
    width: "440px",
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
if (__VLS_ctx.contract) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "summary" },
    });
    /** @type {__VLS_StyleScopedClasses['summary']} */ ;
    (__VLS_ctx.contract.community);
    (__VLS_ctx.contract.tenantName);
    (__VLS_ctx.contract.startDate);
    (__VLS_ctx.contract.endDate);
    let __VLS_9;
    /** @ts-ignore @type { | typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components['el-form'] | typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components['el-form']} */
    elForm;
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent1(__VLS_9, new __VLS_9({
        labelWidth: "90px",
    }));
    const __VLS_11 = __VLS_10({
        labelWidth: "90px",
    }, ...__VLS_functionalComponentArgsRest(__VLS_10));
    const { default: __VLS_14 } = __VLS_12.slots;
    let __VLS_15;
    /** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
    elFormItem;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({
        label: "实际退租日",
    }));
    const __VLS_17 = __VLS_16({
        label: "实际退租日",
    }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    const { default: __VLS_20 } = __VLS_18.slots;
    let __VLS_21;
    /** @ts-ignore @type { | typeof __VLS_components.elDatePicker | typeof __VLS_components.ElDatePicker | typeof __VLS_components['el-date-picker']} */
    elDatePicker;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent1(__VLS_21, new __VLS_21({
        modelValue: (__VLS_ctx.actualEndDate),
        type: "date",
        placeholder: "选择实际退租日期",
        valueFormat: "YYYY-MM-DD",
        disabledDate: ((day) => day.getTime() > Date.now()),
        ...{ class: "full" },
    }));
    const __VLS_23 = __VLS_22({
        modelValue: (__VLS_ctx.actualEndDate),
        type: "date",
        placeholder: "选择实际退租日期",
        valueFormat: "YYYY-MM-DD",
        disabledDate: ((day) => day.getTime() > Date.now()),
        ...{ class: "full" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    /** @type {__VLS_StyleScopedClasses['full']} */ ;
    // @ts-ignore
    [contract, contract, contract, contract, contract, actualEndDate,];
    var __VLS_18;
    // @ts-ignore
    [];
    var __VLS_12;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "hint" },
    });
    /** @type {__VLS_StyleScopedClasses['hint']} */ ;
}
{
    const { footer: __VLS_26 } = __VLS_3.slots;
    let __VLS_27;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_28 = __VLS_asFunctionalComponent1(__VLS_27, new __VLS_27({
        ...{ 'onClick': {} },
    }));
    const __VLS_29 = __VLS_28({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_28));
    let __VLS_32;
    const __VLS_33 = {
        /** @type {typeof __VLS_32.click} */
        onClick: (...[$event]) => {
            return (__VLS_ctx.emit('update:visible', false));
            // @ts-ignore
            [emit,];
        },
    };
    const { default: __VLS_34 } = __VLS_30.slots;
    // @ts-ignore
    [];
    var __VLS_30;
    var __VLS_31;
    let __VLS_35;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_36 = __VLS_asFunctionalComponent1(__VLS_35, new __VLS_35({
        ...{ 'onClick': {} },
        type: "danger",
        loading: (__VLS_ctx.submitting),
    }));
    const __VLS_37 = __VLS_36({
        ...{ 'onClick': {} },
        type: "danger",
        loading: (__VLS_ctx.submitting),
    }, ...__VLS_functionalComponentArgsRest(__VLS_36));
    let __VLS_40;
    const __VLS_41 = {
        /** @type {typeof __VLS_40.click} */
        onClick: (__VLS_ctx.submit),
    };
    const { default: __VLS_42 } = __VLS_38.slots;
    // @ts-ignore
    [submitting, submit,];
    var __VLS_38;
    var __VLS_39;
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
