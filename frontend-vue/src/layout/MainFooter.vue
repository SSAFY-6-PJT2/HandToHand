<!--
@author Hyeonsooryu
-->

<template>
  <footer
    class="footer mt-5"
    :class="{ [`footer-${type}`]: type }"
    :data-background-color="backgroundColor"
  >
    <div class="container">
      <nav>
        <ul>
          <li>Hand to Hand</li>
        </ul>
      </nav>
      <div class="copyright">2022 삼성청년SW아카데미 특화 PJT</div>
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    backgroundColor: String,
    type: String,
  },
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>
