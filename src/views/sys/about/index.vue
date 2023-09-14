<template>
  <PageWrapper title="关于">
    <template #extra>
      <a :href="GITHUB_URL" target="_blank" style="color: var(--primary-color); text-transform: capitalize">{{ name }}</a>
      <span>
        是一个基于 Vue3、Element-Plus、TypeScript、Vite4
        的后台解决方案，目标是为中大型项目开发提供现成的开箱解决方案及便捷开发环境，同时拥有着丰富的示例，原则上不会限制代码用于商用。
      </span>
    </template>
    <BasicDescription @register="infoRegister" />
    <BasicDescription @register="register" class="my-4" />
    <BasicDescription @register="registerDev" />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { BasicDescription, DescItem, useDescription } from '@/components/BasicDescription';
import { GITHUB_URL, SITE_URL, DOC_URL } from '@/settings/siteSetting';

export default defineComponent({
  name: 'About',
  components: { BasicDescription },
  setup() {
    const { pkg, lastBuildTime } = __APP_INFO__;

    const { dependencies, devDependencies, name, version } = pkg;

    const schema: DescItem[] = [];
    const devSchema: DescItem[] = [];

    const infoSchema: DescItem[] = [
      {
        label: '版本',
        field: 'version',
      },
      {
        label: '最后编译时间',
        field: 'lastBuildTime',
      },
      {
        label: '文档地址',
        field: 'doc',
      },
      {
        label: '预览地址',
        field: 'preview',
      },
      {
        label: 'Github',
        field: 'github',
      },
    ];

    const infoData = {
      version,
      lastBuildTime,
      doc: DOC_URL,
      preview: SITE_URL,
      github: GITHUB_URL,
    };

    Object.keys(dependencies).forEach((key) => {
      schema.push({ field: key, label: key });
    });

    Object.keys(devDependencies).forEach((key) => {
      devSchema.push({ field: key, label: key });
    });

    const [register] = useDescription({
      title: '生产环境依赖',
      border: true,
      data: dependencies,
      schema: schema,
      column: 3,
    });

    const [registerDev] = useDescription({
      title: '开发环境依赖',
      border: true,
      data: devDependencies,
      schema: devSchema,
      column: 3,
    });

    const [infoRegister] = useDescription({
      title: '项目信息',
      border: true,
      data: infoData,
      schema: infoSchema,
      column: 2,
    });

    return {
      GITHUB_URL,
      name,
      register,
      registerDev,
      infoRegister,
    };
  },
});
</script>
