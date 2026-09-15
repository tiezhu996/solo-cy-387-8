/// <reference types="../../node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../node_modules/@vue/language-core/types/props-fallback.d.ts" />
const __VLS_props = defineProps();
const emit = defineEmits();
function contractTagType(status) {
    const map = {
        待确认: 'warning',
        已生效: 'success',
        已终止: 'info',
        已取消: 'danger',
    };
    return map[status] ?? 'info';
}
function propertyTagType(status) {
    const map = {
        待出租: 'success',
        已预约: 'warning',
        已签约: 'primary',
    };
    return map[status] ?? 'info';
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
/** @type {__VLS_StyleScopedClasses['panel-header']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "contract-panel" },
});
/** @type {__VLS_StyleScopedClasses['contract-panel']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "panel-header" },
});
/** @type {__VLS_StyleScopedClasses['panel-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    type: "primary",
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = {
    /** @type {typeof __VLS_5.click} */
    onClick: (...[$event]) => {
        return (__VLS_ctx.emit('create'));
        // @ts-ignore
        [emit,];
    },
};
const { default: __VLS_7 } = __VLS_3.slots;
// @ts-ignore
[];
var __VLS_3;
var __VLS_4;
let __VLS_8;
/** @ts-ignore @type { | typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components['el-table'] | typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components['el-table']} */
elTable;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
    data: (__VLS_ctx.contracts),
    emptyText: "暂无合同，点击右上角发起",
}));
const __VLS_10 = __VLS_9({
    data: (__VLS_ctx.contracts),
    emptyText: "暂无合同，点击右上角发起",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_asFunctionalDirective(__VLS_directives.vLoading, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading), }, null, null);
