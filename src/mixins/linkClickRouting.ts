import { defineComponent } from "vue";

/**
 * If children of a component contains relative HTML links
 *  the mixins handles these as routes.
 */
export default defineComponent({
  data() {
    return {
      links: [] as HTMLLinkElement[]
    };
  },

  mounted() {
    // @ts-ignore
    if (this.$router) {
      // use listeners only if there is vue-router
      this.addListeners();
    }
  },

  beforeUnmount() {
    // @ts-ignore
    if (this.$router) {
      this.removeListeners();
    }
  },

  updated() {
    // @ts-ignore
    if (this.$router) {
      this.removeListeners();
      this.$nextTick().then(() => {
        this.addListeners();
      });
    }
  },

  methods: {
    /**
     * Prevents default browser behavior (page reload) for relative links.
     */
    navigate(event: MouseEvent): void {
      const target = event.target as HTMLLinkElement;
      const linkHref = target.getAttribute("href");
      const linkTarget = target.getAttribute("target");

      // TODO: add if it is the same domain check
      if (linkHref && linkHref[0] === "/" && linkTarget !== "_blank") {
        event.preventDefault();
        // @ts-ignore
        this.$router.push(linkHref);
      }
    },

    addListeners(): void {
      this.links = this.$el.getElementsByTagName("a");
      for (let i = 0; i < this.links.length; i++) {
        this.links[i].addEventListener("click", this.navigate, false);
      }
    },

    removeListeners(): void {
      for (let i = 0; i < this.links.length; i++) {
        this.links[i].removeEventListener("click", this.navigate, false);
      }
      this.links = [];
    }
  }
});
