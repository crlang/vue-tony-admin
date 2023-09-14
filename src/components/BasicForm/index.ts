import { withInstall } from '@/utils';
import basicForm from './src/BasicForm.vue';

export { useComponentRegister } from './src/hooks/useComponentRegister';

export { default as CustomDatePicker } from './src/components/CustomDatePicker.vue';
export { default as CustomTimePicker } from './src/components/CustomTimePicker.vue';
export { default as CustomTreeSelect } from './src/components/CustomTreeSelect.vue';
export { default as CustomSelect } from './src/components/CustomSelect.vue';

export * from './src/types/form';
export * from './src/types/formItem';
export * from './src/types/hooks';
export * from './src/types/index';
export { useForm } from './src/hooks/useForm';
export const BasicForm = withInstall(basicForm);
export default BasicForm;