const { default: __VLS_13 } = __VLS_11.slots;
let __VLS_14;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent1(__VLS_14, new __VLS_14({
    label: "合同",
    width: "90",
}));
const __VLS_16 = __VLS_15({
    label: "合同",
    width: "90",
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
const { default: __VLS_19 } = __VLS_17.slots;
{
    const { default: __VLS_20 } = __VLS_17.slots;
    const [{ row }] = __VLS_vSlot(__VLS_20);
    (row.id);
    let __VLS_21;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent1(__VLS_21, new __VLS_21({
        size: "small",
        effect: "plain",
        ...{ class: "version-tag" },
    }));
    const __VLS_23 = __VLS_22({
        size: "small",
        effect: "plain",
        ...{ class: "version-tag" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    /** @type {__VLS_StyleScopedClasses['version-tag']} */ ;
    const { default: __VLS_26 } = __VLS_24.slots;
    (row.version);
    // @ts-ignore
    [contracts, vLoading, loading,];
    var __VLS_24;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_17;
let __VLS_27;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_28 = __VLS_asFunctionalComponent1(__VLS_27, new __VLS_27({
    label: "房源",
    minWidth: "140",
}));
const __VLS_29 = __VLS_28({
    label: "房源",
    minWidth: "140",
}, ...__VLS_functionalComponentArgsRest(__VLS_28));
const { default: __VLS_32 } = __VLS_30.slots;
{
    const { default: __VLS_33 } = __VLS_30.slots;
    const [{ row }] = __VLS_vSlot(__VLS_33);
    (row.community);
    let __VLS_34;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_35 = __VLS_asFunctionalComponent1(__VLS_34, new __VLS_34({
        size: "small",
        type: (__VLS_ctx.propertyTagType(row.propertyStatus)),
    }));
    const __VLS_36 = __VLS_35({
        size: "small",
        type: (__VLS_ctx.propertyTagType(row.propertyStatus)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_35));
    const { default: __VLS_39 } = __VLS_37.slots;
    (row.propertyStatus);
    // @ts-ignore
    [propertyTagType,];
    var __VLS_37;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_30;
let __VLS_40;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent1(__VLS_40, new __VLS_40({
    prop: "tenantName",
    label: "租客",
    width: "90",
}));
const __VLS_42 = __VLS_41({
    prop: "tenantName",
    label: "租客",
    width: "90",
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
let __VLS_45;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent1(__VLS_45, new __VLS_45({
    label: "租期",
    minWidth: "180",
}));
const __VLS_47 = __VLS_46({
    label: "租期",
    minWidth: "180",
}, ...__VLS_functionalComponentArgsRest(__VLS_46));
const { default: __VLS_50 } = __VLS_48.slots;
{
    const { default: __VLS_51 } = __VLS_48.slots;
    const [{ row }] = __VLS_vSlot(__VLS_51);
    (row.startDate);
    (row.endDate);
    if (row.actualEndDate) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "actual-end" },
        });
        /** @type {__VLS_StyleScopedClasses['actual-end']} */ ;
        (row.actualEndDate);
    }
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_48;
let __VLS_52;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent1(__VLS_52, new __VLS_52({
    label: "租金/押金",
    width: "130",
}));
const __VLS_54 = __VLS_53({
    label: "租金/押金",
    width: "130",
}, ...__VLS_functionalComponentArgsRest(__VLS_53));
const { default: __VLS_57 } = __VLS_55.slots;
{
    const { default: __VLS_58 } = __VLS_55.slots;
    const [{ row }] = __VLS_vSlot(__VLS_58);
    (row.monthlyRent);
    __VLS_asFunctionalElement1(__VLS_intrinsics.br)({});
    (row.deposit);
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_55;
let __VLS_59;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_60 = __VLS_asFunctionalComponent1(__VLS_59, new __VLS_59({
    label: "状态",
    width: "90",
}));
const __VLS_61 = __VLS_60({
    label: "状态",
    width: "90",
}, ...__VLS_functionalComponentArgsRest(__VLS_60));
const { default: __VLS_64 } = __VLS_62.slots;
{
    const { default: __VLS_65 } = __VLS_62.slots;
    const [{ row }] = __VLS_vSlot(__VLS_65);
    let __VLS_66;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_67 = __VLS_asFunctionalComponent1(__VLS_66, new __VLS_66({
        type: (__VLS_ctx.contractTagType(row.status)),
    }));
    const __VLS_68 = __VLS_67({
        type: (__VLS_ctx.contractTagType(row.status)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_67));
    const { default: __VLS_71 } = __VLS_69.slots;
    (row.status);
    // @ts-ignore
    [contractTagType,];
    var __VLS_69;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_62;
let __VLS_72;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent1(__VLS_72, new __VLS_72({
    label: "结算",
    minWidth: "120",
}));
const __VLS_74 = __VLS_73({
    label: "结算",
    minWidth: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
const { default: __VLS_77 } = __VLS_75.slots;
{
    const { default: __VLS_78 } = __VLS_75.slots;
    const [{ row }] = __VLS_vSlot(__VLS_78);
    if (row.settlement) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
        (row.settlement.unsettledRent);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
        (row.settlement.totalRefund);
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "muted" },
        });
        /** @type {__VLS_StyleScopedClasses['muted']} */ ;
    }
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_75;
let __VLS_79;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_80 = __VLS_asFunctionalComponent1(__VLS_79, new __VLS_79({
    label: "操作",
    width: "220",
    fixed: "right",
}));
const __VLS_81 = __VLS_80({
    label: "操作",
    width: "220",
    fixed: "right",
}, ...__VLS_functionalComponentArgsRest(__VLS_80));
const { default: __VLS_84 } = __VLS_82.slots;
{
    const { default: __VLS_85 } = __VLS_82.slots;
    const [{ row }] = __VLS_vSlot(__VLS_85);
    if (row.status === '待确认') {
        let __VLS_86;
        /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
        elButton;
        // @ts-ignore
        const __VLS_87 = __VLS_asFunctionalComponent1(__VLS_86, new __VLS_86({
            ...{ 'onClick': {} },
            size: "small",
            type: "success",
        }));
        const __VLS_88 = __VLS_87({
            ...{ 'onClick': {} },
            size: "small",
            type: "success",
        }, ...__VLS_functionalComponentArgsRest(__VLS_87));
        let __VLS_91;
        const __VLS_92 = {
            /** @type {typeof __VLS_91.click} */
            onClick: (...[$event]) => {
                if (!(row.status === '待确认'))
                    throw 0;
                return (__VLS_ctx.emit('confirm', row));
                // @ts-ignore
                [emit,];
            },
        };
        const { default: __VLS_93 } = __VLS_89.slots;
        // @ts-ignore
        [];
        var __VLS_89;
        var __VLS_90;
    }
    if (row.status === '待确认') {
        let __VLS_94;
        /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
        elButton;
        // @ts-ignore
        const __VLS_95 = __VLS_asFunctionalComponent1(__VLS_94, new __VLS_94({
            ...{ 'onClick': {} },
            size: "small",
        }));
        const __VLS_96 = __VLS_95({
            ...{ 'onClick': {} },
            size: "small",
        }, ...__VLS_functionalComponentArgsRest(__VLS_95));
        let __VLS_99;
        const __VLS_100 = {
            /** @type {typeof __VLS_99.click} */
            onClick: (...[$event]) => {
                if (!(row.status === '待确认'))
                    throw 0;
                return (__VLS_ctx.emit('cancel', row));
                // @ts-ignore
                [emit,];
            },
        };
        const { default: __VLS_101 } = __VLS_97.slots;
        // @ts-ignore
        [];
        var __VLS_97;
        var __VLS_98;
    }
    if (row.status === '已生效') {
        let __VLS_102;
        /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
        elButton;
        // @ts-ignore
        const __VLS_103 = __VLS_asFunctionalComponent1(__VLS_102, new __VLS_102({
            ...{ 'onClick': {} },
            size: "small",
            type: "danger",
        }));
        const __VLS_104 = __VLS_103({
            ...{ 'onClick': {} },
            size: "small",
            type: "danger",
        }, ...__VLS_functionalComponentArgsRest(__VLS_103));
        let __VLS_107;
        const __VLS_108 = {
            /** @type {typeof __VLS_107.click} */
            onClick: (...[$event]) => {
                if (!(row.status === '已生效'))
                    throw 0;
                return (__VLS_ctx.emit('terminate', row));
                // @ts-ignore
                [emit,];
            },
        };
        const { default: __VLS_109 } = __VLS_105.slots;
        // @ts-ignore
        [];
        var __VLS_105;
        var __VLS_106;
    }
    if (row.settlement) {
        let __VLS_110;
        /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
        elButton;
        // @ts-ignore
        const __VLS_111 = __VLS_asFunctionalComponent1(__VLS_110, new __VLS_110({
            ...{ 'onClick': {} },
            size: "small",
            type: "primary",
            plain: true,
        }));
        const __VLS_112 = __VLS_111({
            ...{ 'onClick': {} },
            size: "small",
            type: "primary",
            plain: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_111));
        let __VLS_115;
        const __VLS_116 = {
            /** @type {typeof __VLS_115.click} */
            onClick: (...[$event]) => {
                if (!(row.settlement))
                    throw 0;
                return (__VLS_ctx.emit('view-settlement', row));
                // @ts-ignore
                [emit,];
            },
        };
        const { default: __VLS_117 } = __VLS_113.slots;
        // @ts-ignore
        [];
        var __VLS_113;
        var __VLS_114;
    }
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_82;
// @ts-ignore
[];
var __VLS_11;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
