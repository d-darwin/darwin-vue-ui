// TODO: type properly
export default {
  data() {
    return {
      links: []
    };
  },

  mounted() {
    // @ts-ignore
    if (this.$router) {
      // @ts-ignore
      this.addListeners();
    }
  },

  beforeUnmount() {
    // @ts-ignore
    if (this.$router) {
      // @ts-ignore
      this.removeListeners();
    }
  },

  watch: {
    content() {
      // @ts-ignore
      if (this.$router) {
        // @ts-ignore
        this.removeListeners();
        // @ts-ignore
        this.$nextTick(() => {
          // @ts-ignore
          this.addListeners();
        });
      }
    }
  },

  methods: {
    /**
     * Prevents default browser behavior (page reload) for relative links.
     */
    // @ts-ignore
    navigate(event) {
      const href = event.target.getAttribute("href");
      const target = event.target.getAttribute("target");
      // TODO: add if it is the same domain check
      if (href && href[0] === "/" && target !== "_blank") {
        event.preventDefault();
        // @ts-ignore
        this.$router.push(href);
      }
    },

    addListeners() {
      // @ts-ignore
      this.links = this.$el.getElementsByTagName("a");
      // @ts-ignore
      for (let i = 0; i < this.links.length; i++) {
        // @ts-ignore
        this.links[i].addEventListener("click", this.navigate, false);
      }
    },

    removeListeners() {
      // @ts-ignore
      for (let i = 0; i < this.links.length; i++) {
        // @ts-ignore
        this.links[i].removeEventListener("click", this.navigate, false);
      }
      // @ts-ignore
      this.links = [];
    }
  }
};
