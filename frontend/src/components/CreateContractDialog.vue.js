/// <reference types="../../node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { computed, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { createContract, ApiError } from '../api/client';
const props = defineProps();
const emit = defineEmits();
const submitting = ref(false);
const leaseRange = ref(null);
const form = reactive({
    propertyId: null,
    tenantName: '',
    tenantPhone: '',
    monthlyRent: 3000,
    deposit: 3000,
});
const eligibleProperties = computed(() => props.properties.filter((item) => item.status !== '已签约'));
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
    }
    catch (err) {
        ElMessage.error(err instanceof ApiError ? err.message : '合同创建失败');
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
    ...{ 'onOpen': {} },
    modelValue: (__VLS_ctx.visible),
    title: "发起合同（房东）",
    width: "520px",
}));
const __VLS_2 = __VLS_1({
    ...{ 'onUpdate:modelValue': {} },
    ...{ 'onOpen': {} },
    modelValue: (__VLS_ctx.visible),
    title: "发起合同（房东）",
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
const __VLS_7 = {
    /** @type {typeof __VLS_5.open} */
    onOpen: (__VLS_ctx.resetForm),
};
var __VLS_8;
const { default: __VLS_9 } = __VLS_3.slots;
let __VLS_10;
/** @ts-ignore @type { | typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components['el-form'] | typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components['el-form']} */
elForm;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent1(__VLS_10, new __VLS_10({
    labelWidth: "90px",
}));
const __VLS_12 = __VLS_11({
    labelWidth: "90px",
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
const { default: __VLS_15 } = __VLS_13.slots;
let __VLS_16;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent1(__VLS_16, new __VLS_16({
    label: "房源",
}));
const __VLS_18 = __VLS_17({
    label: "房源",
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
const { default: __VLS_21 } = __VLS_19.slots;
let __VLS_22;
/** @ts-ignore @type { | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select'] | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select']} */
elSelect;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent1(__VLS_22, new __VLS_22({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.form.propertyId),
    placeholder: "选择待出租/已预约房源",
    ...{ class: "full" },
}));
const __VLS_24 = __VLS_23({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.form.propertyId),
    placeholder: "选择待出租/已预约房源",
    ...{ class: "full" },
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
let __VLS_27;
const __VLS_28 = {
    /** @type {typeof __VLS_27.change} */
    onChange: (__VLS_ctx.applyPropertyDefaults),
};
/** @type {__VLS_StyleScopedClasses['full']} */ ;
const { default: __VLS_29 } = __VLS_25.slots;
for (const [item] of __VLS_vFor((__VLS_ctx.eligibleProperties))) {
    let __VLS_30;
    /** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
    elOption;
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
        key: (item.id),
        value: (item.id),
        label: (`${item.community} · ${item.layout} · ¥${item.rent}/月（${item.status}）`),
    }));
    const __VLS_32 = __VLS_31({
        key: (item.id),
        value: (item.id),
        label: (`${item.community} · ${item.layout} · ¥${item.rent}/月（${item.status}）`),
    }, ...__VLS_functionalComponentArgsRest(__VLS_31));
    // @ts-ignore
    [resetForm, form, applyPropertyDefaults, eligibleProperties,];
}
// @ts-ignore
[];
var __VLS_25;
var __VLS_26;
// @ts-ignore
[];
var __VLS_19;
let __VLS_35;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent1(__VLS_35, new __VLS_35({
    label: "租客姓名",
}));
const __VLS_37 = __VLS_36({
    label: "租客姓名",
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
const { default: __VLS_40 } = __VLS_38.slots;
let __VLS_41;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent1(__VLS_41, new __VLS_41({
    modelValue: (__VLS_ctx.form.tenantName),
    placeholder: "租客姓名",
}));
const __VLS_43 = __VLS_42({
    modelValue: (__VLS_ctx.form.tenantName),
    placeholder: "租客姓名",
}, ...__VLS_functionalComponentArgsRest(__VLS_42));
// @ts-ignore
[form,];
var __VLS_38;
let __VLS_46;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_47 = __VLS_asFunctionalComponent1(__VLS_46, new __VLS_46({
    label: "租客电话",
}));
const __VLS_48 = __VLS_47({
    label: "租客电话",
}, ...__VLS_functionalComponentArgsRest(__VLS_47));
const { default: __VLS_51 } = __VLS_49.slots;
let __VLS_52;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent1(__VLS_52, new __VLS_52({
    modelValue: (__VLS_ctx.form.tenantPhone),
    placeholder: "联系电话",
}));
const __VLS_54 = __VLS_53({
    modelValue: (__VLS_ctx.form.tenantPhone),
    placeholder: "联系电话",
}, ...__VLS_functionalComponentArgsRest(__VLS_53));
// @ts-ignore
[form,];
var __VLS_49;
let __VLS_57;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_58 = __VLS_asFunctionalComponent1(__VLS_57, new __VLS_57({
    label: "租期",
}));
const __VLS_59 = __VLS_58({
    label: "租期",
}, ...__VLS_functionalComponentArgsRest(__VLS_58));
const { default: __VLS_62 } = __VLS_60.slots;
let __VLS_63;
/** @ts-ignore @type { | typeof __VLS_components.elDatePicker | typeof __VLS_components.ElDatePicker | typeof __VLS_components['el-date-picker']} */
elDatePicker;
// @ts-ignore
const __VLS_64 = __VLS_asFunctionalComponent1(__VLS_63, new __VLS_63({
    modelValue: (__VLS_ctx.leaseRange),
    type: "daterange",
    rangeSeparator: "至",
    startPlaceholder: "起租日期",
    endPlaceholder: "到期日期",
    valueFormat: "YYYY-MM-DD",
    ...{ class: "full" },
}));
const __VLS_65 = __VLS_64({
    modelValue: (__VLS_ctx.leaseRange),
    type: "daterange",
    rangeSeparator: "至",
    startPlaceholder: "起租日期",
    endPlaceholder: "到期日期",
    valueFormat: "YYYY-MM-DD",
    ...{ class: "full" },
}, ...__VLS_functionalComponentArgsRest(__VLS_64));
/** @type {__VLS_StyleScopedClasses['full']} */ ;
// @ts-ignore
[leaseRange,];
var __VLS_60;
let __VLS_68;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_69 = __VLS_asFunctionalComponent1(__VLS_68, new __VLS_68({
    label: "月租金",
}));
const __VLS_70 = __VLS_69({
    label: "月租金",
}, ...__VLS_functionalComponentArgsRest(__VLS_69));
const { default: __VLS_73 } = __VLS_71.slots;
let __VLS_74;
/** @ts-ignore @type { | typeof __VLS_components.elInputNumber | typeof __VLS_components.ElInputNumber | typeof __VLS_components['el-input-number']} */
elInputNumber;
// @ts-ignore
const __VLS_75 = __VLS_asFunctionalComponent1(__VLS_74, new __VLS_74({
    modelValue: (__VLS_ctx.form.monthlyRent),
    min: (1),
    step: (100),
    ...{ class: "full" },
}));
const __VLS_76 = __VLS_75({
    modelValue: (__VLS_ctx.form.monthlyRent),
    min: (1),
    step: (100),
    ...{ class: "full" },
}, ...__VLS_functionalComponentArgsRest(__VLS_75));
/** @type {__VLS_StyleScopedClasses['full']} */ ;
// @ts-ignore
[form,];
var __VLS_71;
let __VLS_79;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_80 = __VLS_asFunctionalComponent1(__VLS_79, new __VLS_79({
    label: "押金",
}));
const __VLS_81 = __VLS_80({
    label: "押金",
}, ...__VLS_functionalComponentArgsRest(__VLS_80));
const { default: __VLS_84 } = __VLS_82.slots;
let __VLS_85;
/** @ts-ignore @type { | typeof __VLS_components.elInputNumber | typeof __VLS_components.ElInputNumber | typeof __VLS_components['el-input-number']} */
elInputNumber;
// @ts-ignore
const __VLS_86 = __VLS_asFunctionalComponent1(__VLS_85, new __VLS_85({
    modelValue: (__VLS_ctx.form.deposit),
    min: (0),
    step: (100),
    ...{ class: "full" },
}));
const __VLS_87 = __VLS_86({
    modelValue: (__VLS_ctx.form.deposit),
    min: (0),
    step: (100),
    ...{ class: "full" },
}, ...__VLS_functionalComponentArgsRest(__VLS_86));
/** @type {__VLS_StyleScopedClasses['full']} */ ;
// @ts-ignore
[form,];
var __VLS_82;
// @ts-ignore
[];
var __VLS_13;
{
    const { footer: __VLS_90 } = __VLS_3.slots;
    let __VLS_91;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_92 = __VLS_asFunctionalComponent1(__VLS_91, new __VLS_91({
        ...{ 'onClick': {} },
    }));
    const __VLS_93 = __VLS_92({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_92));
    let __VLS_96;
    const __VLS_97 = {
        /** @type {typeof __VLS_96.click} */
        onClick: (...[$event]) => {
            return (__VLS_ctx.emit('update:visible', false));
            // @ts-ignore
            [emit,];
        },
    };
    const { default: __VLS_98 } = __VLS_94.slots;
    // @ts-ignore
    [];
    var __VLS_94;
    var __VLS_95;
    let __VLS_99;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_100 = __VLS_asFunctionalComponent1(__VLS_99, new __VLS_99({
        ...{ 'onClick': {} },
        type: "primary",
        loading: (__VLS_ctx.submitting),
    }));
    const __VLS_101 = __VLS_100({
        ...{ 'onClick': {} },
        type: "primary",
        loading: (__VLS_ctx.submitting),
    }, ...__VLS_functionalComponentArgsRest(__VLS_100));
    let __VLS_104;
    const __VLS_105 = {
        /** @type {typeof __VLS_104.click} */
        onClick: (__VLS_ctx.submit),
    };
    const { default: __VLS_106 } = __VLS_102.slots;
    // @ts-ignore
    [submitting, submit,];
    var __VLS_102;
    var __VLS_103;
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
