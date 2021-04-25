import { DDebugVisual, DTypography } from "@";

export default {
  title: "Development/DebugVisual",
  component: DDebugVisual
};

const Template = args => ({
  components: { DDebugVisual, DTypography },
  setup() {
    return { args };
  },
  template: `
    <DTypography tag="h1" size="h1">Heading</DTypography>
    <section>
      <article>article 1</article>
      <article>article 2</article>
    </section>
    <div>
      <div>div 1</div>
      <div>div 2</div>
    </div>
    <DDebugVisual />
  `
});

export const DebugVisual = Template.bind({});
