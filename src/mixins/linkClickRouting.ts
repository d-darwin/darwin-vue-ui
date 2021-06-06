import { defineComponent } from "vue";

/** mixins **/
import hasRouter from "./hasRouter";

/**
 * If children of a component contains relative HTML links
 *  the mixins handles these as routes.
 */
export default defineComponent({
  mixins: [hasRouter],

  data() {
    return {
      links: [] as HTMLLinkElement[]
    };
  },

  mounted() {
    if (this.hasRouter) {
      this.addListeners();
    }
  },

  beforeUnmount() {
    if (this.hasRouter) {
      this.removeListeners();
    }
  },

  updated() {
    if (this.hasRouter) {
      this.removeListeners();
      this.$nextTick().then(_ => this.addListeners());
    }
  },

  methods: {
    /**
     * Prevents default browser behavior (page reload) for relative links.
     */
    navigate(event: MouseEvent) {
      const link = event.target as HTMLLinkElement;
      if (link) {
        const href = link.getAttribute("href");
        const target = link.getAttribute("target");
        // TODO: add if it is the same domain check
        if (href && href[0] === "/" && target !== "_blank") {
          event.preventDefault();
          // @ts-ignore // TODO: don't use suppression
          this.$router && this.$router.push(href);
        }
      }
    },

    addListeners() {
      this.links = this.$el.getElementsByTagName("a") as HTMLLinkElement[];
      for (let i = 0; i < this.links.length; i++) {
        this.links[i].addEventListener("click", this.navigate, false);
      }
    },

    removeListeners() {
      for (let i = 0; i < this.links.length; i++) {
        this.links[i].removeEventListener("click", this.navigate, false);
      }
      this.links = [];
    }
  }
});
