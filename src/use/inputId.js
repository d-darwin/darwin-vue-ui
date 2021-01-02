import { ref, watchEffect } from "vue";
import uuid from "../utils/uuid";

export default function useInputId(props) {
  const inputId = ref((props && props.id) || uuid());

  watchEffect(() => {
    inputId.value = (props && props.id) || uuid();
  });

  return { inputId };
}
