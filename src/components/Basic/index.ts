import { withInstall } from '@/utils';
import basicTitle, { BasicTitleProps } from './src/BasicTitle.vue';
import basicHelp, { BasicHelpProps } from './src/BasicHelp.vue';
import basicDivider, { BasicDividerProps } from './src/BasicDivider.vue';

export const BasicTitle = withInstall(basicTitle);
export const basicTitleProps = BasicTitleProps;

export const BasicHelp = withInstall(basicHelp);
export const basicHelpProps = BasicHelpProps;

export const BasicDivider = withInstall(basicDivider);
export const basicDividerProps = BasicDividerProps;
