import { ref, watchEffect } from "vue";
import uuid from "../utils/uuid";

export default function inputId(props) {
  const inputId = ref(props.id || uuid());

  watchEffect(() => {
    inputId.value = props.id || uuid();
  });

  return { inputId };
}
