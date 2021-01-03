import { ref, watchEffect } from "vue";
import uuid from "../utils/uuid";

/**
 * Uses passed id prop or generates custom UUID.
 * See example usage in '@dariwn-studio/ui-vue/components/atoms/DInput.vue'.
 *
 * @param props
 * @returns {{inputId: string}}
 */
export default function useInputId(props) {
  const inputId = ref((props && props.id) || uuid());

  watchEffect(() => {
    inputId.value = (props && props.id) || uuid();
  });

  return { inputId };
}
