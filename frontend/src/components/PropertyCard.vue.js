/// <reference types="../../node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { computed } from 'vue';
const props = defineProps();
const emit = defineEmits();
const statusTagType = computed(() => {
    const map = {
        待出租: 'success',
        已预约: 'warning',
        已签约: 'primary',
    };
    return map[props.item.status] ?? 'primary';
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
/** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
elCard;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    shadow: "hover",
    ...{ class: "property-card" },
}));
const __VLS_2 = __VLS_1({
    shadow: "hover",
    ...{ class: "property-card" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
/** @type {__VLS_StyleScopedClasses['property-card']} */ ;
const { default: __VLS_6 } = __VLS_3.slots;
{
    const { header: __VLS_7 } = __VLS_3.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card-header" },
    });
    /** @type {__VLS_StyleScopedClasses['card-header']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
    (__VLS_ctx.item.community);
    let __VLS_8;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
        type: (__VLS_ctx.statusTagType),
    }));
    const __VLS_10 = __VLS_9({
        type: (__VLS_ctx.statusTagType),
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    const { default: __VLS_13 } = __VLS_11.slots;
    (__VLS_ctx.item.status);
    // @ts-ignore
    [item, item, statusTagType,];
    var __VLS_11;
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
(__VLS_ctx.item.region);
(__VLS_ctx.item.layout);
(__VLS_ctx.item.area);
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "rent" },
});
/** @type {__VLS_StyleScopedClasses['rent']} */ ;
(__VLS_ctx.item.rent);
(__VLS_ctx.item.deposit);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "facility-list" },
});
/** @type {__VLS_StyleScopedClasses['facility-list']} */ ;
for (const [facility] of __VLS_vFor((__VLS_ctx.item.facilities))) {
    let __VLS_14;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_15 = __VLS_asFunctionalComponent1(__VLS_14, new __VLS_14({
        key: (facility),
        size: "small",
    }));
    const __VLS_16 = __VLS_15({
        key: (facility),
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_15));
    const { default: __VLS_19 } = __VLS_17.slots;
    (facility);
    // @ts-ignore
    [item, item, item, item, item, item,];
    var __VLS_17;
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "actions" },
});
/** @type {__VLS_StyleScopedClasses['actions']} */ ;
let __VLS_20;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent1(__VLS_20, new __VLS_20({
    type: "primary",
    ...{ class: "action-btn" },
}));
const __VLS_22 = __VLS_21({
    type: "primary",
    ...{ class: "action-btn" },
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
/** @type {__VLS_StyleScopedClasses['action-btn']} */ ;
const { default: __VLS_25 } = __VLS_23.slots;
// @ts-ignore
[];
var __VLS_23;
let __VLS_26;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent1(__VLS_26, new __VLS_26({
    ...{ 'onClick': {} },
    type: "warning",
    plain: true,
    ...{ class: "action-btn" },
    disabled: (__VLS_ctx.item.status === '已签约'),
}));
const __VLS_28 = __VLS_27({
    ...{ 'onClick': {} },
    type: "warning",
    plain: true,
    ...{ class: "action-btn" },
    disabled: (__VLS_ctx.item.status === '已签约'),
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
let __VLS_31;
const __VLS_32 = {
    /** @type {typeof __VLS_31.click} */
    onClick: (...[$event]) => {
        return (__VLS_ctx.emit('create-contract', __VLS_ctx.item));
        // @ts-ignore
        [item, item, emit,];
    },
};
/** @type {__VLS_StyleScopedClasses['action-btn']} */ ;
const { default: __VLS_33 } = __VLS_29.slots;
// @ts-ignore
[];
var __VLS_29;
var __VLS_30;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
