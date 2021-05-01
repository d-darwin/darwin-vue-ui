import controlRoundnessList from "@/utils/controlRoundnessList";

export default {
  control: { type: "select", options: controlRoundnessList },
  defaultValue: "smooth"
};
