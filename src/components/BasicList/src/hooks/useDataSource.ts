import type { ElePagination } from '@/components/ElementPlus';
import type { BasicListProps, FetchParams, ColumnSorterResult } from '../typing';

import { ref, unref, ComputedRef, computed, onMounted, watch, toRaw } from 'vue';
import { get, cloneDeep } from 'lodash-es';

import { buildUUID } from '@/utils/uuid';

import { FETCH_SETTING, ROW_KEY, PAGE_SIZE } from '../const';
import { isBoolean, isFunction } from '@/utils/is';

/**
 * 处理表格数据
 *
 * Process tabular data
 * @param propsRef
 * @param paginationRef
 * @param setPagination
 * @param setLoading
 * @param emit
 */
export function useDataSource(
  propsRef: ComputedRef<BasicListProps>,
  paginationRef: ComputedRef<ElePagination | boolean>,
  setPagination: (info: Partial<ElePagination>) => void,
  setLoading: (loading: boolean) => void,
  emit: EmitType,
) {
  const sortInfo = ref<Recordable>({});
  const filterInfo = ref<Recordable>({});

  const dataSourceRef = ref<Recordable[]>([]);
  const rawDataSourceRef = ref<Recordable>({});

  /**
   * 判断是否自动创建 key
   *
   * Determine whether to automatically create a key
   */
  const getAutoCreateKey = computed(() => {
    return unref(propsRef).autoCreateKey && !unref(propsRef).rowKey;
  });

  /**
   * 获取行记录的 key
   *
   * Get the key of the row record
   */
  const getRowKey = computed((): string => {
    const { rowKey } = unref(propsRef);
    const keyName = unref(getAutoCreateKey) ? ROW_KEY : rowKey;
    if (isFunction(keyName)) {
      return keyName(rowKey);
    }
    return keyName;
  });

  /**
   * 统一处理表格数据
   *
   * Unified processing of tabular data
   */
  const getDataSourceRef = computed(() => {
    const { currentPage = 1, pageSize = PAGE_SIZE } = unref(paginationRef);
    const { api } = unref(propsRef);
    const dataSource = unref(dataSourceRef);
    if (!dataSource || dataSource.length === 0) {
      return [];
    }

    if (unref(getAutoCreateKey)) {
      const firstItem = dataSource[0];
      const lastItem = dataSource[dataSource.length - 1];
      const keyName = unref(getRowKey);
      if (firstItem && lastItem) {
        // 检测首尾是否存在key，不存在则对全部数据重新加key
        if (!firstItem[keyName] || !lastItem[keyName]) {
          const data = cloneDeep(unref(dataSourceRef));
          data.forEach((item) => {
            if (!item[keyName]) {
              item[keyName] = buildUUID();
            }
            if (item.children && item.children.length) {
              setListKey(item.children);
            }
          });
          dataSourceRef.value = data;
        }
      }
    }

    // 接口数据或不分页直接返回
    if (isFunction(api) || isBoolean(unref(paginationRef))) {
      return unref(dataSourceRef);
    }

    // 非接口数据根据实际分页返回
    const s = (currentPage - 1) * pageSize;
    const e = currentPage * pageSize;
    return unref(dataSourceRef).slice(s, e);
  });

  /**
   * 表格导航、筛选、排序等内容改变时触发
   *
   * Triggered when list navigation, filtering, sorting, etc. change
   *
   * @param pagination ElePagination
   * @param sorter ColumnSorterResult
   * @param filters
   */
  function handleListChange(pagination: Partial<ElePagination>, sorter?: ColumnSorterResult, filters?: Partial<Recordable<string[]>>) {
    const { sortFn, filterFn, api } = unref(propsRef);

    // 更新分页
    // Pagination updated
    if (pagination) {
      setPagination(pagination);
    }

    if (!isFunction(api)) return;

    // 更新了排序
    // Sort updated
    if (sorter) {
      sortInfo.value = isFunction(sortFn) ? sortFn(sorter) : sorter;
    }
    // 更新了筛选
    // Filter updated
    if (filters) {
      filterInfo.value = isFunction(filterFn) ? filterFn(filters) : filters;
    }

    fetch();
  }

  /**
   * 设置表格项 Key
   *
   * Set the list item Key
   * @param items
   */
  function setListKey(items: any[]) {
    if (!items || !Array.isArray(items)) return;
    items.forEach((item) => {
      if (!item[ROW_KEY]) {
        item[ROW_KEY] = buildUUID();
      }
      if (item.children && item.children.length) {
        setListKey(item.children);
      }
    });
  }

  /**
   * 根据 key 更新指定行的整行的记录，key必须存在
   *
   * Update the record of the entire row of the specified row according to the key, key must exist
   * @param rowKey
   * @param record 新记录
   */
  function updateListDataRecord(rowKey: string | number, record: Recordable): Recordable | undefined {
    const row = findListDataRecord(rowKey);

    if (row) {
      for (const field in row) {
        if (Reflect.has(record, field)) row[field] = record[field];
      }
      return row;
    }
  }

  /**
   * 根据 key 删除指定行记录，key必须存在
   *
   * Delete the specified row record according to the key, the key must exist
   * @param rowKey
   */
  function deleteListDataRecord(rowKey: string | number): Recordable | undefined {
    if (!dataSourceRef.value || dataSourceRef.value.length === 0) return;

    const recordIndex = dataSourceRef.value.findIndex((s) => s.key === rowKey);
    if (recordIndex > -1) {
      unref(dataSourceRef).splice(recordIndex, 1);
    }

    const total = unref(paginationRef)?.total || 0;
    setPagination({
      total: total > 0 ? total - 1 : 0,
    });

    return unref(dataSourceRef);
  }

  /**
   * 插入一条记录，如果索引存在，则插入索引的位置，否则插入最后的位置
   *
   * Insert a record, if the index exists, insert the position of the index, otherwise insert at the last position
   * @param record 插入的记录
   * @param index 索引
   */
  function insertListDataRecord(record: Recordable, index: number): Recordable | undefined {
    if (!dataSourceRef.value || dataSourceRef.value.length === 0) return;

    index = index ?? dataSourceRef.value?.length;
    unref(dataSourceRef).splice(index, 0, record);

    return unref(dataSourceRef);
  }

  /**
   * 根据 key 查找所在行记录
   *
   * Find the row record based on the key
   * @param rowKey
   */
  function findListDataRecord(rowKey: string | number) {
    if (!dataSourceRef.value || dataSourceRef.value.length === 0) return;

    const rowKeyName = unref(getRowKey);
    if (!rowKeyName) return;

    const { childrenColumnName = 'children' } = unref(propsRef);

    const findRow = (array: any[]) => {
      let ret;
      array.some(function iter(r) {
        if (Reflect.has(r, rowKeyName) && r[rowKeyName] === rowKey) {
          ret = r;
          return true;
        }

        return r[childrenColumnName] && r[childrenColumnName].some(iter);
      });
      return ret;
    };

    return findRow(dataSourceRef.value);
  }

  /**
   * 获取处理后的表格数据
   *
   * Get the processed list data
   */
  function getDataSource<T = Recordable>() {
    return toRaw(getDataSourceRef.value as T[]);
  }

  /**
   * 获取未处理的原始的接口数据
   *
   * Get unprocessed raw api data
   */
  function getRawDataSource<T = Recordable>() {
    return toRaw(rawDataSourceRef.value as T);
  }

  /**
   * 获取服务端数据
   *
   * Get server api data
   * @param opt FetchParams
   */
  async function fetch(opt?: FetchParams) {
    const { api, searchInfo, fetchSetting, beforeFetchFn, afterFetchFn } = unref(propsRef);

    if (!isFunction(api)) return;

    try {
      setLoading(true);
      const { pageField, sizeField, listField, totalField } = Object.assign({}, FETCH_SETTING, fetchSetting);
      let pageParams: Recordable = {};

      const { currentPage = 1, pageSize = PAGE_SIZE } = unref(paginationRef) ?? {};

      if (isBoolean(unref(paginationRef))) {
        pageParams = {};
      } else {
        pageParams[pageField] = opt?.page || currentPage;
        pageParams[sizeField] = pageSize;
      }

      let params: Recordable = {
        ...pageParams,
        ...searchInfo,
        ...(opt?.searchInfo ?? {}),
        ...unref(sortInfo),
        ...unref(filterInfo),
      };

      // 前置请求，参数随服务端内容变化而变化
      // Pre-request, the parameters change with the content of the server
      if (isFunction(beforeFetchFn)) {
        params = beforeFetchFn(params) || params;
      }

      const res = await api(params);
      rawDataSourceRef.value = res;

      const isArrayResult = Array.isArray(res);

      let resultItems: Recordable[] = isArrayResult ? res : get(res, listField);
      const resultTotal: number = isArrayResult ? 0 : parseInt(get(res, totalField));
      const resultPage: number = isArrayResult ? 1 : parseInt(get(res, pageField));

      if (resultTotal) {
        const currentTotalPage = Math.ceil(resultTotal / pageSize);
        // 如果请求页码大于最大页码，则进行最后一次请求，请求内容为最大页码的内容
        // If the requested page number is greater than the maximum page number, make the last request, and the requested content is the content of the maximum page number
        if (currentPage > currentTotalPage) {
          setPagination({
            currentPage: currentTotalPage,
          });
          fetch(opt);
        }
      }

      // 结果作为参数，第二次请求才是正确的结果
      // The result is used as a parameter, and the second request is the correct result
      if (isFunction(afterFetchFn)) {
        resultItems = afterFetchFn(resultItems) || resultItems;
      }

      dataSourceRef.value = resultItems;
      const resInfo = {};
      if (unref(paginationRef)?.currentPage !== resultPage) {
        resInfo.currentPage = resultPage;
        resInfo.pageSize = pageSize;
      }

      setPagination({
        ...resInfo,
        total: resultTotal || 0,
      });

      console.info('===fetch info===', resultItems);
      emit('fetch-success', {
        items: unref(resultItems),
        page: resultPage,
        total: resultTotal,
      });
    } catch (error) {
      console.error('===fetch error===', error);
      emit('fetch-error', error);
    } finally {
      setLoading(false);
    }
  }

  /**
   * 重新载入最后一次请求
   *
   * Reload last request
   * @param opt FetchParams
   */
  async function reload(opt?: FetchParams) {
    await fetch(opt);
  }

  onMounted(() => {
    setTimeout(() => {
      unref(propsRef).immediate && fetch();
    }, 56);
  });

  watch(
    () => unref(propsRef).dataSource,
    () => {
      const { dataSource, api } = unref(propsRef);
      if (!isFunction(api) && dataSource) {
        dataSourceRef.value = dataSource;
      }
    },
    {
      immediate: true,
    },
  );

  return {
    getDataSourceRef,
    getRowKey,
    getAutoCreateKey,
    getDataSource,
    getRawDataSource,
    fetch,
    reload,
    updateListDataRecord,
    deleteListDataRecord,
    insertListDataRecord,
    findListDataRecord,
    handleListChange,
  };
}
