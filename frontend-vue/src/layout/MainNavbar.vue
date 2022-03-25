<template>
  <navbar
    position="fixed"
    type="success"
    :transparent="transparent"
    :color-on-scroll="colorOnScroll"
    menu-classes="ml-auto"
  >
    <template>
      <router-link v-popover:popover1 class="navbar-brand" to="/"> Hand to Hand </router-link>
    </template>
    <template slot="navbar-menu">
      <li class="nav-item pr-2">
        <a
          class="nav-link"
          href="https://www.creative-tim.com/product/vue-now-ui-kit"
          target="_blank"
        >
          <i class="now-ui-icons media-1_album"></i>
          <p>NFT 갤러리</p>
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link btn btn-success btn-round"
          href="https://www.creative-tim.com/product/vue-now-ui-kit-pro"
          target="_blank"
        >
          <i class="now-ui-icons users_single-02 pr-1"></i>
          <p>지갑 연결하기</p>
        </a>
      </li>
    </template>
  </navbar>
</template>

<script>
import { DropDown, Navbar, NavLink } from "@/components";
import { Popover } from "element-ui";
export default {
  name: "main-navbar",
  props: {
    transparent: Boolean,
    colorOnScroll: Number,
  },
  components: {
    // DropDown,
    Navbar,
    // NavLink,
    [Popover.name]: Popover,
  },
};
</script>

<style scoped></style>
