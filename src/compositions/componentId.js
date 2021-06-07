import { ref, watchEffect } from "vue";
import { v4 as uuid } from "uuid";

/**
 * Uses passed id prop or generates custom UUID.
 * See example usage in '@dariwn-studio/ui-vue/components/atoms/DInput.vue'.
 *
 * @param props
 * @returns {{componentId: string}}
 */
export default function useComponentId(props) {
  const componentId = ref((props && props.id) || uuid());

  watchEffect(() => {
    componentId.value = (props && props.id) || uuid();
  });

  return { componentId };
}
