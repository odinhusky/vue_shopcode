<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <HelloWorld/> -->
    <router-view/>

    <!-- <div class="alert alert-primary" role="alert">
        A simple primary alert—check it out!
    </div> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  created() {
    // const api = 'https://vue-course-api.hexschool.io/api/odin/products';
    // const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products`;
    // this.$http.get(api).then((response) => {
    //   console.log(response.data)
    // });
  }
}
</script>

<style lang="scss">
@import "./assets/all";
</style>
